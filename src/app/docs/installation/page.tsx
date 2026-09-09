import type { Metadata } from "next";
import { DocArticle } from "@/components/doc-article";
import { H2 } from "@/components/content";
import { Callout } from "@/components/callout";

export const metadata: Metadata = {
  title: "Installation",
};

export default function InstallationPage() {
  return (
    <DocArticle
      href="/docs/installation"
      eyebrow="Getting Started"
      title="Installation"
      lead="Placeholder page. Replace this content with your own material."
    >
      <H2>Placeholder section</H2>
      <p>
        This is a minimal stub page — just enough structure to demonstrate
        the sidebar, table of contents, and pagination. Fill it in with your
        own instructions.
      </p>

      <Callout type="tip">
        This is a tip-style callout. There are also note and warning
        variants available in <code>src/components/callout.tsx</code>.
      </Callout>
    </DocArticle>
  );
}
