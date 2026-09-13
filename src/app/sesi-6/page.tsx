import type { Metadata } from "next";
import { DocArticle } from "@/components/doc-article";
import { H2, H3 } from "@/components/content";
import { Callout } from "@/components/callout";
import { Quiz } from "@/components/quiz";
import { sesi6Quiz } from "@/lib/quizzes";

export const metadata: Metadata = {
  title: "Sesi 6: Etika, Privasi & Integritas Akademik",
};

export default function Sesi6Page() {
  return (
    <DocArticle
      href="/sesi-6"
      eyebrow="Sesi 6"
      title="Etika, Privasi & Integritas Akademik"
      lead="Sesi diskusi untuk membantu siswa menggunakan AI secara bertanggung jawab, dan membantu guru menetapkan batas penggunaan AI yang aman, adil, dan sesuai tujuan pembelajaran."
    >
      <H2>Boleh atau Tidak?</H2>
      <p>
        Bayangkan seorang guru menyalin data berikut ke chatbot AI: nama
        lengkap siswa, nilai tugas dan ujian, catatan perilaku, dan informasi
        kondisi keluarga &mdash; lalu meminta, &ldquo;Tolong analisis siswa
        mana yang berisiko tertinggal dan berikan rekomendasi
        intervensi.&rdquo;
      </p>
      <p>
        <strong>Menurut Bapak/Ibu, masalah utamanya ada di mana?</strong>{" "}
        Penggunaan AI-nya? Data yang dimasukkan? Tujuan analisisnya? Atau
        siapa yang nantinya mengambil keputusan?
      </p>
      <Callout type="note">
        Tidak perlu langsung mencari jawaban &ldquo;benar&rdquo;. Fokus sesi
        ini adalah membangun cara berpikir sebelum menggunakan AI.
      </Callout>

      <H2>Privacy: Data Apa yang Tidak Boleh Sembarangan Dimasukkan?</H2>
      <blockquote>
        <p>
          Jangan memasukkan data pribadi atau dokumen sensitif hanya karena AI
          dapat membantu memprosesnya.
        </p>
      </blockquote>
      <p>Data yang perlu sangat berhati-hati, misalnya:</p>
      <ul>
        <li>Nama lengkap siswa, NIS/NISN, alamat, dan nomor telepon.</li>
        <li>Nilai individu dan data kesehatan.</li>
        <li>Informasi keluarga dan dokumen internal sekolah.</li>
        <li>
          Untuk diri sendiri: kartu identitas, username/password/OTP, dan
          percakapan pribadi.
        </li>
      </ul>
      <Callout type="tip" title="Rule of thumb">
        Jika informasi itu tidak ingin Anda tempel di papan pengumuman
        sekolah, jangan otomatis menganggap aman untuk ditempel ke chatbot
        AI.
      </Callout>
      <p>Bandingkan dua kasus berikut:</p>
      <table>
        <thead>
          <tr>
            <th>Kasus A</th>
            <th>Kasus B</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              &ldquo;Analisis nilai Budi Santoso, NIS 12345678. Matematika:
              55, Bahasa Indonesia: 72, IPA: 61.&rdquo;
            </td>
            <td>
              &ldquo;Analisis pola hasil belajar dari data 30 siswa berikut.
              Identitas siswa telah dihapus dan diganti menjadi Siswa 01,
              Siswa 02, dst.&rdquo;
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Pertanyaan untuk didiskusikan: apakah Kasus B otomatis aman hanya
        karena nama siswa sudah dihapus? Jika data masih dapat ditebak
        berdasarkan kelas, nilai, atau kondisi tertentu, apakah data tersebut
        benar-benar anonim?
      </p>

      <H2>Anonymization: Kurangi Identitas, Pertahankan Kebutuhan</H2>
      <p>
        Sebelum mengirim data ke AI, tanyakan: <strong>&ldquo;Apakah AI
        benar-benar membutuhkan identitas orang ini untuk menyelesaikan
        tugasnya?&rdquo;</strong> Jika jawabannya tidak, identitas tersebut
        sebaiknya tidak diberikan.
      </p>
      <p>
        Namun, <strong>menghapus nama belum tentu membuat data benar-benar
        anonim</strong>. Jika hanya ada satu siswa di kelas dengan kondisi
        tertentu, kombinasi informasi seperti kelas, nilai, atau kondisi
        kesehatan tetap dapat membuat identitasnya mudah ditebak.
      </p>

      <H2>AI dan Integritas Akademik</H2>
      <p>
        Tidak semua penggunaan AI di sekolah harus diperlakukan dengan aturan
        yang sama. Ada tiga pendekatan yang dapat digunakan.
      </p>

      <H3>Pendekatan 1 &mdash; AI Prohibited</H3>
      <p>
        <strong>AI tidak boleh digunakan.</strong> Cocok ketika tujuan
        kegiatan adalah mengukur kemampuan siswa tanpa bantuan AI, misalnya
        esai argumentasi individu. Jika semua proses berpikir terus-menerus
        diserahkan ke AI, siswa bisa terbiasa melakukan{" "}
        <strong>cognitive offloading</strong>: menyerahkan proses mengingat,
        menganalisis, atau menyusun argumen kepada alat, sehingga kemampuan
        yang seharusnya dilatih justru tidak berkembang.
      </p>

      <H3>Pendekatan 2 &mdash; AI Assisted</H3>
      <p>
        <strong>AI boleh digunakan sebagai alat bantu</strong> &mdash; AI
        membantu proses, tetapi pekerjaan utama dan keputusan tetap berada
        pada siswa.
      </p>
      <ul>
        <li>
          <strong>AI sebagai tutor:</strong> &ldquo;Saya belum paham kenapa
          rumus luas lingkaran adalah &pi;r&sup2;. Jelaskan pelan-pelan dan
          beri saya satu soal latihan, tetapi jangan langsung berikan
          jawabannya.&rdquo;
        </li>
        <li>
          <strong>AI sebagai teman brainstorming:</strong> &ldquo;Berikan tiga
          kemungkinan sudut pandang untuk esai tentang dampak media sosial.
          Saya akan memilih dan mengembangkan argumennya sendiri.&rdquo;
        </li>
        <li>
          <strong>AI sebagai pengganti (hindari):</strong> &ldquo;Kerjakan
          semua soal ini dan berikan jawaban final yang tinggal saya
          salin.&rdquo;
        </li>
      </ul>
      <p>
        Pertanyaan HOTS: jika AI membantu memperbaiki 70% tulisan siswa,
        apakah karya tersebut masih dapat dianggap sebagai karya siswa? Di
        titik mana &ldquo;bantuan&rdquo; berubah menjadi
        &ldquo;penggantian&rdquo;?
      </p>

      <H3>Pendekatan 3 &mdash; AI Integrated</H3>
      <p>
        <strong>AI menjadi bagian dari proses pembelajaran</strong> &mdash;
        penggunaan AI justru dirancang sebagai bagian dari kompetensi yang
        ingin dilatih. Contoh aktivitas: berikan satu jawaban dari AI kepada
        siswa, lalu minta siswa mengidentifikasi bagian yang kuat, mencari
        bagian yang meragukan, memverifikasi informasi penting, memperbaiki
        jawabannya, dan menjelaskan mengapa versi siswa lebih baik.
      </p>
      <Callout type="note">
        Kemampuan menggunakan AI bukan hanya kemampuan membuat prompt, tetapi
        juga kemampuan meragukan, memeriksa, dan memperbaiki output AI.
      </Callout>

      <H2>Dilema Utama: &ldquo;Kalau AI Boleh, Apa yang Sebenarnya Kita Nilai?&rdquo;</H2>
      <p>
        Seorang siswa mengumpulkan presentasi yang sangat bagus. Ketika
        ditanya, ia mengatakan: &ldquo;Saya membuat outline dengan AI, meminta
        AI memperbaiki argumen, membuat beberapa contoh, lalu saya pilih dan
        edit hasilnya.&rdquo;
      </p>
      <p>
        Diskusikan: jika tujuan tugas adalah kemampuan membuat slide, apakah
        penggunaan AI bermasalah? Jika tujuannya kemampuan menyusun argumen,
        apakah jawabannya berubah? Haruskah siswa mengungkapkan penggunaan
        AI?
      </p>
      <blockquote>
        <p>
          Pertanyaan kunci: sebelum menentukan &ldquo;AI boleh atau
          tidak&rdquo;, apakah kita sudah jelas kompetensi apa yang ingin
          dinilai?
        </p>
      </blockquote>

      <H2>Prinsip Utama</H2>
      <blockquote>
        <p>AI sebagai asisten. Manusia sebagai pengambil keputusan.</p>
      </blockquote>
      <p>
        Untuk siswa: AI boleh membantu proses belajar, tetapi jangan sampai AI
        menggantikan proses berpikir yang seharusnya dilatih sendiri. Untuk
        guru: AI boleh membantu menganalisis, menyusun, dan memberikan
        alternatif, tetapi keputusan pendidikan tetap membutuhkan judgment
        manusia.
      </p>
      <p>Sebelum mengikuti output AI, tanyakan:</p>
      <ol>
        <li>Apakah data yang saya masukkan aman?</li>
        <li>Apakah saya benar-benar perlu memberikan data ini?</li>
        <li>Apakah hasil AI masuk akal dan dapat diverifikasi?</li>
        <li>Apakah AI membantu saya berpikir atau justru menggantikan saya berpikir?</li>
        <li>Jika hasil AI salah, siapa yang bertanggung jawab?</li>
      </ol>

      <H2>Ringkasan</H2>
      <ol>
        <li><strong>Protect the Data</strong> &mdash; jangan sembarangan memasukkan data pribadi, data orang lain, atau dokumen internal sekolah.</li>
        <li><strong>Anonymize & Minimize</strong> &mdash; jika identitas tidak dibutuhkan, hilangkan; berikan hanya data yang benar-benar diperlukan.</li>
        <li><strong>Define the Role of AI</strong> &mdash; AI Prohibited, AI Assisted, atau AI Integrated.</li>
        <li><strong>Ask What Is Being Assessed</strong> &mdash; aturan penggunaan AI harus mengikuti tujuan pembelajaran dan asesmen.</li>
        <li><strong>Think Before You Trust</strong> &mdash; AI dapat terdengar yakin tetapi tetap salah; verifikasi informasi penting.</li>
        <li><strong>Keep Human Judgment</strong> &mdash; AI sebagai asisten, manusia sebagai pengambil keputusan.</li>
      </ol>

      <H2>Mini Quiz</H2>
      <p>Uji pemahaman Bapak/Ibu tentang etika, privasi, dan integritas akademik dalam penggunaan AI.</p>
      <Quiz questions={sesi6Quiz} />
    </DocArticle>
  );
}
