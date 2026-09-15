"use client";

import { cn } from "@/lib/utils";
import { CheckIcon, RefreshIcon } from "@/components/icons";
import {
  GRADE_COMPONENT_KEYS,
  type GradeComponentKey,
  type GradeResult,
} from "@/lib/grade-prompt-types";

const COMPONENT_LABELS: Record<GradeComponentKey, string> = {
  role: "ROLE",
  context: "CONTEXT",
  task: "TASK",
  constraint: "CONSTRAINT",
  output: "OUTPUT",
};

export type GradeStatus = "idle" | "pending" | "error" | "success";

type GradeResultPanelProps = {
  status: GradeStatus;
  result: GradeResult | null;
  error: string | null;
};

/**
 * Shared result panel for Sesi 4's Langkah 6 and 7 "Nilai Prompt Saya"
 * button: renders nothing while idle, a spinner while pending, a friendly
 * error box on failure, or the score + feedback + five-component breakdown
 * on success (the breakdown grid is skipped when the model's reply couldn't
 * be parsed into that shape — see the route handler's fallback).
 */
export function GradeResultPanel({ status, result, error }: GradeResultPanelProps) {
  if (status === "idle") {
    return null;
  }

  if (status === "pending") {
    return (
      <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <RefreshIcon className="h-4 w-4 animate-spin" />
        Menilai prompt Anda...
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-md border border-rose-200 bg-rose-50/50 p-4 text-sm text-rose-700">
        {error ?? "Terjadi kesalahan saat menilai prompt."}
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const scoreColor =
    result.score >= 80
      ? "text-emerald-600"
      : result.score >= 50
        ? "text-amber-600"
        : "text-rose-600";

  return (
    <div className="space-y-3 rounded-md border border-slate-200 p-4">
      <div className="flex items-baseline gap-1.5">
        <span className={cn("text-3xl font-bold", scoreColor)}>{result.score}</span>
        <span className="text-sm text-slate-500">/ 100</span>
      </div>
      <p className="text-sm leading-6 text-slate-700">{result.feedback}</p>

      {result.breakdown ? (
        <div className="grid gap-2 sm:grid-cols-5">
          {GRADE_COMPONENT_KEYS.map((key) => {
            const component = result.breakdown![key];
            return (
              <div
                key={key}
                className={cn(
                  "rounded-md border p-2 text-xs",
                  component.present
                    ? "border-emerald-200 bg-emerald-50/50"
                    : "border-slate-200 bg-slate-50"
                )}
              >
                <div className="mb-1 flex items-center gap-1 font-semibold text-slate-700">
                  {component.present ? (
                    <CheckIcon className="h-3 w-3 flex-none text-emerald-500" />
                  ) : null}
                  {COMPONENT_LABELS[key]}
                </div>
                <p className="text-slate-500">{component.note}</p>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
