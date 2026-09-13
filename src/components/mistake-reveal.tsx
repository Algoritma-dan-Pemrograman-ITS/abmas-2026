"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type Mistake = {
  /** Short label for the kind of error, e.g. "Fakta salah". */
  label: string;
  /** Why it's wrong, shown once revealed. */
  explanation: string;
};

/**
 * "Temukan Kesalahan AI" activity: shows a confident-sounding AI answer that
 * hides a few planted mistakes. Each mistake starts as a "what's wrong here?"
 * button and reveals its explanation on click, so readers can try to spot it
 * themselves before checking.
 */
export function MistakeReveal({
  text,
  mistakes,
}: {
  text: string;
  mistakes: Mistake[];
}) {
  const [revealed, setRevealed] = useState<boolean[]>(() =>
    mistakes.map(() => false)
  );
  const allRevealed = revealed.every(Boolean);

  function reveal(index: number) {
    setRevealed((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }

  return (
    <div className="not-prose my-6 rounded-lg border border-slate-200 p-5">
      <p className="text-sm italic leading-6 text-slate-700">
        &ldquo;{text}&rdquo;
      </p>

      <div className="mt-4 space-y-2">
        {mistakes.map((mistake, index) => (
          <div
            key={mistake.label}
            className={cn(
              "rounded-md border p-3 text-sm transition-colors",
              revealed[index] ? "border-rose-400 bg-rose-50/60" : "border-slate-200"
            )}
          >
            {revealed[index] ? (
              <>
                <p className="font-semibold text-rose-800">{mistake.label}</p>
                <p className="mt-1 leading-6 text-rose-800/90">
                  {mistake.explanation}
                </p>
              </>
            ) : (
              <button
                type="button"
                onClick={() => reveal(index)}
                className="font-medium text-sky-600 hover:underline"
              >
                Apa yang salah di sini? (Kesalahan {index + 1})
              </button>
            )}
          </div>
        ))}
      </div>

      {allRevealed ? (
        <p className="mt-4 text-sm font-medium text-slate-600">
          Bayangkan kalau ini langsung dipakai jadi materi ajar tanpa dicek
          dulu.
        </p>
      ) : null}
    </div>
  );
}
