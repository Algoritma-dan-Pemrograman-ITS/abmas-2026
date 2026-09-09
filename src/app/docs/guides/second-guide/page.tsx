import type { Metadata } from "next";
import { DocArticle } from "@/components/doc-article";
import { H2 } from "@/components/content";
import { Callout } from "@/components/callout";

export const metadata: Metadata = {
  title: "Second Guide",
};

export default function SecondGuidePage() {
  return (
    <DocArticle
      href="/docs/guides/second-guide"
      eyebrow="Guides"
      title="Second Guide"
      lead="Placeholder page. Replace this content with your own material."
    >
      <H2>Placeholder section</H2>
      <p>
        This is the last page in the placeholder nav, so its pagination
        footer only shows a &ldquo;Previous&rdquo; link and no &ldquo;Next&rdquo; link.
      </p>

      <Callout type="warning">
        This is a warning-style callout, shown here just to demonstrate the
        variant.
      </Callout>
    </DocArticle>
  );
}
