import type { Metadata } from "next";
import { DocArticle } from "@/components/doc-article";
import { H2, H3 } from "@/components/content";
import { Callout } from "@/components/callout";
import { CodeBlock } from "@/components/code-block";
import { Quiz } from "@/components/quiz";
import { sesi3Quiz } from "@/lib/quizzes";

export const metadata: Metadata = {
  title: "Sesi 3: Prompt Engineering untuk Guru",
};

export default function Sesi3Page() {
  return (
    <DocArticle
      href="/sesi-3"
      eyebrow="Sesi 3"
      title="Prompt Engineering untuk Guru"
      lead="AI tidak selalu langsung memberikan jawaban yang sesuai kebutuhan kita. Salah satu hal yang paling memengaruhi hasilnya adalah cara kita memberikan instruksi."
    >
      <p>
        Pada sesi sebelumnya, kita telah melihat bagaimana LLM dapat digunakan
        sebagai asisten guru. Pada sesi ini, kita belajar bagaimana memberikan
        instruksi yang lebih jelas agar AI dapat membantu pekerjaan guru
        dengan lebih terarah.
      </p>

      <H2>Prompt sebagai Instruksi untuk AI</H2>
      <p>
        <strong>Prompt</strong> adalah instruksi, pertanyaan, perintah, atau
        informasi yang kita berikan kepada AI agar AI menghasilkan suatu
        respons atau melakukan suatu tugas.
      </p>
      <blockquote>
        <p>Prompt adalah cara kita menjelaskan kepada AI apa yang kita inginkan.</p>
      </blockquote>
      <p>Bandingkan dua prompt berikut:</p>
      <CodeBlock code={`Jelaskan tentang fotosintesis.`} lang="text" />
      <CodeBlock
        code={`Jelaskan proses fotosintesis untuk siswa kelas 6 SD.

Gunakan bahasa sederhana dan berikan satu contoh yang dekat dengan kehidupan sehari-hari.`}
        lang="text"
      />
      <p>
        Keduanya membahas topik yang sama, tetapi pada prompt kedua AI
        mengetahui lebih banyak: siapa pembacanya, tingkat bahasa yang perlu
        digunakan, dan jenis contoh yang diharapkan. Hasilnya biasanya lebih
        terarah.
      </p>
      <p>
        AI tidak mengetahui seluruh tujuan kita secara otomatis &mdash; jika
        informasi yang diberikan masih terlalu umum, AI harus membuat asumsi
        sendiri. Namun bukan berarti prompt harus selalu panjang; yang lebih
        penting adalah <strong>informasi yang jelas dan relevan</strong>.
      </p>

      <H2>Lima Komponen Utama</H2>
      <p>Ketika baru mulai menggunakan AI, struktur berikut bisa jadi panduan:</p>
      <blockquote>
        <p>ROLE + CONTEXT + TASK + CONSTRAINT + OUTPUT</p>
      </blockquote>
      <table>
        <thead>
          <tr>
            <th>Komponen</th>
            <th>Pertanyaan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ROLE</td>
            <td>AI perlu bertindak sebagai siapa?</td>
          </tr>
          <tr>
            <td>CONTEXT</td>
            <td>Untuk siapa dan dalam kondisi apa tugas tersebut dilakukan?</td>
          </tr>
          <tr>
            <td>TASK</td>
            <td>Apa yang harus dilakukan AI?</td>
          </tr>
          <tr>
            <td>CONSTRAINT</td>
            <td>Apa aturan atau batasannya?</td>
          </tr>
          <tr>
            <td>OUTPUT</td>
            <td>Hasilnya ingin disajikan seperti apa?</td>
          </tr>
        </tbody>
      </table>
      <p>
        Tidak semua prompt harus menggunakan kelima komponen secara lengkap
        &mdash; gunakan sebagai panduan ketika kita membutuhkan hasil yang
        lebih terarah.
      </p>

      <H3>ROLE &mdash; Menentukan Peran AI</H3>
      <p>ROLE membantu memberikan arah terhadap gaya dan sudut pandang respons, misalnya:</p>
      <CodeBlock code={`Kamu adalah guru IPA kelas 6 SD.`} lang="text" />
      <p>
        Memberikan ROLE bukan berarti AI benar-benar menjadi guru; ROLE hanya
        membantu AI memahami sudut pandang dan gaya respons yang kita
        harapkan.
      </p>

      <H3>CONTEXT &mdash; Situasi Pembelajaran</H3>
      <p>
        CONTEXT bisa berupa jenjang pendidikan, kelas, usia siswa, materi,
        kemampuan siswa, atau kondisi kelas.
      </p>
      <CodeBlock
        code={`Saya mengajar kelas 7 SMP.
Siswa baru pertama kali mempelajari ekosistem
dan masih kesulitan membedakan rantai makanan
dengan jaring-jaring makanan.`}
        lang="text"
      />

      <H3>TASK &mdash; Apa yang Harus Dilakukan</H3>
      <p>Gunakan kata kerja yang jelas. Bandingkan:</p>
      <CodeBlock code={`Materi tentang ekosistem.`} lang="text" />
      <p>dengan:</p>
      <CodeBlock code={`Buatkan rangkuman materi tentang ekosistem.`} lang="text" />
      <p>Instruksi kedua lebih jelas karena AI tahu tindakan apa yang harus dilakukan.</p>

      <H3>CONSTRAINT &mdash; Aturan dan Batasan</H3>
      <p>
        CONSTRAINT mengatur jumlah, panjang, tingkat kesulitan, gaya bahasa,
        durasi, sumber daya, dan hal yang perlu dihindari.
      </p>
      <p>
        <strong>CONTEXT</strong> menjelaskan kondisi yang sedang kita hadapi
        (&ldquo;Waktu pembelajaran saya hanya 30 menit.&rdquo;), sedangkan{" "}
        <strong>CONSTRAINT</strong> memberikan aturan terhadap hasil yang kita
        minta (&ldquo;Aktivitas yang dibuat harus dapat diselesaikan dalam
        maksimal 15 menit.&rdquo;).
      </p>

      <H3>OUTPUT &mdash; Bentuk Hasil</H3>
      <p>Menentukan bentuk output membantu ketika hasil AI ingin disalin ke dokumen, dimasukkan ke presentasi, atau dibagikan ke siswa.</p>
      <CodeBlock
        code={`Tampilkan dalam tabel dengan kolom:
Nomor, Pertanyaan, Jawaban, dan Pembahasan.`}
        lang="text"
      />

      <H3>Contoh Lengkap</H3>
      <CodeBlock
        code={`Kamu adalah guru Matematika SD.

Saya sedang mengajar siswa kelas 6 mengenai operasi pecahan.

Buatkan 5 soal untuk mengecek pemahaman siswa.

Gunakan:
- 2 soal mudah,
- 2 soal sedang,
- 1 soal sulit.

Gunakan bentuk pilihan ganda dengan 4 pilihan jawaban.

Sertakan kunci jawaban dan pembahasan singkat.

Tampilkan semuanya dalam bentuk tabel.`}
        lang="text"
      />

      <H2>Memperbaiki Hasil AI melalui Iterative Prompting</H2>
      <p>
        Prompt tidak harus langsung sempurna pada percobaan pertama. Kita
        sering baru tahu apa yang kurang setelah melihat jawaban AI. Proses
        ini disebut <strong>iterative prompting</strong>:
      </p>
      <blockquote>
        <p>Minta &rarr; Lihat Hasil &rarr; Periksa &rarr; Perbaiki &rarr; Coba Lagi</p>
      </blockquote>
      <p>
        Kita tidak perlu selalu mengulang seluruh instruksi dari awal &mdash;
        cukup memberikan arahan tambahan sesuai bagian yang masih perlu
        diperbaiki.
      </p>
      <p>Ketika hasil AI belum sesuai, hindari revisi yang terlalu umum seperti &ldquo;Buat lebih baik.&rdquo; Bandingkan dengan revisi yang spesifik:</p>
      <CodeBlock
        code={`Penjelasan ini terlalu sulit untuk siswa kelas 5 SD.

Gunakan kalimat yang lebih pendek,
hindari istilah teknis yang belum dijelaskan,
dan berikan satu contoh sederhana untuk setiap konsep.`}
        lang="text"
      />

      <H2>Kesalahan Umum saat Membuat Prompt</H2>
      <ul>
        <li><strong>Tujuan tidak jelas</strong> &mdash; misalnya &ldquo;Materi tentang pecahan.&rdquo; tanpa menyebut tugas apa yang diinginkan.</li>
        <li><strong>Konteks dan target siswa tidak jelas</strong> &mdash; AI belum tahu siapa yang akan membaca penjelasan.</li>
        <li><strong>Batasan tidak diberikan</strong> &mdash; hasil bisa jadi terlalu panjang atau kompleks.</li>
        <li><strong>Bentuk output tidak ditentukan</strong> &mdash; AI bisa memilih format yang tidak sesuai kebutuhan.</li>
        <li><strong>Instruksi saling bertentangan</strong> &mdash; misalnya meminta minimal 500 kata tapi tidak boleh lebih dari 100 kata.</li>
      </ul>

      <H2>Tips Tambahan</H2>
      <p>
        <strong>Berikan contoh jika diperlukan</strong> &mdash; daripada
        menjelaskan pola yang diinginkan panjang lebar, tunjukkan satu contoh
        konkret. <strong>Pecah tugas besar menjadi beberapa langkah</strong>{" "}
        &mdash; mulai dari outline, lalu kembangkan bagian per bagian. Cara
        ini mempermudah memeriksa dan memperbaiki hasil pada tiap langkah.
      </p>

      <Callout type="tip" title="Ringkasan">
        Prompt yang baik bukan prompt yang paling panjang, tetapi prompt yang
        jelas, relevan, dan sesuai dengan kebutuhan. AI adalah asisten &mdash;
        guru tetap memegang kendali terhadap tujuan pembelajaran dan hasil
        akhir.
      </Callout>

      <H2>Mini Quiz</H2>
      <p>Uji pemahaman Bapak/Ibu tentang struktur prompt yang sudah dipelajari.</p>
      <Quiz questions={sesi3Quiz} />
    </DocArticle>
  );
}
