import type { GradePromptRequest, GradeResult } from "@/lib/grade-prompt-types";

/**
 * Thrown by `gradePrompt` with a message safe to show directly to the
 * learner (either the server's own `{ error }` message, or a generic
 * fallback when the response body couldn't be read at all).
 */
export class GradePromptError extends Error {}

/**
 * Client-side helper for Sesi 4's Langkah 6/7: POSTs a task + prompt to the
 * grading Route Handler and returns the parsed result, or throws
 * `GradePromptError`. Shared by both steps so there is exactly one place
 * that decides what an error response looks like.
 */
export async function gradePrompt(
  input: GradePromptRequest
): Promise<GradeResult> {
  const res = await fetch("/api/grade-prompt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const body: unknown = await res.json().catch(() => null);
    const message =
      body &&
      typeof body === "object" &&
      "error" in body &&
      typeof (body as { error: unknown }).error === "string"
        ? (body as { error: string }).error
        : `Gagal menilai prompt (HTTP ${res.status}).`;
    throw new GradePromptError(message);
  }

  return (await res.json()) as GradeResult;
}
