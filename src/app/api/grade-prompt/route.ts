import { NextResponse } from "next/server";
import {
  GRADE_COMPONENT_KEYS,
  type GradeBreakdown,
  type GradeResult,
} from "@/lib/grade-prompt-types";

/**
 * Grades a learner-written prompt against the ROLE + CONTEXT + TASK +
 * CONSTRAINT + OUTPUT framework taught in Sesi 3, by delegating to an
 * Ollama-compatible server (Sesi 4, Langkah 6 & 7 — see
 * `src/components/prompt-lab.tsx`). This is the first backend code in the
 * project; everything else is static.
 *
 * Configuration (server-only env vars, never exposed to the browser):
 *   OLLAMA_BASE_URL — e.g. http://ollama.example.internal:11434
 *   OLLAMA_MODEL    — defaults to "qwen2.5:14b" (see .env.example)
 *
 * There is no auth on this endpoint (matching the rest of the site), so a
 * simple in-memory per-IP rate limit guards the upstream Ollama server from
 * abuse on an unauthenticated public page. POST handlers are never cached
 * by Next regardless of any route config, so this is inherently "live" with
 * no extra opt-out needed.
 */

const OLLAMA_TIMEOUT_MS = 60_000;
const MIN_PROMPT_LENGTH = 10;
const MAX_PROMPT_LENGTH = 4000;
const MAX_TASK_LENGTH = 500;
const DEFAULT_MODEL = "qwen2.5:14b";

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 10;

const SYSTEM_PROMPT = `Kamu adalah asisten penilai untuk pelatihan menulis prompt AI bagi guru SD di Indonesia.

Guru sedang berlatih menulis prompt menggunakan kerangka lima komponen berikut:
- ROLE: AI perlu bertindak sebagai siapa?
- CONTEXT: Untuk siapa dan dalam kondisi apa tugas tersebut dilakukan?
- TASK: Apa yang harus dilakukan AI?
- CONSTRAINT: Apa aturan atau batasannya?
- OUTPUT: Hasilnya ingin disajikan seperti apa?

Tugasmu: menilai SATU prompt yang ditulis oleh guru untuk SATU tugas mengajar tertentu (tugas dan prompt akan diberikan setelah instruksi ini).

Beri nilai 0-100 berdasarkan seberapa lengkap dan jelas kelima komponen di atas tercermin dalam prompt tersebut, dan seberapa relevan prompt itu dengan tugas yang diberikan. Prompt tidak harus menyebut label ROLE/CONTEXT/TASK/CONSTRAINT/OUTPUT secara eksplisit — cukup mengandung maksud dari tiap komponen.

Untuk setiap komponen, tuliskan catatan singkat (1-2 kalimat, Bahasa Indonesia, nada suportif seperti guru membimbing guru) tentang apa yang sudah baik atau apa yang bisa ditambahkan.

Balas HANYA dengan JSON valid — tanpa teks lain di luar JSON, tanpa markdown code fence — dengan struktur PERSIS seperti ini:

{
  "score": <angka bulat 0-100>,
  "feedback": "<ringkasan umum 2-4 kalimat, Bahasa Indonesia>",
  "breakdown": {
    "role": { "present": <true/false>, "note": "<catatan singkat>" },
    "context": { "present": <true/false>, "note": "<catatan singkat>" },
    "task": { "present": <true/false>, "note": "<catatan singkat>" },
    "constraint": { "present": <true/false>, "note": "<catatan singkat>" },
    "output": { "present": <true/false>, "note": "<catatan singkat>" }
  }
}`;

function buildUserTurn(task: string, prompt: string): string {
  return `Tugas mengajar yang diberikan kepada guru:
"""
${task}
"""

Prompt yang ditulis guru untuk tugas ini:
"""
${prompt}
"""

Nilai prompt di atas sesuai instruksi sistem.`;
}

// ---- Rate limiting (single-instance, in-memory, best-effort) --------------
// Client key -> recent request timestamps (ms) within the window. Resets on
// process restart and only works correctly for exactly one Node instance —
// both true for this project's Docker Compose setup (a single `web`
// service). If this ever scales to multiple instances, this needs to move
// to a shared store (Redis, etc.); not solved here.
const rateLimitBuckets = new Map<string, number[]>();

function getClientKey(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();

  // Opportunistic sweep so the map doesn't grow unboundedly across many
  // distinct IPs over the process's lifetime.
  if (rateLimitBuckets.size > 500) {
    for (const [bucketKey, timestamps] of rateLimitBuckets) {
      const fresh = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
      if (fresh.length === 0) rateLimitBuckets.delete(bucketKey);
      else rateLimitBuckets.set(bucketKey, fresh);
    }
  }

  const timestamps = (rateLimitBuckets.get(key) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitBuckets.set(key, timestamps);
    return true;
  }
  timestamps.push(now);
  rateLimitBuckets.set(key, timestamps);
  return false;
}

// ---- Defensive parsing of the model's reply --------------------------------
// `format: "json"` (passed to Ollama below) only guarantees *syntactically*
// valid JSON, not this specific shape — so every field is validated by hand
// and a malformed/unexpected shape degrades gracefully instead of failing
// the whole request.

function stripCodeFences(text: string): string {
  const trimmed = text.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  return fenced ? fenced[1] : trimmed;
}

