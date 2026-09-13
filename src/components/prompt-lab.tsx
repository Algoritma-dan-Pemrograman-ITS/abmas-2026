"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/code-block";
import { CheckIcon, CopyIcon, RefreshIcon } from "@/components/icons";

/**
 * "Kelas Prompt: Buat Materi Bareng AI" — the Sesi 4 hands-on tool.
 *
 * Five tabs walk a teacher through the ROLE + CONTEXT + TASK + CONSTRAINT +
 * OUTPUT framework from Sesi 3 on their own class material:
 *
 *   1. Konteks       — a form collects the raw ingredients.
 *   2. Susun Prompt  — the ingredients are assembled into an editable prompt.
 *   3. Generate      — the teacher runs that prompt in their own AI tool of
 *                       choice and pastes the reply back in (this project has
 *                       no backend AI integration, so the "generation" step
 *                       is a copy-out/paste-back bridge rather than a live
 *                       API call).
 *   4. Improve       — iterative prompting: quick-fix chips or a free-form
 *                       note become the next message in that same AI
 *                       conversation, and the revised reply is pasted back.
 *                       Can repeat several rounds.
 *   5. Finalisasi    — the latest result, editable and ready to copy.
 *
 * State for all five steps lives here and is never cleared by switching
 * tabs or pressing "Kembali", only by the explicit "Mulai dari Awal" reset.
 */

type FormValues = {
  mapel: string;
  kelas: string;
  topik: string;
  tujuan: string;
  durasi: string;
  karakteristik: string;
};

const EMPTY_FORM: FormValues = {
  mapel: "",
  kelas: "",
  topik: "",
  tujuan: "",
  durasi: "",
  karakteristik: "",
};

const FIELDS: { key: keyof FormValues; label: string; placeholder: string }[] = [
  { key: "mapel", label: "Mata pelajaran", placeholder: "mis. Matematika" },
  { key: "kelas", label: "Kelas / Fase", placeholder: "mis. 3" },
  {
    key: "topik",
    label: "Topik spesifik",
    placeholder: "mis. Perkalian sebagai penjumlahan berulang",
  },
  {
    key: "tujuan",
    label: "Tujuan pembelajaran (siswa mampu ...)",
    placeholder: "mis. memahami konsep perkalian dan mengerjakan soal perkalian sederhana",
  },
  { key: "durasi", label: "Durasi", placeholder: "mis. 1 jam pelajaran (35 menit)" },
  {
    key: "karakteristik",
    label: "Karakteristik siswa",
    placeholder: "mis. lebih suka belajar sambil bermain",
  },
];

type Template = { id: string; label: string; values: FormValues };

const TEMPLATES: Template[] = [
  {
    id: "ipa",
    label: "IPA — Siklus Air (Kelas 5)",
    values: {
      mapel: "IPAS",
      kelas: "5",
      topik: "Siklus air",
      tujuan: "menjelaskan tahapan siklus air dan manfaatnya bagi kehidupan",
      durasi: "2 jam pelajaran (70 menit)",
      karakteristik: "suka cerita bergambar, mudah bosan dengan penjelasan panjang",
    },
  },
  {
    id: "matematika",
    label: "Matematika — Perkalian (Kelas 3)",
    values: {
      mapel: "Matematika",
      kelas: "3",
      topik: "Perkalian sebagai penjumlahan berulang",
      tujuan: "memahami konsep perkalian dan mengerjakan soal perkalian sederhana",
      durasi: "1 jam pelajaran (35 menit)",
      karakteristik: "lebih suka belajar sambil bermain, senang jika ada gambar benda",
    },
  },
  {
    id: "b-indonesia",
    label: "B. Indonesia — Teks Deskripsi (Kelas 3)",
    values: {
      mapel: "Bahasa Indonesia",
      kelas: "3",
      topik: "Teks deskripsi",
      tujuan: "menulis teks deskripsi sederhana tentang benda atau orang di sekitarnya",
      durasi: "1 jam pelajaran (35 menit)",
      karakteristik: "senang bercerita lisan, belum terbiasa menulis panjang",
    },
  },
];

const QUICK_FIXES = [
  "Materi ini terlalu sulit. Sederhanakan bahasan…",
  "Contohnya masih terlalu abstrak, ganti dengan …",
  "Soalnya terlalu banyak hitungan, buat 2 soal c…",
  "Aktivitasnya butuh alat yang tidak saya punya, …",
];

const STEPS = [
  { id: 1, label: "Konteks" },
  { id: 2, label: "Susun Prompt" },
  { id: 3, label: "Generate" },
  { id: 4, label: "Improve" },
  { id: 5, label: "Finalisasi" },
] as const;

