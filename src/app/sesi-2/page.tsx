import type { Metadata } from "next";
import { DocArticle } from "@/components/doc-article";
import { H2, H3 } from "@/components/content";
import { Callout } from "@/components/callout";
import { CodeBlock } from "@/components/code-block";
import { Quiz } from "@/components/quiz";
import { sesi2Quiz } from "@/lib/quizzes";

export const metadata: Metadata = {
  title: "Sesi 2: LLM sebagai Asisten Guru",
};

export default function Sesi2Page() {
  return (
    <DocArticle
      href="/sesi-2"
      eyebrow="Sesi 2"
      title="LLM sebagai Asisten Guru"
      lead="Bagaimana satu informasi sederhana dari guru bisa dikembangkan LLM menjadi materi, aktivitas, soal, rubrik, dan administrasi kelas."
    >
      <p>
        Dalam konteks pendidikan, LLM sebaiknya dipandang sebagai{" "}
        <strong>asisten guru</strong>, bukan pengganti guru. LLM dapat
        membantu mengembangkan ide, membuat draf, dan menyajikan beberapa
        pilihan. Namun guru tetap menjadi pihak yang memahami kondisi siswa,
        menentukan tujuan pembelajaran, dan mengambil keputusan pedagogis.
      </p>
      <p>Satu informasi sederhana bisa dikembangkan menjadi berbagai kebutuhan:</p>
      <CodeBlock code={`Saya mengajar IPA kelas 7 tentang ekosistem.`} lang="text" />
      <p>Dari informasi tersebut, LLM dapat membantu membuat materi, aktivitas kelompok, soal, rubrik penilaian, rangkuman, hingga pengumuman atau laporan kegiatan.</p>
      <Callout type="note" title="Analogi sederhana">
        LLM seperti <strong>rekan kerja yang cepat memberikan draf dan ide</strong>.
        Rekan kerja itu membantu menyiapkan bahan, tetapi guru tetap perlu
        membaca, memperbaiki, dan memastikan hasilnya sesuai tujuan serta
        kondisi kelas.
      </Callout>

      <H2>Perencanaan Pembelajaran</H2>
      <p>
        LLM dapat membantu menyusun rancangan pembelajaran, memberi variasi
        aktivitas, brainstorming metode, merumuskan tujuan pembelajaran yang
        lebih spesifik, dan mengembangkan ide project. Berikan informasi
        mengenai mata pelajaran, kelas, topik, durasi, dan fasilitas yang
        tersedia agar hasilnya lebih terarah.
      </p>
      <CodeBlock
        code={`Saya mengajar IPA kelas 7 dengan topik ekosistem.
Buatkan rancangan pembelajaran untuk satu pertemuan selama 40 menit.
Rancangan harus berisi tujuan pembelajaran, kegiatan pembuka, kegiatan inti,
kegiatan penutup, dan assessment singkat.
Gunakan bahasa yang praktis dan sesuaikan dengan kondisi kelas biasa.`}
        lang="text"
      />
      <p>
        Guru tetap perlu menyesuaikan rancangan tersebut dengan jumlah siswa,
        fasilitas, jadwal, dan kebijakan sekolah.
      </p>

      <H2>Pembuatan Materi</H2>
      <p>
        LLM dapat membantu menjelaskan konsep dengan bahasa sederhana,
        membuat contoh dan analogi yang dekat dengan kehidupan siswa, serta
        menyesuaikan kedalaman materi dengan usia siswa. Topik yang sama bisa
        dijelaskan berbeda untuk jenjang berbeda.
      </p>
      <H3>Contoh: Konsep Evaporasi</H3>
      <p>
        <strong>Untuk siswa SD:</strong> Evaporasi adalah perubahan air
        menjadi uap karena mendapat panas. Contohnya, pakaian basah menjadi
        kering ketika dijemur.
      </p>
      <p>
        <strong>Untuk siswa SMP:</strong> Evaporasi adalah proses perubahan
        wujud zat dari cair menjadi gas yang terjadi pada permukaan zat cair.
      </p>
      <p>
        <strong>Untuk siswa SMA:</strong> Evaporasi terjadi ketika sebagian
        molekul memperoleh energi yang cukup untuk lepas dari gaya tarik
        antarmolekul. Laju evaporasi dipengaruhi suhu, luas permukaan,
        kelembapan, dan pergerakan udara.
      </p>
      <p>
        Perbedaannya bukan hanya panjang teks, tetapi juga kosakata, kedalaman
        konsep, dan jenis penjelasan yang digunakan.
      </p>

      <H2>Pembuatan Assessment</H2>
      <p>
        LLM dapat membantu membuat soal pilihan ganda, essay, studi kasus,
        soal HOTS, dan rubrik penilaian. Agar hasilnya lebih sesuai, berikan
        konteks: mata pelajaran, kelas, topik, tingkat kesulitan, jumlah soal,
        tujuan pembelajaran, dan format keluaran.
      </p>
      <p>
        <strong>Prompt terlalu umum:</strong>
      </p>
      <CodeBlock code={`Buatkan soal tentang ekosistem.`} lang="text" />
      <p>
        <strong>Prompt yang lebih baik:</strong>
      </p>
      <CodeBlock
        code={`Saya mengajar IPA kelas 7 dengan materi ekosistem.
Buatkan 5 soal pilihan ganda dengan tingkat kesulitan sedang.
Soal harus mengukur pemahaman mengenai hubungan antara komponen biotik dan abiotik.
Setiap soal memiliki 4 pilihan jawaban.
Sertakan kunci jawaban dan alasan singkat untuk setiap jawaban.
Gunakan situasi yang dekat dengan kehidupan sehari-hari siswa.`}
        lang="text"
      />
      <p>
        Prompt kedua lebih baik karena memberikan konteks, tugas, kriteria,
        dan format output secara jelas.
      </p>

      <H2>Administrasi Guru</H2>
      <p>
        LLM dapat membantu menyusun draf awal untuk pengumuman, surat, email,
        ringkasan rapat, dan laporan kegiatan. Guru tidak harus selalu memulai
        dari halaman kosong, tetapi hasilnya tetap perlu diperiksa sebelum
        dikirim atau digunakan.
      </p>
      <CodeBlock
        code={`Buatkan pengumuman kepada orang tua siswa mengenai kegiatan kerja bakti sekolah pada hari Sabtu.
Gunakan bahasa yang formal tetapi tetap ramah.
Sertakan waktu, tempat, perlengkapan yang perlu dibawa, dan imbauan untuk hadir tepat waktu.
Gunakan format yang singkat dan mudah dibaca.`}
        lang="text"
      />

      <H2>Personalisasi Pembelajaran</H2>
      <p>
        Satu materi dapat dikembangkan menjadi tiga tingkat kesulitan:{" "}
        <strong>remedial</strong> (bahasa lebih sederhana, lebih banyak
        contoh), <strong>reguler</strong> (sesuai tujuan pembelajaran dan
        tingkat kelas), dan <strong>pengayaan</strong> (analisis lebih
        mendalam, studi kasus, soal HOTS) untuk siswa yang sudah menguasai
        konsep dasar.
      </p>
      <CodeBlock
        code={`Saya mengajar IPA kelas 7 tentang ekosistem.
Buatkan tiga versi materi dan aktivitas dengan tujuan memahami hubungan antara
komponen biotik dan abiotik:

1. Versi remedial untuk siswa yang masih kesulitan.
2. Versi reguler untuk mayoritas siswa.
3. Versi pengayaan untuk siswa yang sudah menguasai konsep dasar.

Untuk setiap versi, sertakan penjelasan singkat, aktivitas, dan dua pertanyaan evaluasi.
Gunakan bahasa yang sesuai dengan tingkat kesulitannya.`}
        lang="text"
      />

      <H2>Cara Memberikan Instruksi yang Baik</H2>
      <p>Formula sederhana yang dapat digunakan adalah:</p>
      <blockquote>
        <p>Konteks + Tugas + Kriteria + Format Output</p>
      </blockquote>
      <CodeBlock
        code={`Saya mengajar IPA kelas 7 tentang ekosistem. Buatkan aktivitas pembelajaran
selama 30 menit yang dilakukan berkelompok, tidak membutuhkan internet,
dan menggunakan benda yang mudah ditemukan di sekolah. Berikan dalam bentuk tabel
berisi nama aktivitas, langkah pelaksanaan, alat yang dibutuhkan, dan tujuan aktivitas.`}
        lang="text"
      />

      <H2>Hal yang Perlu Diperhatikan</H2>
      <ul>
        <li>Jawaban LLM dapat salah atau tidak akurat &mdash; verifikasi fakta, istilah, rumus, tanggal, dan sumber.</li>
        <li>Periksa soal sebelum digunakan: kunci jawaban, ambiguitas, dan tingkat kesulitan.</li>
        <li>Sesuaikan dengan kondisi siswa: kemampuan membaca, bahasa, budaya, dan kebutuhan khusus.</li>
        <li>Jangan memasukkan data sensitif siswa (nama lengkap, nilai, alamat, nomor identitas).</li>
        <li>Jaga kerahasiaan dokumen sekolah yang ditempelkan ke LLM.</li>
        <li>Perhatikan bias dan kesesuaian bahasa dengan konteks sekolah.</li>
        <li>Keputusan akhir tetap pada guru.</li>
      </ul>

      <Callout type="tip" title="Penutup">
        LLM paling bermanfaat ketika digunakan sebagai partner untuk
        brainstorming, membuat draf, dan mengembangkan ide, sementara guru
        tetap menentukan tujuan, konteks, dan keputusan akhir pembelajaran.
      </Callout>

      <H2>Mini Quiz</H2>
      <p>
        Uji pemahaman Bapak/Ibu tentang materi sesi ini, lalu lihat skor di
        akhir.
      </p>
      <Quiz questions={sesi2Quiz} />
    </DocArticle>
  );
}
