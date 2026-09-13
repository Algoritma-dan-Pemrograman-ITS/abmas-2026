import type { Metadata } from "next";
import { DocArticle } from "@/components/doc-article";
import { Callout } from "@/components/callout";
import { PromptLab } from "@/components/prompt-lab";

export const metadata: Metadata = {
  title: "Sesi 4: Kelas Prompt — Buat Materi Bareng AI",
};

export default function Sesi4Page() {
  return (
    <DocArticle
      href="/sesi-4"
      eyebrow="Sesi 4 — Hands-on"
      title="Kelas Prompt: Buat Materi Bareng AI"
      lead="Coba langsung 5 langkahnya di sini. Isi konteks kelas Anda, susun prompt, minta AI membuatkan materi, minta diperbaiki, lalu edit hasil akhirnya — semua dalam satu halaman ini."
    >
      <Callout type="note">
        Ini adalah latihan penerapan langsung dari kerangka{" "}
        <strong>ROLE + CONTEXT + TASK + CONSTRAINT + OUTPUT</strong> yang
        dipelajari di Sesi 3. Langkah 3 (Generate) dan Langkah 5 (Finalisasi)
        memakai AI pilihan Anda sendiri (ChatGPT, Gemini, Claude, atau
        Copilot) &mdash; salin prompt yang sudah disusun, jalankan di sana,
        lalu tempel hasilnya kembali di sini untuk melanjutkan latihan.
      </Callout>

      <PromptLab />
    </DocArticle>
  );
}
