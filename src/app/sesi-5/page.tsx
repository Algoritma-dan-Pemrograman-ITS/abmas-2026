import type { Metadata } from "next";
import { DocArticle } from "@/components/doc-article";
import { H2, H3 } from "@/components/content";
import { Callout } from "@/components/callout";
import { CodeBlock } from "@/components/code-block";
import { MistakeReveal } from "@/components/mistake-reveal";

export const metadata: Metadata = {
  title: "Sesi 5: Critical Thinking & Fact Checking",
};

export default function Sesi5Page() {
  return (
    <DocArticle
      href="/sesi-5"
      eyebrow="Sesi 5"
      title="Critical Thinking & Fact Checking"
      lead="AI bisa menjawab dengan sangat percaya diri, bahkan ketika jawabannya salah total. Sesi ini membahas kenapa itu bisa terjadi, dan cara memverifikasinya."
    >
      <H2>Apakah AI Selalu Benar?</H2>
      <p>Perhatikan contoh percakapan berikut:</p>
      <blockquote>
        <p>
          <strong>Pertanyaan:</strong> &ldquo;Siapa penemu pensil dan kapan
          pensil pertama kali dibuat?&rdquo;
        </p>
        <p>
          <strong>Jawaban AI:</strong> &ldquo;Pensil pertama kali ditemukan
          oleh Conrad Gessner pada tahun 1560 di Nuremberg, Jerman,
          menggunakan campuran grafit dan tanah liat dengan rasio 3:1 yang ia
          dokumentasikan dalam catatan pribadinya. Metode ini kemudian
          disempurnakan oleh Nicolas-Jacques Cont&eacute; pada 1795 dengan
          menambahkan proses pembakaran pada suhu 1000&deg;C.&rdquo;
        </p>
      </blockquote>
      <p>
        Kedengarannya sangat meyakinkan dengan detail spesifik (nama, tahun,
        rasio, suhu) &mdash; padahal beberapa detail di sini (rasio campuran,
        suhu pembakaran, &ldquo;dokumentasi pribadi&rdquo;) adalah karangan
        yang tidak bisa diverifikasi ke sumber mana pun. Ini pola khas{" "}
        <strong>hallucination</strong>: detail super spesifik yang terdengar
        seperti fakta, tapi sebenarnya dikarang agar jawaban terdengar
        lengkap.
      </p>
      <p>
        Kalau ini dijawab murid di kelas, apakah Bapak/Ibu akan langsung
        percaya?
      </p>

      <H2>Hallucination: Ketika AI &ldquo;Mengarang&rdquo; dengan Yakin</H2>
      <p>
        AI (LLM) bekerja dengan memprediksi kata yang paling mungkin muncul
        berikutnya &mdash; bukan dengan mencari fakta di database seperti
        mesin pencari. Karena itu, AI bisa menghasilkan jawaban yang{" "}
        <strong>terdengar lancar dan meyakinkan, padahal isinya salah atau
        dikarang</strong>. Fenomena ini disebut <strong>hallucination</strong>.
      </p>
      <ul>
        <li>AI dapat memberikan informasi yang salah.</li>
        <li>
          AI bisa membuat referensi yang <strong>terlihat nyata</strong> (nama
          penulis, judul jurnal, tahun) padahal tidak ada.
        </li>
        <li>
          AI bisa memberikan jawaban dengan{" "}
          <strong>tingkat kepercayaan tinggi meskipun salah</strong> &mdash;
          nada percaya diri AI tidak berkorelasi dengan kebenaran jawabannya.
        </li>
      </ul>
      <Callout type="warning">
        AI tidak pernah bilang &ldquo;saya tidak yakin&rdquo; secara default
        &mdash; kecuali diminta secara eksplisit.
      </Callout>

      <H2>Sebelum Dipakai, Cek Dulu 8 Hal Ini</H2>
      <ol>
        <li>Fakta</li>
        <li>Angka</li>
        <li>Tanggal</li>
        <li>Nama</li>
        <li>Rumus</li>
        <li>Referensi</li>
        <li>Kutipan</li>
        <li>Informasi ilmiah</li>
      </ol>

      <H2>Ubah Kebiasaan: Bukan Copy-Paste</H2>
      <p>
        <strong>Alur yang salah (harus dihindari):</strong>
      </p>
      <CodeBlock code={`GENERATE → COPY → USE`} lang="text" />
      <p>
        <strong>Alur yang benar:</strong>
      </p>
      <CodeBlock code={`GENERATE → VERIFY → EDIT → USE`} lang="text" />
      <p>
        Jangan langsung pakai jawaban AI mentah-mentah. Selalu ada jeda untuk{" "}
        <strong>verifikasi</strong> (cek fakta pakai sumber lain) dan{" "}
        <strong>edit</strong> (sesuaikan, perbaiki) sebelum benar-benar dipakai
        di kelas atau dibagikan ke murid.
      </p>

      <H3>Trik Tambahan: Atur AI-nya Sebelum Dipakai</H3>
      <p>
        Selain verifikasi manual, kita bisa <strong>mengatur watak AI-nya
        dari awal</strong>, supaya ia tidak asal mengiyakan. Banyak AI
        (termasuk Claude) punya kolom &ldquo;instruksi khusus&rdquo; di
        pengaturan &mdash; sekali diisi, berlaku untuk semua percakapan
        berikutnya.
      </p>
      <p>
        <strong>Sebelum</strong> (tanpa instruksi khusus): guru bertanya
        &ldquo;Menurutku metode belajar sambil main game itu paling efektif
        buat semua mata pelajaran, gimana pendapatmu?&rdquo; &mdash; AI
        default cenderung menjawab &ldquo;Ide bagus banget! Gamifikasi memang
        terbukti sangat efektif&hellip;&rdquo;, validasi berlebihan tanpa
        nuansa.
      </p>
      <p>Instruksi berikut bisa ditempel ke kolom custom instructions / preferensi:</p>
      <CodeBlock
        code={`Untuk tugas analitis, strategis, faktual, atau pengambilan keputusan,
mode defaultmu adalah kritis, presisi, dan berbasis bukti.

Sebelum setuju dengan sebuah ide, cek dulu secara diam-diam:
apa yang mungkin salah, kurang lengkap, berasumsi lemah, atau kurang
masuk akal? Sampaikan kelemahan paling penting terlebih dahulu jika
itu relevan.

Hindari kalimat basa-basi validasi kosong seperti: "Kamu benar sekali",
"Pertanyaan bagus", "Ide brilian", "Aku suka ini", "Tepat sekali", atau
"Masuk akal banget". Kalau idenya lemah, katakan dengan jelas dan
jelaskan alasannya. Kalau idenya kuat, jelaskan kenapa itu bekerja,
tapi tetap sebutkan risiko atau trade-off yang mungkin terlewat.

Jujur soal tingkat keyakinan. Untuk klaim faktual yang penting atau
tidak pasti, beri label: [Keyakinan Tinggi], [Keyakinan Sedang], atau
[Keyakinan Rendah], dan jelaskan singkat dasar keyakinan itu.

Jangan mengarang sumber. Jangan membuat-buat judul paper, URL, buku,
statistik, fakta perusahaan, atau kutipan dari orang nyata. Jangan
pernah mengutip sumber kecuali benar-benar pernah dilihat atau bisa
diverifikasi. Jika sebuah klaim perlu diverifikasi, katakan: "Ini
perlu diverifikasi." Untuk topik terkini, harga, hukum, produk, atau
software update, katakan dengan jelas kalau perlu verifikasi langsung.`}
        lang="text"
      />
      <p>
        <strong>Sesudah</strong> (dengan instruksi kritis aktif): &ldquo;Gamifikasi
        memang bisa meningkatkan motivasi jangka pendek [Keyakinan Sedang]
        &mdash; tapi klaim &lsquo;paling efektif untuk semua mata
        pelajaran&rsquo; terlalu general. Untuk pelajaran yang butuh
        pemahaman konsep mendalam, hasilnya campur, tergantung desain
        game-nya.&rdquo;
      </p>
      <Callout type="tip">
        Trik ini tidak menggantikan verifikasi manual &mdash; tapi mengurangi
        risiko AI &ldquo;asal setuju&rdquo; sejak awal percakapan.
      </Callout>

      <H2>Aktivitas: Temukan Kesalahannya!</H2>
      <p>
        Di bawah ini adalah jawaban AI tentang materi Ekosistem (IPA kelas 7).
        Di dalamnya ada <strong>3 kesalahan tersembunyi</strong>: 1 fakta yang
        salah, 1 referensi yang tidak valid, dan 1 kesalahan logika. Coba
        temukan sebelum mengklik reveal.
      </p>
      <MistakeReveal
        text="Ekosistem adalah interaksi antara makhluk hidup dengan lingkungannya. Dalam rantai makanan, energi mengalir dari konsumen ke produsen, karena konsumen membutuhkan energi lebih banyak untuk bergerak dan mencari makan. Menurut penelitian Dr. Ahmad Wijaya (2021) dalam Journal of Ecosystem Science, rata-rata ekosistem hutan tropis memiliki tepat 4,7 tingkat trofik. Selain itu, karena rusa memakan rumput sebagai sumber makanan utamanya, menghilangkan predator seperti singa dari ekosistem tidak akan berpengaruh signifikan terhadap populasi rusa, sebab rusa tetap punya cukup sumber makanan untuk bertahan hidup."
        mistakes={[
          {
            label: "1. Fakta salah",
            explanation:
              '"Energi mengalir dari konsumen ke produsen" terbalik. Energi mengalir dari produsen ke konsumen (produsen menghasilkan energi lewat fotosintesis, konsumen mendapat energi dengan memakan produsen/konsumen lain).',
          },
          {
            label: "2. Referensi tidak valid",
            explanation:
              '"Dr. Ahmad Wijaya (2021), Journal of Ecosystem Science, 4,7 tingkat trofik" — nama peneliti, jurnal, dan angka spesifik ini dikarang. Ini contoh klasik hallucination: detail sangat spesifik yang tidak bisa ditemukan sumbernya di mana pun.',
          },
          {
            label: "3. Kesalahan logika",
            explanation:
              'Klaim bahwa menghilangkan singa "tidak akan berpengaruh" pada populasi rusa itu salah nalar — ini mengabaikan trophic cascade (efek berantai dalam rantai makanan). Tanpa predator, populasi rusa justru bisa meledak tak terkendali, lalu merusak ekosistem lewat overgrazing.',
          },
        ]}
      />

      <H2>Yang Perlu Diingat</H2>
      <ul>
        <li>AI adalah asisten, bukan sumber kebenaran final.</li>
        <li>Percaya diri jawaban AI &ne; jawaban itu benar.</li>
        <li>Generate &rarr; Verify &rarr; Edit &rarr; Use, bukan Generate &rarr; Copy &rarr; Use.</li>
      </ul>
      <p>Selanjutnya: bagaimana menjaga privasi data siswa saat menggunakan AI.</p>
    </DocArticle>
  );
}
