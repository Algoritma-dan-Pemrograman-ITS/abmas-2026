import type { Metadata } from "next";
import { DocArticle } from "@/components/doc-article";
import { H2, H3 } from "@/components/content";
import { Callout } from "@/components/callout";
import { CodeBlock } from "@/components/code-block";
import {
  DataSafetyActivity,
  type DataSafetyCase,
} from "@/components/data-safety-activity";
import { Quiz } from "@/components/quiz";
import { sesi6Quiz } from "@/lib/quizzes";

export const metadata: Metadata = {
  title: "Sesi 6: Etika, Privasi & Integritas Akademik",
};

const dataSafetyCases: DataSafetyCase[] = [
  {
    text: "Seorang guru ingin menempelkan tabel nilai 30 siswa yang memuat nama lengkap, NISN, nilai tiap mata pelajaran, dan catatan perilaku agar AI menentukan siapa yang perlu dipanggil.",
    answer: "stop",
    explanation:
      "Data ini memuat identitas, nilai individu, dan catatan sensitif. Selain risikonya tinggi, keputusan tentang siswa tidak boleh diserahkan kepada AI. Jangan menempelkan data tersebut.",
  },
  {
    text: "Guru ingin meminta ide penguatan pembelajaran dengan informasi: ‘Di kelas 7A, 12 dari 32 siswa masih kesulitan membedakan rantai makanan dan jaring-jaring makanan.’ Tidak ada nama atau data individu.",
    answer: "safe",
    explanation:
      "Informasi ini sudah berupa ringkasan kondisi kelas dan cukup untuk meminta ide aktivitas kelas. Tetap berikan hanya detail yang benar-benar dibutuhkan untuk tugas itu.",
  },
  {
    text: "Guru memiliki tabel nilai per bagian pelajaran dengan label ‘Siswa 01’, ‘Siswa 02’, dan seterusnya. Ia ingin AI mengelompokkan setiap siswa yang perlu bantuan belajar.",
    answer: "minimize",
    explanation:
      "Label pengganti nama belum tentu aman, dan tujuan ini masih menilai siswa satu per satu. Ubah tabel menjadi jumlah siswa yang perlu bantuan pada tiap bagian pelajaran, lalu minta AI memberi ide aktivitas kelas atau kelompok kecil.",
  },
  {
    text: "Guru akan menempelkan foto surat keterangan dokter seorang siswa agar AI merangkum alasan ketidakhadirannya untuk laporan kelas.",
    answer: "stop",
    explanation:
      "Surat dokter memuat data kesehatan dan identitas. Ringkasan laporan dapat ditulis guru sendiri tanpa membagikan dokumen atau rincian kondisi siswa ke AI.",
  },
  {
    text: "Guru memiliki daftar nilai yang sudah mengganti nama menjadi ‘Siswa 01’, tetapi masih menyertakan kelas kecil, tanggal lahir, dan keterangan bahwa siswa tersebut satu-satunya yang mendapat pendampingan khusus.",
    answer: "stop",
    explanation:
      "Mengganti nama saja belum cukup. Kombinasi detail tersebut dapat membuat seseorang mudah dikenali kembali. Hapus detail pengenal dan gunakan ringkasan pola kelas bila itu sudah memenuhi kebutuhan.",
  },
  {
    text: "Guru ingin memakai AI untuk mengubah draf materi ekosistem yang dibuatnya sendiri menjadi bahasa yang lebih sederhana untuk siswa kelas 7.",
    answer: "safe",
    explanation:
      "Tidak ada data pribadi siswa dalam tugas ini. Namun, guru tetap perlu memeriksa ketepatan konsep dan menyesuaikan hasilnya dengan keadaan kelas.",
  },
];

