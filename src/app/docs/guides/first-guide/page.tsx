import type { Metadata } from "next";
import { DocArticle } from "@/components/doc-article";
import { H2, H3 } from "@/components/content";
import { CodeBlock } from "@/components/code-block";
import { Quiz } from "@/components/quiz";
import { placeholderQuiz } from "@/lib/quizzes";

export const metadata: Metadata = {
  title: "First Guide",
};

export default function FirstGuidePage() {
  return (
    <DocArticle
      href="/docs/guides/first-guide"
      eyebrow="Guides"
      title="First Guide"
      lead="Placeholder page. Replace this content with your own material."
    >
      <H2>A code example</H2>
      <p>
        This page demonstrates the code block component, including the copy
        button and syntax highlighting for Python and Bash.
      </p>

      <CodeBlock
        lang="python"
        filename="example.py"
        code={`def greet(name: str) -> str:
    # Replace this with real content
    return f"Hello, {name}!"

print(greet("world"))`}
      />

      <H3>Check your understanding</H3>
      <p>A small quiz, also placeholder content:</p>

      <Quiz questions={placeholderQuiz} />
    </DocArticle>
  );
}
