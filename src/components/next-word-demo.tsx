"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { RefreshIcon } from "@/components/icons";

type Candidate = {
  token: string;
  pct: number;
  /** Whether a space should be inserted before this token when appended. */
  spaceBefore?: boolean;
};

type Step = {
  /** Sentence built so far, before this step's prediction. */
  sentenceSoFar: string;
  candidates: Candidate[];
};

/**
 * Every step's top candidate (index 0) is the one "chosen" — mirrors how an
 * LLM picks the highest-probability next token, one at a time.
 */
const STEPS: Step[] = [
  {
    sentenceSoFar: "Ibu kota Indonesia adalah",
    candidates: [
      { token: "Jakarta", pct: 82, spaceBefore: true },
      { token: "ibukota", pct: 6, spaceBefore: true },
      { token: "Bandung", pct: 5, spaceBefore: true },
      { token: "kota", pct: 4, spaceBefore: true },
    ],
  },
  {
    sentenceSoFar: "Ibu kota Indonesia adalah Jakarta",
    candidates: [
      { token: ",", pct: 44, spaceBefore: false },
      { token: ".", pct: 28, spaceBefore: false },
      { token: "yang", pct: 18, spaceBefore: true },
      { token: "sejak", pct: 10, spaceBefore: true },
    ],
  },
  {
    sentenceSoFar: "Ibu kota Indonesia adalah Jakarta,",
    candidates: [
      { token: "kota", pct: 37, spaceBefore: true },
      { token: "yang", pct: 23, spaceBefore: true },
      { token: "ibu", pct: 20, spaceBefore: true },
      { token: "sebuah", pct: 20, spaceBefore: true },
    ],
  },
  {
    sentenceSoFar: "Ibu kota Indonesia adalah Jakarta, kota",
    candidates: [
      { token: "terbesar", pct: 41, spaceBefore: true },
      { token: "besar", pct: 26, spaceBefore: true },
      { token: "penting", pct: 19, spaceBefore: true },
      { token: "tua", pct: 14, spaceBefore: true },
    ],
  },
];

function appendToken(sentence: string, candidate: Candidate): string {
  return candidate.spaceBefore === false
    ? `${sentence}${candidate.token}`
    : `${sentence} ${candidate.token}`;
}

/**
 * "Cara kerja LLM secara sederhana": walks through a few autoregressive
 * next-token predictions one step at a time. Each step shows candidate
 * words as probability bars before revealing which one gets picked (always
 * the highest, i.e. greedy decoding) and appended to the sentence.
 */
export function NextWordDemo() {
  const [step, setStep] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const total = STEPS.length;
  const done = step >= total;

  const current = STEPS[Math.min(step, total - 1)];
  const chosen = current.candidates[0];

  function showCandidates() {
    setRevealed(true);
  }

  function pickAndAdvance() {
    setStep((s) => s + 1);
    setRevealed(false);
  }

  function restart() {
    setStep(0);
    setRevealed(false);
  }

  return (
    <div className="not-prose my-6 rounded-lg border border-slate-200 p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        Simulasi: satu kata setiap kali
      </p>

      <div className="mt-3 rounded-md border border-slate-200 bg-slate-50 p-4">
        <p className="font-mono text-sm leading-6 text-slate-800">
          {done ? appendToken(STEPS[total - 1].sentenceSoFar, STEPS[total - 1].candidates[0]) : current.sentenceSoFar}{" "}
          <span className="text-sky-500">
            {done ? "… dan seterusnya" : "___"}
          </span>
        </p>
      </div>

      {!done ? (
        <div className="mt-4 space-y-4">
          {revealed ? (
            <>
              <p className="text-sm text-slate-600">
                LLM menghitung peluang setiap kemungkinan kata berikutnya:
              </p>
              <div className="space-y-2">
                {current.candidates.map((c, i) => (
                  <div key={c.token} className="flex items-center gap-3">
                    <span
                      className={cn(
                        "w-20 flex-none truncate font-mono text-sm",
                        i === 0 ? "font-semibold text-sky-700" : "text-slate-500"
                      )}
                    >
                      &ldquo;{c.token}&rdquo;
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          i === 0 ? "bg-sky-500" : "bg-slate-300"
                        )}
                        style={{ width: `${c.pct}%` }}
                      />
                    </div>
                    <span className="w-10 flex-none text-right text-xs text-slate-400">
                      {c.pct}%
                    </span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={pickAndAdvance}
                className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
              >
                Pilih &ldquo;{chosen.token}&rdquo; (peluang tertinggi) →
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={showCandidates}
              className="inline-flex items-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Prediksi kata berikutnya
            </button>
          )}
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          <p className="text-sm leading-6 text-slate-600">
            LLM mengulangi proses ini &mdash; hitung peluang, pilih kata
            paling mungkin, tambahkan ke kalimat &mdash; berkali-kali sampai
            jawabannya selesai. Tidak ada &ldquo;pemahaman&rdquo; makna
            seperti manusia, murni pola statistik dari teks yang pernah
            dipelajarinya.
          </p>
          <button
            type="button"
            onClick={restart}
            className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <RefreshIcon className="h-4 w-4" />
            Ulangi simulasi
          </button>
        </div>
      )}
    </div>
  );
}