export default function Sesi6Page() {
  return (
    <DocArticle
      href="/sesi-6"
      eyebrow="Sesi 6"
      title="Etika, Privasi & Integritas Akademik"
      lead="Panduan bagi Bapak/Ibu Guru untuk menetapkan penggunaan AI yang aman, adil, dan selaras dengan tujuan pembelajaran serta penilaian.">
      <H2>Boleh atau Tidak?</H2>
      <p>
        Bayangkan seorang guru menyalin data berikut ke chatbot AI: nama lengkap
        siswa, nilai tugas dan ujian, catatan perilaku, dan informasi kondisi
        keluarga &mdash; lalu meminta, &ldquo;Tolong analisis siswa mana yang
        yang mungkin membutuhkan bantuan belajar dan berikan saran langkah berikutnya.&rdquo;
      </p>
      <p>
        <strong>Menurut Bapak/Ibu, masalah utamanya ada di mana?</strong>{" "}
        Penggunaan AI-nya? Data yang dimasukkan? Tujuan analisisnya? Atau siapa
        yang nantinya mengambil keputusan?
      </p>
      <Callout type="note">
        Tidak perlu langsung mencari jawaban &ldquo;benar&rdquo;. Fokus sesi ini
        adalah membangun cara berpikir sebelum menggunakan AI.
      </Callout>

      <H2>Privasi: Data Apa yang Tidak Boleh Sembarangan Dimasukkan?</H2>
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
      <Callout type="tip" title="Aturan sederhana">
        Jika informasi itu tidak ingin Anda tempel di papan pengumuman sekolah,
        jangan otomatis menganggap aman untuk ditempel ke chatbot AI.
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
              &ldquo;Analisis nilai Budi Santoso, NIS 12345678. Matematika: 55,
              Bahasa Indonesia: 72, IPA: 61.&rdquo;
            </td>
            <td>
              &ldquo;Analisis pola hasil belajar dari data 30 siswa berikut.
              Identitas siswa telah dihapus dan diganti menjadi Siswa 01, Siswa
              02, dst.&rdquo;
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Pertanyaan untuk didiskusikan: apakah Kasus B otomatis aman hanya karena
        nama siswa sudah dihapus? Jika data masih dapat ditebak berdasarkan
        kelas, nilai, atau kondisi tertentu, apakah data tersebut benar-benar
        benar-benar tidak bisa dikenali?
      </p>

      <H2>Kurangi Data Pengenal, Tetap Penuhi Kebutuhan</H2>
      <p>
        Sebelum mengirim data ke AI, tanyakan:{" "}
        <strong>
          &ldquo;Apakah AI benar-benar membutuhkan identitas orang ini untuk
          menyelesaikan tugasnya?&rdquo;
        </strong>{" "}
        Jika jawabannya tidak, identitas tersebut sebaiknya tidak diberikan.
      </p>
      <p>
        Namun,{" "}
        <strong>
          menghapus nama belum tentu membuat data benar-benar aman
        </strong>
        . Jika hanya ada satu siswa di kelas dengan kondisi tertentu, kombinasi
        informasi seperti kelas, nilai, atau kondisi kesehatan tetap dapat
        membuat identitasnya mudah ditebak.
      </p>

      <H2>Latihan: Data Ini Masuk ke AI atau Tidak?</H2>
      <p>
        Untuk setiap kasus, pilih tindakan yang paling aman. Fokusnya bukan
        hanya menghapus nama, tetapi juga mempertimbangkan apakah data itu perlu
        dibagikan dan apakah seseorang masih mudah dikenali.
      </p>
      <DataSafetyActivity cases={dataSafetyCases} />

      <H3>Contoh Prompt yang Lebih Aman</H3>
      <p>
        Jika tujuan Anda hanya mencari ide penguatan pembelajaran, jangan
        mengirim data individu. Ubah kebutuhan menjadi pola kelas dan minta
        rekomendasi yang tidak melabeli siswa.
      </p>
      <p>
        <strong>Hindari:</strong>
      </p>
      <CodeBlock
        code={`Analisis nilai Budi Santoso, NIS 12345678. Matematika: 55, Bahasa Indonesia: 72, IPA: 61. Tentukan apakah ia perlu belajar tambahan.`}
        lang="text"
      />
      <p>
        <strong>Lebih aman:</strong>
      </p>
      <CodeBlock
        code={`Di kelas 7, sebagian siswa masih kesulitan pada operasi pecahan. Berikan tiga ide aktivitas belajar tambahan selama 20 menit untuk kelompok kecil. Jangan membuat kesimpulan tentang siswa tertentu.`}
        lang="text"
      />
      <Callout type="tip" title="Sebelum menempelkan data">
        Pilih data minimum yang cukup untuk tugas tersebut. Jika ringkasan kelas
        sudah memadai, jangan gunakan data per siswa.
      </Callout>

      <H2>Etika: Adil, Sesuai Keadaan Kelas, dan Tetap Diawasi</H2>
      <p>
        Output AI dapat membawa asumsi yang tidak cocok dengan kondisi siswa,
        bahasa daerah, kebutuhan belajar yang berbeda, atau budaya sekolah. Karena itu,
        hasil AI tidak boleh dipakai untuk melabeli kemampuan, karakter, atau
        masa depan seorang siswa.
      </p>
      <ul>
        <li>
          Periksa apakah contoh, bahasa, dan rekomendasinya adil bagi semua
          siswa.
        </li>
        <li>
          Jangan menerima anggapan yang menyamaratakan siswa hanya karena
          terdengar meyakinkan.
        </li>
        <li>
          Untuk keputusan yang berdampak pada siswa, gunakan keadaan kelas dan
          pertimbangan guru, bukan saran AI semata.
        </li>
      </ul>

      <H2>AI dan Kejujuran dalam Tugas</H2>
      <p>
        Tidak semua penggunaan AI di sekolah harus diperlakukan dengan aturan
        yang sama. Ada tiga pendekatan yang dapat digunakan.
      </p>

      <H3>Pendekatan 1 &mdash; AI Tidak Boleh Digunakan</H3>
      <p>
        <strong>AI tidak boleh digunakan.</strong> Cocok ketika tujuan kegiatan
        adalah mengukur kemampuan siswa tanpa bantuan AI, misalnya esai
        argumentasi individu. Jika semua proses berpikir terus-menerus
        diserahkan ke AI, siswa bisa terlalu terbiasa menyerahkan proses
        mengingat, menganalisis, atau menyusun argumen kepada AI, sehingga kemampuan yang
        seharusnya dilatih justru tidak berkembang.
      </p>

      <H3>Pendekatan 2 &mdash; AI sebagai Alat Bantu</H3>
      <p>
        <strong>AI boleh digunakan sebagai alat bantu</strong> &mdash; AI
        membantu proses, tetapi pekerjaan utama dan keputusan tetap berada pada
        siswa.
      </p>
      <ul>
        <li>
          <strong>AI sebagai tutor:</strong> &ldquo;Saya belum paham kenapa
          rumus luas lingkaran adalah &pi;r&sup2;. Jelaskan pelan-pelan dan beri
          saya satu soal latihan, tetapi jangan langsung berikan
          jawabannya.&rdquo;
        </li>
        <li>
          <strong>AI sebagai teman brainstorming:</strong> &ldquo;Berikan tiga
          kemungkinan sudut pandang untuk esai tentang dampak media sosial. Saya
          akan memilih dan mengembangkan argumennya sendiri.&rdquo;
        </li>
        <li>
          <strong>AI sebagai pengganti (hindari):</strong> &ldquo;Kerjakan semua
          soal ini dan berikan jawaban final yang tinggal saya salin.&rdquo;
        </li>
      </ul>
      <p>
        Pertanyaan untuk didiskusikan: jika AI membantu memperbaiki 70% tulisan siswa, apakah
        karya tersebut masih dapat dianggap sebagai karya siswa? Di titik mana
        &ldquo;bantuan&rdquo; berubah menjadi &ldquo;penggantian&rdquo;?
      </p>

      <H3>Pendekatan 3 &mdash; AI sebagai Bagian Pembelajaran</H3>
      <p>
        <strong>AI menjadi bagian dari proses pembelajaran</strong> &mdash;
        penggunaan AI justru dirancang sebagai bagian dari kemampuan yang ingin
        dilatih. Contoh aktivitas: berikan satu jawaban dari AI kepada siswa,
        lalu minta siswa mengidentifikasi bagian yang kuat, mencari bagian yang
        meragukan, mengecek informasi penting, memperbaiki jawabannya, dan
        menjelaskan mengapa versi siswa lebih baik.
      </p>
      <Callout type="note">
        Kemampuan menggunakan AI bukan hanya kemampuan membuat prompt, tetapi
        juga kemampuan meragukan, memeriksa, dan memperbaiki output AI.
      </Callout>

      <H2>Tetapkan Aturan Sebelum Tugas Dimulai</H2>
      <p>
        Beri tahu siswa peran AI yang diizinkan <strong>sebelum</strong> mereka
        mengerjakan tugas. Aturan perlu mengikuti kemampuan yang hendak dinilai
        dan menyebutkan bukti proses yang perlu dikumpulkan.
      </p>
      <table>
        <thead>
          <tr>
            <th>Tujuan tugas</th>
            <th>Peran AI</th>
            <th>Bukti yang dikumpulkan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mengukur kemampuan menyusun argumen individu</td>
            <td>AI tidak boleh digunakan</td>
            <td>Pengerjaan mandiri sesuai aturan penilaian</td>
          </tr>
          <tr>
            <td>Mengembangkan ide awal untuk proyek</td>
            <td>AI sebagai alat bantu</td>
            <td>Catatan singkat bagian yang dibantu AI dan revisi siswa</td>
          </tr>
          <tr>
            <td>Mengkritik kualitas jawaban dari AI</td>
            <td>AI sebagai bagian pembelajaran</td>
            <td>
              Jawaban AI yang diberi catatan, hasil pengecekan, dan versi perbaikan
            </td>
          </tr>
        </tbody>
      </table>
      <Callout type="note" title="Terbuka tentang bantuan AI">
        Bila AI diizinkan, minta siswa mengungkapkan secara singkat untuk apa AI
        digunakan, bagian mana yang mereka ubah, dan mengapa mereka menerima
        atau menolak sarannya.
      </Callout>

      <H2>
        Dilema Utama: &ldquo;Kalau AI Boleh, Apa yang Sebenarnya Kita
        Nilai?&rdquo;
      </H2>
      <p>
        Seorang siswa mengumpulkan presentasi yang sangat bagus. Ketika ditanya,
        ia mengatakan: &ldquo;Saya membuat outline dengan AI, meminta AI
        memperbaiki argumen, membuat beberapa contoh, lalu saya pilih dan edit
        hasilnya.&rdquo;
      </p>
      <p>
        Diskusikan: jika tujuan tugas adalah kemampuan membuat slide, apakah
        penggunaan AI bermasalah? Jika tujuannya kemampuan menyusun argumen,
        apakah jawabannya berubah? Haruskah siswa mengungkapkan penggunaan AI?
      </p>
      <blockquote>
        <p>
          Pertanyaan kunci: sebelum menentukan &ldquo;AI boleh atau
          tidak&rdquo;, apakah kita sudah jelas kemampuan apa yang ingin
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
        alternatif, tetapi keputusan pendidikan tetap membutuhkan pertimbangan
        manusia.
      </p>
      <p>Sebelum mengikuti output AI, tanyakan:</p>
      <ol>
        <li>Apakah data yang saya masukkan aman?</li>
        <li>Apakah saya benar-benar perlu memberikan data ini?</li>
        <li>Apakah hasil AI masuk akal dan sudah saya cek kebenarannya?</li>
        <li>
          Apakah AI membantu saya berpikir atau justru menggantikan saya
          berpikir?
        </li>
        <li>Jika hasil AI salah, siapa yang bertanggung jawab?</li>
      </ol>

      <H2>Ringkasan</H2>
      <ol>
        <li>
          <strong>Jaga Data</strong> &mdash; jangan sembarangan
          memasukkan data pribadi, data orang lain, atau dokumen internal
          sekolah.
        </li>
        <li>
          <strong>Kurangi Data Pengenal</strong> &mdash; jika identitas tidak
          dibutuhkan, hilangkan; berikan hanya data yang benar-benar diperlukan.
        </li>
        <li>
          <strong>Tentukan Peran AI</strong> &mdash; AI tidak boleh digunakan,
          AI sebagai alat bantu, atau AI sebagai bagian pembelajaran.
        </li>
        <li>
          <strong>Tentukan yang Dinilai</strong> &mdash; aturan penggunaan AI
          harus mengikuti tujuan pembelajaran dan penilaian.
        </li>
        <li>
          <strong>Cek Sebelum Percaya</strong> &mdash; AI dapat terdengar yakin
          tetapi tetap salah; cek informasi penting.
        </li>
        <li>
          <strong>Periksa Keadilan</strong> &mdash; periksa apakah jawaban AI
          membawa anggapan yang menyamaratakan atau saran yang tidak sesuai
          keadaan siswa.
        </li>
        <li>
          <strong>Manusia Tetap Memutuskan</strong> &mdash; AI sebagai asisten,
          manusia sebagai pengambil keputusan.
        </li>
      </ol>

      <H2>Mini Quiz</H2>
      <p>
        Uji pemahaman Bapak/Ibu tentang etika, privasi, dan integritas akademik
        dalam penggunaan AI.
      </p>
      <Quiz questions={sesi6Quiz} />
    </DocArticle>
  );
}
