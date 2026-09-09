import { DocArticle } from "@/components/doc-article";
import { H2, CardGrid, Card } from "@/components/content";
import { Callout } from "@/components/callout";

export default function Home() {
  return (
    <DocArticle
      href="/"
      eyebrow="Getting Started"
      title="Welcome"
      lead="This is a placeholder home page. Replace this content with your own material."
    >
      <H2>Overview</H2>
      <p>
        This page is part of a docs-site UI shell — sticky header, sidebar
        navigation, a table of contents, and prev/next pagination. Swap the
        text on this page and in the sidebar for your own content.
      </p>

      <Callout type="note">
        Everything you see here — nav links, headings, cards, this callout —
        is placeholder content. Edit{" "}
        <code>src/lib/nav.ts</code> and the pages under{" "}
        <code>src/app</code> to make it yours.
      </Callout>

      <H2>Explore the shell</H2>
      <CardGrid>
        <Card
          eyebrow="Guide"
          title="Section One"
          description="Placeholder description for the first section."
          href="/docs/installation"
        />
        <Card
          eyebrow="Guide"
          title="Section Two"
          description="Placeholder description for the second section."
          href="/docs/guides/first-guide"
        />
      </CardGrid>
    </DocArticle>
  );
}
