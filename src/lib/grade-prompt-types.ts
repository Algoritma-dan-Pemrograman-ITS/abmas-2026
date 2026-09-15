/**
 * Shared types for the Sesi 4 "grade my prompt" feature — imported by both
 * the client (`src/components/prompt-lab.tsx`, `src/lib/grade-prompt.ts`,
 * `src/components/grade-result.tsx`) and the server
 * (`src/app/api/grade-prompt/route.ts`). Kept as types-only so this file has
 * zero runtime behavior beyond the one const array below.
 */

export type GradeComponentKey =
  | "role"
  | "context"
  | "task"
  | "constraint"
  | "output";

/**
 * Fixed, ordered list of the five framework components taught in Sesi 3.
 * Both the server's response validator and the client's breakdown grid
 * iterate this list, rather than trusting whatever keys happen to survive
 * parsing an LLM's JSON reply.
 */
export const GRADE_COMPONENT_KEYS: GradeComponentKey[] = [
  "role",
  "context",
  "task",
  "constraint",
  "output",
];

export type GradeComponentNote = {
  present: boolean;
  note: string;
};

export type GradeBreakdown = Record<GradeComponentKey, GradeComponentNote>;

export type GradeResult = {
  /** 0-100, integer. */
  score: number;
  feedback: string;
  /** `null` when the model's reply couldn't be parsed into this shape. */
  breakdown: GradeBreakdown | null;
};

export type GradePromptRequest = {
  task: string;
  prompt: string;
};

export type GradeErrorResponse = {
  error: string;
};