function clampScore(value: unknown): number | null {
  const num =
    typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  return Number.isNaN(num) ? null : Math.max(0, Math.min(100, Math.round(num)));
}

function parseBreakdown(raw: unknown): GradeBreakdown | null {
  if (typeof raw !== "object" || raw === null) return null;
  const out = {} as GradeBreakdown;
  for (const key of GRADE_COMPONENT_KEYS) {
    const entry = (raw as Record<string, unknown>)[key];
    if (typeof entry !== "object" || entry === null) return null;
    const present = (entry as Record<string, unknown>).present;
    const note = (entry as Record<string, unknown>).note;
    if (typeof present !== "boolean" || typeof note !== "string") return null;
    out[key] = { present, note: note.slice(0, 300) };
  }
  return out;
}

function parseGradeResponse(rawText: string): GradeResult {
  try {
    const parsed = JSON.parse(stripCodeFences(rawText)) as Record<string, unknown>;
    const score = clampScore(parsed?.score);
    const feedbackRaw = parsed?.feedback;
    const feedback = typeof feedbackRaw === "string" ? feedbackRaw.slice(0, 1000) : null;
    if (score !== null && feedback !== null) {
      return { score, feedback, breakdown: parseBreakdown(parsed?.breakdown) };
    }
  } catch {
    // Fall through to the degraded fallback below.
  }

  // The model didn't return valid or correctly-shaped JSON. Salvage a
  // 0-100 score with a regex and surface the raw text as feedback instead
  // of failing the whole request.
  const scoreMatch = rawText.match(/\b(\d{1,3})\b/);
  const fallbackScore = scoreMatch ? Math.max(0, Math.min(100, Number(scoreMatch[1]))) : 0;
  return {
    score: fallbackScore,
    feedback:
      rawText.trim().slice(0, 1000) || "AI tidak memberikan penilaian yang dapat dibaca. Coba lagi.",
    breakdown: null,
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Isi permintaan harus berupa JSON yang valid." },
      { status: 400 }
    );
  }

  const { task, prompt } = (body ?? {}) as { task?: unknown; prompt?: unknown };

  if (typeof task !== "string" || typeof prompt !== "string") {
    return NextResponse.json(
      { error: "Field 'task' dan 'prompt' wajib diisi sebagai teks." },
      { status: 400 }
    );
  }
  if (prompt.trim().length < MIN_PROMPT_LENGTH) {
    return NextResponse.json(
      { error: `Prompt terlalu pendek (minimal ${MIN_PROMPT_LENGTH} karakter).` },
      { status: 400 }
    );
  }
  if (prompt.length > MAX_PROMPT_LENGTH) {
    return NextResponse.json(
      { error: `Prompt terlalu panjang (maksimal ${MAX_PROMPT_LENGTH} karakter).` },
      { status: 400 }
    );
  }
  if (task.trim().length === 0) {
    return NextResponse.json({ error: "Field 'task' tidak boleh kosong." }, { status: 400 });
  }
  if (task.length > MAX_TASK_LENGTH) {
    return NextResponse.json(
      { error: `Deskripsi tugas terlalu panjang (maksimal ${MAX_TASK_LENGTH} karakter).` },
      { status: 400 }
    );
  }

  const clientKey = getClientKey(request);
  if (isRateLimited(clientKey)) {
    return NextResponse.json(
      { error: "Terlalu banyak permintaan. Coba lagi dalam beberapa menit." },
      { status: 429 }
    );
  }

  const baseUrl = process.env.OLLAMA_BASE_URL;
  const model = process.env.OLLAMA_MODEL || DEFAULT_MODEL;
  if (!baseUrl) {
    return NextResponse.json(
      { error: "Server penilai belum dikonfigurasi. Hubungi pengelola situs." },
      { status: 502 }
    );
  }

  let ollamaRes: Response;
  try {
    ollamaRes = await fetch(`${baseUrl.replace(/\/$/, "")}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        system: SYSTEM_PROMPT,
        prompt: buildUserTurn(task, prompt),
        stream: false,
        format: "json",
      }),
      signal: AbortSignal.timeout(OLLAMA_TIMEOUT_MS),
    });
  } catch (err) {
    if (err instanceof Error && err.name === "TimeoutError") {
      return NextResponse.json(
        { error: "Server AI tidak merespons dalam waktu yang wajar. Coba lagi." },
        { status: 504 }
      );
    }
    return NextResponse.json({ error: "Tidak dapat menghubungi server AI." }, { status: 502 });
  }

  if (!ollamaRes.ok) {
    return NextResponse.json(
      { error: `Server AI mengembalikan error (HTTP ${ollamaRes.status}).` },
      { status: 502 }
    );
  }

  let ollamaData: unknown;
  try {
    ollamaData = await ollamaRes.json();
  } catch {
    return NextResponse.json({ error: "Respons dari server AI tidak valid." }, { status: 502 });
  }

  const rawText = (ollamaData as { response?: unknown } | null)?.response;
  if (typeof rawText !== "string") {
    return NextResponse.json(
      { error: "Respons dari server AI tidak sesuai format yang diharapkan." },
      { status: 502 }
    );
  }

  return NextResponse.json(parseGradeResponse(rawText), { status: 200 });
}
