"use client";

import { useState } from "react";
import { CheckIcon, CloseIcon, RefreshIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export type DataSafetyChoice = "stop" | "minimize" | "safe";

export type DataSafetyCase = {
  text: string;
  answer: DataSafetyChoice;
  explanation: string;
};

const choices: { id: DataSafetyChoice; label: string }[] = [
  { id: "stop", label: "Jangan masukkan" },
  { id: "minimize", label: "Kurangi data dulu" },
  { id: "safe", label: "Boleh digunakan untuk kebutuhan ini" },
];

/**
 * A short, scenario-based exercise for deciding how school data should be
 * handled before it is shared with an AI tool.
 */
export function DataSafetyActivity({ cases }: { cases: DataSafetyCase[] }) {
  const total = cases.length;
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(DataSafetyChoice | null)[]>(() =>
    cases.map(() => null)
  );
  const [finished, setFinished] = useState(false);

  const item = cases[current];
  const answer = answers[current];
  const answered = answer !== null;
  const isCorrect = answered && answer === item.answer;
  const correctCount = answers.reduce(
    (totalCorrect, selected, index) =>
      totalCorrect + (selected === cases[index].answer ? 1 : 0),
    0
  );
  const progress = ((current + (answered ? 1 : 0)) / total) * 100;

  function choose(choice: DataSafetyChoice) {
    if (answered) return;
    setAnswers((previous) => {
      const next = [...previous];
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
    const score = Math.round((correctCount / total) * 100);
    return (
      <div className="not-prose my-6 rounded-lg border border-slate-200 p-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Aktivitas selesai
        </p>
        <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
          {correctCount} <span className="text-slate-300">/</span> {total}
        </p>
        <p className="mt-1 text-sm font-medium text-sky-600">{score}%</p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
          Saat ragu, jangan terburu-buru menempelkan data. Hapus identitas,
          kurangi detail yang tidak diperlukan, atau gunakan ringkasan data kelas.
        </p>
        <button
          type="button"
          onClick={restart}
          className="mt-6 inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          <RefreshIcon className="h-4 w-4" />
          Ulangi aktivitas
        </button>
      </div>
    );
  }

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

      <p className="mb-4 text-base font-semibold leading-6 text-slate-900">
        {item.text}
      </p>

      <div className="space-y-2">
        {choices.map((choice) => {
          const state = !answered
            ? "idle"
            : choice.id === item.answer
              ? "correct"
              : choice.id === answer
                ? "wrong"
                : "muted";

          return (
            <button
              key={choice.id}
              type="button"
              onClick={() => choose(choice.id)}
              disabled={answered}
              className={cn(
                "flex w-full items-center gap-3 rounded-md border px-4 py-2.5 text-left text-sm transition-colors",
                state === "idle" &&
                  "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                state === "correct" &&
                  "border-emerald-500 bg-emerald-50 text-emerald-900",
                state === "wrong" && "border-rose-500 bg-rose-50 text-rose-900",
                state === "muted" && "border-slate-200 text-slate-400",
                answered && "cursor-default"
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 flex-none items-center justify-center rounded-full border text-[0.7rem] font-semibold",
                  state === "correct" &&
                    "border-emerald-500 bg-emerald-500 text-white",
                  state === "wrong" && "border-rose-500 bg-rose-500 text-white",
                  (state === "idle" || state === "muted") &&
                    "border-slate-300 text-slate-400"
                )}
              >
                {state === "correct" ? (
                  <CheckIcon className="h-3 w-3" />
                ) : state === "wrong" ? (
                  <CloseIcon className="h-3 w-3" />
                ) : (
                  String.fromCharCode(65 + choices.indexOf(choice))
                )}
              </span>
              <span>{choice.label}</span>
            </button>
          );
        })}
      </div>

      {answered ? (
        <div
          className={cn(
            "mt-4 rounded-r-md border-l-4 p-4 text-sm",
            isCorrect
              ? "border-emerald-500 bg-emerald-50/60"
              : "border-rose-500 bg-rose-50/60"
          )}
        >
          <p
            className={cn(
              "mb-1 font-semibold",
              isCorrect ? "text-emerald-800" : "text-rose-800"
            )}
          >
            {isCorrect ? "Pilihan yang paling aman" : "Perlu dipertimbangkan lagi"}
          </p>
          <p
            className={cn(
              "leading-6",
              isCorrect ? "text-emerald-800" : "text-rose-800"
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