/** Builds the Langkah 2 prompt exactly per the Sesi 4 spec's template. */
function buildPrompt(form: FormValues): string {
  return `Kamu adalah guru SD berpengalaman yang pandai menjelaskan materi dengan cara sederhana dan menyenangkan bagi anak-anak.

Saya mengajar ${form.mapel} kelas ${form.kelas} dengan topik ${form.topik}.
Tujuan pembelajaran: siswa mampu ${form.tujuan}.
Durasi mengajar: ${form.durasi}.
Karakteristik siswa saya: ${form.karakteristik}.

Tolong buatkan:
1. Ringkasan materi yang mudah dipahami anak SD
2. Satu aktivitas belajar yang interaktif/menyenangkan
3. Dua contoh konkret yang dekat dengan kehidupan sehari-hari siswa
4. 5 soal latihan dengan tingkat kesulitan bertahap (mudah ke sedang)

Batasan:
- Gunakan bahasa yang sangat sederhana, sesuai usia anak kelas ${form.kelas}
- Hindari istilah asing/rumit tanpa penjelasan
- Aktivitas tidak butuh alat mahal, cukup alat yang ada di kelas/rumah

Format hasil: gunakan judul per bagian, poin-poin, dan pisahkan setiap bagian dengan jelas.`;
}

const textareaClass =
  "w-full rounded-md border border-slate-200 p-3 font-mono text-sm leading-6 text-slate-800 shadow-sm focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400";

const primaryButtonClass =
  "inline-flex items-center rounded-md px-5 py-2.5 text-sm font-medium transition-colors";

