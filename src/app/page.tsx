import { DocArticle } from "@/components/doc-article";
import { H2, CardGrid, Card } from "@/components/content";
import { Callout } from "@/components/callout";

export default function Home() {
  return (
    <DocArticle
      href="/"
      eyebrow="Abmas 2026"
      title="Pelatihan AI untuk Guru"
      lead="Materi pelatihan tentang bagaimana guru dapat menggunakan Large Language Model (LLM) secara efektif, kritis, dan bertanggung jawab dalam pekerjaan sehari-hari."
    >
      <p>
        Pelatihan ini disusun untuk Bapak/Ibu Guru yang penasaran &mdash; atau
        masih ragu-ragu &mdash; soal ChatGPT, Gemini, Claude, dan sejenisnya.
        Materinya dibagi menjadi beberapa sesi yang saling melengkapi: mulai
        dari mengenal apa itu AI dan LLM, memakainya sebagai asisten
        menyiapkan bahan ajar, menulis instruksi (prompt) yang jelas, sampai
        berpikir kritis dan menjaga privasi saat menggunakannya.
      </p>

      <Callout type="note">
        Setiap sesi bisa dibaca berurutan menggunakan tombol{" "}
        <em>Previous / Next</em> di bagian bawah halaman, atau dipilih
        langsung lewat menu di samping.
      </Callout>

      <H2>Sesi Pelatihan</H2>
      <CardGrid>
        <Card
          eyebrow="Sesi 1"
          title="Mengenal LLM & AI dalam Pendidikan"
          description="Apa itu AI, Generative AI, dan LLM &mdash; plus kemampuan dan keterbatasannya."
          href="/sesi-1"
        />
        <Card
          eyebrow="Sesi 2"
          title="LLM sebagai Asisten Guru"
          description="Memakai LLM untuk membuat materi, aktivitas, assessment, dan administrasi."
          href="/sesi-2"
        />
        <Card
          eyebrow="Sesi 3"
          title="Prompt Engineering untuk Guru"
          description="Menyusun instruksi yang jelas dengan ROLE + CONTEXT + TASK + CONSTRAINT + OUTPUT."
          href="/sesi-3"
        />
        <Card
          eyebrow="Sesi 4 — Hands-on"
          title="Kelas Prompt: Buat Materi Bareng AI"
          description="Latihan langsung 5 langkah: konteks, susun prompt, generate, improve, dan finalisasi."
          href="/sesi-4"
        />
        <Card
          eyebrow="Sesi 5"
          title="Critical Thinking & Fact Checking"
          description="Mengapa AI bisa 'mengarang' dengan yakin, dan cara memverifikasi jawabannya."
          href="/sesi-5"
        />
        <Card
          eyebrow="Sesi 6"
          title="Etika, Privasi & Integritas Akademik"
          description="Batas penggunaan AI yang aman, adil, dan sesuai tujuan pembelajaran."
          href="/sesi-6"
        />
      </CardGrid>
    </DocArticle>
  );
}
