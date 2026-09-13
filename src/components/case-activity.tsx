"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckIcon, CloseIcon, RefreshIcon } from "@/components/icons";

export type Case = {
  /** The scenario text shown on the card, e.g. "Membuat 20 soal matematika kelas 7." */
  text: string;
  /** Whether the "correct" answer is clearly yes, clearly no, or genuinely debatable. */
  category: "bisa" | "tidak-bisa" | "ambigu";
  /** Feedback shown after answering, regardless of which button was picked. */
  explanation: string;
};

type Choice = "bisa" | "tidak-bisa";

const LABELS: Record<Choice, string> = {
  bisa: "Bisa",
  "tidak-bisa": "Tidak Bisa",
};

/**
 * "Bisa atau Tidak Bisa?" case activity, built on the exact same visual
 * pattern as <Quiz>: one case at a time behind a progress bar, full-width
 * option buttons with a leading status badge, instant feedback callout, and
 * a "Next" button. After the last case, a score screen appears with a
 * "Redo activity" button that resets all state.
 */
export function CaseActivity({ cases }: { cases: Case[] }) {
  const total = cases.length;
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(Choice | null)[]>(() =>
    cases.map(() => null)
  );
  const [finished, setFinished] = useState(false);

  const item = cases[current];
  const answer = answers[current];
  const answered = answer !== null;
  const isAmbiguous = item.category === "ambigu";
  const expected: Choice = item.category === "bisa" ? "bisa" : "tidak-bisa";
  const isCorrect = answered && !isAmbiguous && answer === expected;

  const gradedCases = cases.filter((c) => c.category !== "ambigu");
  const ambiguousCount = total - gradedCases.length;
  const correctCount = cases.reduce((acc, c, i) => {
    if (c.category === "ambigu" || answers[i] === null) return acc;
    const exp: Choice = c.category === "bisa" ? "bisa" : "tidak-bisa";
    return acc + (answers[i] === exp ? 1 : 0);
  }, 0);

  function choose(choice: Choice) {
    if (answered) return; // lock in the first choice
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = choice;
      return next;
    });
  }

  function goNext() {
    if (current < total - 1) setCurrent(current + 1);
    else setFinished(true);
  }

  function restart() {
    setAnswers(cases.map(() => null));
    setCurrent(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <SummaryScreen
        correctCount={correctCount}
        gradedTotal={gradedCases.length}
        ambiguousCount={ambiguousCount}
        onRestart={restart}
      />
    );
  }

  const progress = ((current + (answered ? 1 : 0)) / total) * 100;

  return (
    <div className="not-prose my-6 rounded-lg border border-slate-200 p-5 sm:p-6">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Kasus {current + 1} dari {total}
        </span>
      </div>
      <div className="mb-5 h-1 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-sky-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mb-4 text-base font-semibold text-slate-900">
        &ldquo;{item.text}&rdquo;
      </p>

      <div className="space-y-2">
        {(["bisa", "tidak-bisa"] as const).map((choice) => {
          const state = !answered
            ? "idle"
            : isAmbiguous
              ? choice === answer
                ? "ambiguous"
                : "muted"
              : choice === expected
                ? "correct"
                : choice === answer
                  ? "wrong"
                  : "muted";

          return (
            <button
              key={choice}
              type="button"
              onClick={() => choose(choice)}
              disabled={answered}
              className={cn(
                "flex w-full items-center gap-3 rounded-md border px-4 py-2.5 text-left text-sm transition-colors",
                state === "idle" &&
                  "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                state === "correct" && "border-emerald-500 bg-emerald-50 text-emerald-900",
                state === "wrong" && "border-rose-500 bg-rose-50 text-rose-900",
                state === "ambiguous" && "border-amber-500 bg-amber-50 text-amber-900",
                state === "muted" && "border-slate-200 text-slate-400",
                answered && "cursor-default"
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 flex-none items-center justify-center rounded-full border text-[0.7rem] font-semibold",
                  state === "correct" && "border-emerald-500 bg-emerald-500 text-white",
                  state === "wrong" && "border-rose-500 bg-rose-500 text-white",
                  state === "ambiguous" && "border-amber-500 bg-amber-500 text-white",
                  (state === "idle" || state === "muted") &&
                    "border-slate-300 text-slate-400"
                )}
              >
                {state === "correct" || state === "ambiguous" ? (
                  <CheckIcon className="h-3 w-3" />
                ) : state === "wrong" ? (
                  <CloseIcon className="h-3 w-3" />
                ) : choice === "bisa" ? (
                  "A"
                ) : (
                  "B"
                )}
              </span>
              <span>{LABELS[choice]}</span>
            </button>
          );
        })}
      </div>

      {answered ? (
        <div
          className={cn(
            "mt-4 rounded-r-md border-l-4 p-4 text-sm",
            isAmbiguous
              ? "border-amber-500 bg-amber-50/60"
              : isCorrect
                ? "border-emerald-500 bg-emerald-50/60"
                : "border-rose-500 bg-rose-50/60"
          )}
        >
          <p
            className={cn(
              "mb-1 font-semibold",
              isAmbiguous
                ? "text-amber-800"
                : isCorrect
                  ? "text-emerald-800"
                  : "text-rose-800"
            )}
          >
            {isAmbiguous
              ? "Ambigu — perlu nuansa"
              : isCorrect
                ? "Sesuai pola umum"
                : "Perlu dipertimbangkan lagi"}
          </p>
          <p
            className={cn(
              "leading-6",
              isAmbiguous
                ? "text-amber-800"
                : isCorrect
                  ? "text-emerald-800"
                  : "text-rose-800"
            )}
          >
            {item.explanation}
          </p>
        </div>
      ) : null}

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={goNext}
          disabled={!answered}
          className={cn(
            "inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
            answered
              ? "bg-slate-900 text-white hover:bg-slate-700"
              : "cursor-not-allowed bg-slate-100 text-slate-400"
          )}
        >
          {current < total - 1 ? "Kasus berikutnya" : "Lihat ringkasan"}
        </button>
      </div>
    </div>
  );
}