export function PromptLab() {
  const [activeStep, setActiveStep] = useState(1);
  const [maxUnlocked, setMaxUnlocked] = useState(1);
  const [completed, setCompleted] = useState<Record<number, boolean>>({});

  const [form, setForm] = useState<FormValues>(EMPTY_FORM);
  const [activeTemplateId, setActiveTemplateId] = useState<string | null>(null);
  const [touchedInvalid, setTouchedInvalid] = useState(false);

  const [promptText, setPromptText] = useState("");
  const [lockedPrompt, setLockedPrompt] = useState("");

  const [step3Result, setStep3Result] = useState("");

  const [improveText, setImproveText] = useState("");
  const [sending, setSending] = useState(false);
  const [reviseResult, setReviseResult] = useState("");
  const [revisions, setRevisions] = useState<{ instruction: string; result: string }[]>([]);
  const improveRef = useRef<HTMLTextAreaElement>(null);

  const [finalText, setFinalText] = useState("");

  const latestResult = revisions.length > 0 ? revisions[revisions.length - 1].result : step3Result;

  function goToStep(step: number) {
    if (step > maxUnlocked) return;
    if (step === 5 && finalText.trim() === "") {
      setFinalText(latestResult);
    }
    setActiveStep(step);
  }

  function completeStep(step: number, next: number) {
    setCompleted((c) => ({ ...c, [step]: true }));
    setMaxUnlocked((m) => Math.max(m, next));
    setActiveStep(next);
  }

  function updateField(key: keyof FormValues, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function applyTemplate(template: Template) {
    setForm(template.values);
    setActiveTemplateId(template.id);
    setTouchedInvalid(false);
  }

  function handleStep1Submit() {
    const hasEmpty = FIELDS.some((f) => form[f.key].trim() === "");
    if (hasEmpty) {
      setTouchedInvalid(true);
      return;
    }
    setPromptText(buildPrompt(form));
    completeStep(1, 2);
  }

  function handleStep2Submit() {
    setLockedPrompt(promptText);
    completeStep(2, 3);
  }

  function handleStep3Submit() {
    if (step3Result.trim() === "") return;
    completeStep(3, 4);
  }

  function fillQuickFix(text: string) {
    setImproveText(text);
    requestAnimationFrame(() => {
      const el = improveRef.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(text.length, text.length);
    });
  }

  function handleSendImprove() {
    if (improveText.trim() === "") return;
    setSending(true);
  }

  function handleCancelSend() {
    setSending(false);
  }

  function handleSaveRevision() {
    if (reviseResult.trim() === "") return;
    setRevisions((r) => [...r, { instruction: improveText, result: reviseResult }]);
    setImproveText("");
    setReviseResult("");
    setSending(false);
    setCompleted((c) => ({ ...c, 4: true }));
    setMaxUnlocked((m) => Math.max(m, 5));
  }

  function resetAll() {
    setActiveStep(1);
    setMaxUnlocked(1);
    setCompleted({});
    setForm(EMPTY_FORM);
    setActiveTemplateId(null);
    setTouchedInvalid(false);
    setPromptText("");
    setLockedPrompt("");
    setStep3Result("");
    setImproveText("");
    setSending(false);
    setReviseResult("");
    setRevisions([]);
    setFinalText("");
  }

  return (
    <div className="not-prose my-2 rounded-lg border border-slate-200 p-5 sm:p-6">
      <div className="mb-6 flex flex-wrap gap-1 border-b border-slate-200 pb-px sm:gap-2">
        {STEPS.map((step) => {
          const unlocked = step.id <= maxUnlocked;
          const active = step.id === activeStep;
          const done = completed[step.id];
          return (
            <button
              key={step.id}
              type="button"
              disabled={!unlocked}
              onClick={() => goToStep(step.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-t-md border-b-2 px-2.5 py-2 text-xs font-medium transition-colors sm:text-sm",
                active
                  ? "border-sky-500 text-sky-600"
                  : unlocked
                    ? "border-transparent text-slate-500 hover:text-slate-800"
                    : "cursor-not-allowed border-transparent text-slate-300"
              )}
            >
              {done ? (
                <CheckIcon className="h-3.5 w-3.5 flex-none text-emerald-500" />
              ) : (
                <span className={cn(active ? "text-sky-500" : "text-slate-400")}>
                  {step.id}.
                </span>
              )}
              {step.label}
            </button>
          );
        })}
      </div>

      {activeStep === 1 ? (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Langkah 1 — Tentukan Konteks
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Pilih materi yang benar-benar Anda ajarkan. Belum sempat
              mengisi? Coba salah satu contoh cepat di bawah.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {TEMPLATES.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => applyTemplate(template)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                  activeTemplateId === template.id
                    ? "border-sky-500 bg-sky-50 text-sky-700"
                    : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                {template.label}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {FIELDS.map((field) => {
              const invalid = touchedInvalid && form[field.key].trim() === "";
              return (
                <label key={field.key} className="block text-sm">
                  <span className="mb-1 block font-medium text-slate-700">
                    {field.label}
                  </span>
                  <input
                    type="text"
                    value={form[field.key]}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className={cn(
                      "w-full rounded-md border px-3 py-2 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-1",
                      invalid
                        ? "border-rose-400 focus:border-rose-400 focus:ring-rose-400"
                        : "border-slate-200 focus:border-sky-400 focus:ring-sky-400"
                    )}
                  />
                </label>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleStep1Submit}
            className={cn(primaryButtonClass, "bg-slate-900 text-white hover:bg-slate-700")}
          >
            Lanjut ke Susun Prompt →
          </button>
        </div>
      ) : null}

      {activeStep === 2 ? (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Langkah 2 — Susun Prompt (Role + Context + Task + Constraint +
              Output)
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Ini prompt yang otomatis tersusun dari isian Anda. Boleh diedit
              langsung di kotak ini sebelum dikirim ke AI.
            </p>
          </div>

          <textarea
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            rows={16}
            className={cn(textareaClass, "resize-y")}
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => goToStep(1)}
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              ← Kembali
            </button>
            <button
              type="button"
              onClick={handleStep2Submit}
              disabled={promptText.trim() === ""}
              className={cn(
                primaryButtonClass,
                promptText.trim() !== ""
                  ? "bg-slate-900 text-white hover:bg-slate-700"
                  : "cursor-not-allowed bg-slate-100 text-slate-400"
              )}
            >
              Lanjut, kirim ke AI →
            </button>
          </div>
        </div>
      ) : null}

      {activeStep === 3 ? (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Langkah 3 — Generate
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Salin prompt di bawah ini, lalu tempelkan ke asisten AI pilihan
              Anda (ChatGPT, Gemini, Claude, atau Copilot). Setelah AI
              membalas, tempelkan hasilnya di kotak kedua untuk melanjutkan ke
              langkah Improve.
            </p>
          </div>

          <CodeBlock code={lockedPrompt} lang="text" filename="Prompt yang dikirim" />

          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700">
              Tempelkan hasil dari AI di sini
            </span>
            <textarea
              value={step3Result}
              onChange={(e) => setStep3Result(e.target.value)}
              rows={10}
              placeholder="Tempel jawaban AI di sini setelah Anda menjalankan prompt di atas..."
              className={textareaClass}
            />
          </label>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => goToStep(2)}
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              ← Kembali
            </button>
            <button
              type="button"
              onClick={handleStep3Submit}
              disabled={step3Result.trim() === ""}
              className={cn(
                primaryButtonClass,
                step3Result.trim() !== ""
                  ? "bg-slate-900 text-white hover:bg-slate-700"
                  : "cursor-not-allowed bg-slate-100 text-slate-400"
              )}
            >
              Lanjut ke Improve →
            </button>
          </div>
        </div>
      ) : null}

      {activeStep === 4 ? (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Langkah 4 — Improve
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Hasil pertama AI jarang langsung sempurna, dan itu wajar. Minta
              perbaikan seperti membimbing murid — AI masih ingat materi
              sebelumnya.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {QUICK_FIXES.map((text) => (
              <button
                key={text}
                type="button"
                onClick={() => fillQuickFix(text)}
                disabled={sending}
                className="rounded-md border border-slate-200 px-3 py-2 text-left text-xs text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {text}
              </button>
            ))}
          </div>

          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700">
              Instruksi perbaikan untuk AI
            </span>
            <textarea
              ref={improveRef}
              value={improveText}
              onChange={(e) => setImproveText(e.target.value)}
              readOnly={sending}
              rows={4}
              placeholder="Contoh: Bagian nomor 3 masih terlalu sulit untuk anak kelas 3, sederhanakan tanpa mengubah materi yang diuji."
              className={cn(textareaClass, sending && "bg-slate-50 text-slate-500")}
            />
          </label>

          {!sending ? (
            <button
              type="button"
              onClick={handleSendImprove}
              disabled={improveText.trim() === ""}
              className={cn(
                primaryButtonClass,
                "text-white",
                improveText.trim() !== ""
                  ? "bg-amber-500 hover:bg-amber-600"
                  : "cursor-not-allowed bg-amber-200"
              )}
            >
              Kirim perbaikan ke AI
            </button>
          ) : (
            <div className="space-y-3 rounded-md border border-amber-200 bg-amber-50/50 p-4">
              <p className="text-sm text-amber-800">
                Kirim instruksi di atas sebagai lanjutan percakapan yang sama
                di AI Anda (bukan chat baru), lalu tempelkan hasil revisinya
                di sini.
              </p>
              <textarea
                value={reviseResult}
                onChange={(e) => setReviseResult(e.target.value)}
                rows={8}
                placeholder="Tempel hasil revisi dari AI di sini..."
                className={textareaClass}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSaveRevision}
                  disabled={reviseResult.trim() === ""}
                  className={cn(
                    "inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors",
                    reviseResult.trim() !== ""
                      ? "bg-slate-900 hover:bg-slate-700"
                      : "cursor-not-allowed bg-slate-300"
                  )}
                >
                  Simpan hasil revisi
                </button>
                <button
                  type="button"
                  onClick={handleCancelSend}
                  className="inline-flex items-center rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
              </div>
            </div>
          )}

          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Pratinjau hasil saat ini
            </p>
            <div className="max-h-64 overflow-y-auto whitespace-pre-wrap rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              {latestResult || "Belum ada hasil."}
            </div>
          </div>

          {revisions.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Riwayat revisi ({revisions.length})
              </p>
              {revisions.map((revision, i) => (
                <details key={i} className="rounded-md border border-slate-200 p-3 text-sm">
                  <summary className="cursor-pointer font-medium text-slate-700">
                    Revisi {i + 1}: {revision.instruction}
                  </summary>
                  <p className="mt-2 whitespace-pre-wrap text-slate-600">
                    {revision.result}
                  </p>
                </details>
              ))}
            </div>
          ) : null}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => goToStep(3)}
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              ← Kembali
            </button>
            <button
              type="button"
              onClick={() => goToStep(5)}
              disabled={!completed[4]}
              className={cn(
                primaryButtonClass,
                completed[4]
                  ? "bg-slate-900 text-white hover:bg-slate-700"
                  : "cursor-not-allowed bg-slate-100 text-slate-400"
              )}
            >
              Lanjut ke Finalisasi →
            </button>
          </div>
        </div>
      ) : null}

      {activeStep === 5 ? (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Langkah 5 — Finalisasi
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Ini hasil akhir dari latihan Anda. Baca ulang, sunting jika
              perlu, lalu salin untuk dipakai di kelas.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">
              Hasil akhir (bisa diedit)
            </span>
            <CopyButton text={finalText} />
          </div>
          <textarea
            value={finalText}
            onChange={(e) => setFinalText(e.target.value)}
            rows={14}
            className={textareaClass}
          />

          <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            Ringkasan latihan: 1 prompt awal, {revisions.length} kali revisi.
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => goToStep(4)}
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              ← Kembali
            </button>
            <button
              type="button"
              onClick={resetAll}
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              <RefreshIcon className="h-4 w-4" />
              Mulai dari Awal
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be unavailable (e.g. non-secure context); fail quietly.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors",
        copied
          ? "border-emerald-300 text-emerald-700"
          : "border-slate-200 text-slate-600 hover:bg-slate-50"
      )}
    >
      {copied ? (
        <>
          <CheckIcon className="h-3.5 w-3.5" />
          Disalin
        </>
      ) : (
        <>
          <CopyIcon className="h-3.5 w-3.5" />
          Salin
        </>
      )}
    </button>
  );
}
