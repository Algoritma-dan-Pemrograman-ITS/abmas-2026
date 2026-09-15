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
      lead="Coba langsung di sini. Isi konteks kelas Anda, susun prompt, minta AI membuatkan materi, minta diperbaiki, edit hasil akhirnya, lalu berlatih menulis prompt sendiri tanpa bantuan formulir — semua dalam satu halaman ini."
    >
      <Callout type="note">
        Ini adalah latihan penerapan langsung dari kerangka{" "}
        <strong>ROLE + CONTEXT + TASK + CONSTRAINT + OUTPUT</strong> yang
        dipelajari di Sesi 3. Langkah 3 (Generate) dan Langkah 5 (Finalisasi)
        memakai AI pilihan Anda sendiri (ChatGPT, Gemini, Claude, atau
        Copilot) &mdash; salin prompt yang sudah disusun, jalankan di sana,
        lalu tempel hasilnya kembali di sini untuk melanjutkan latihan.
        Langkah 6 dan 7 menilai prompt Anda secara otomatis lewat AI yang
        berjalan di server milik penyelenggara; jika servernya belum aktif,
        Anda akan melihat pesan error yang jelas, bukan halaman yang macet.
      </Callout>

      <PromptLab />
    </DocArticle>
  );
}