function SummaryScreen({
  correctCount,
  gradedTotal,
  ambiguousCount,
  onRestart,
}: {
  correctCount: number;
  gradedTotal: number;
  ambiguousCount: number;
  onRestart: () => void;
}) {
  const pct = gradedTotal > 0 ? Math.round((correctCount / gradedTotal) * 100) : 0;
  const message =
    pct >= 90
      ? "Luar biasa!"
      : pct >= 70
        ? "Kerja bagus!"
        : pct >= 50
          ? "Usaha yang baik!"
          : "Terus berlatih!";

  return (
    <div className="not-prose my-6 rounded-lg border border-slate-200 p-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        Aktivitas selesai
      </p>
      <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
        {correctCount} <span className="text-slate-300">/</span> {gradedTotal}
      </p>
      <p className="mt-1 text-sm font-medium text-sky-600">
        {pct}%, {message}
      </p>
      <div className="mx-auto mt-4 h-2 w-full max-w-xs overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-sky-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {ambiguousCount > 0 ? (
        <p className="mt-4 text-sm font-medium text-amber-700">
          {ambiguousCount} kasus ambigu &mdash; bagus untuk bahan diskusi lebih
          lanjut!
        </p>
      ) : null}
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
        Pola yang bisa ditarik: LLM cocok untuk tugas menyusun dan menghasilkan
        ide, tapi tidak untuk keputusan yang butuh penilaian manusia dan
        tanggung jawab etis.
      </p>

      <button
        type="button"
        onClick={onRestart}
        className="mt-6 inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
      >
        <RefreshIcon className="h-4 w-4" />
        Ulangi aktivitas
      </button>
    </div>
  );
}
