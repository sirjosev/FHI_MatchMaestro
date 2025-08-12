# Match Maestro - User Guide

Welcome to Match Maestro! This guide will help you understand and use the various features of the application to manage and follow your sports competitions.

## Core Features
### Competition Overview
The Competition Overview screen provides a comprehensive look at all ongoing and upcoming competitions. You can see details like the competition's name, important dates (start and end), its location, and current status (e.g., upcoming, in progress, completed). This screen helps you quickly get a summary of all tournament activities.
### Team Management
The Team Management feature allows you to manage and display teams participating in a tournament. You can view team members, and staff, making it easy to keep track of all participants. This is where you'll go to add new teams or update existing team information.
### Match Schedule
The Match Schedule feature is where you can create and view the schedule for a selected competition. It offers filtering options, shows the date of play, and the competition status, ensuring you always know when and where the next match is happening. Use this to plan your attendance or follow remotely.
### Live Scoring
Live Scoring provides real-time updates during a match. You can see the current scores of the teams, individual player stats, penalties, and other related information as it happens. This feature is perfect for following along with the action live.
### Standings
The Standings section shows the real-time ranking of teams within a competition or pool. It's based on a scoring system that calculates points earned by each team, giving you a clear picture of who is leading. Check this section to see how your favorite teams are performing.
### Statistics Hub
The Statistics Hub highlights top performers across different teams and match events. It allows you to retrieve specific types of statistics, such as top scorers or most assists, helping you identify key players and trends. Dive into this section for in-depth performance analysis.
### Match Storyteller
The Match Storyteller uses a generative AI tool to write short previews and recaps for each match. This provides engaging narratives around the games, offering insights and summaries that bring the competition to life. Look here for quick updates and engaging stories about the matches.

---

# Dokumentasi Teknis Match Maestro

Dokumen ini memberikan gambaran teknis yang mendalam tentang aplikasi Match Maestro, ditujukan untuk pengembang dan kontributor.

## 1. Ringkasan Proyek

Match Maestro adalah aplikasi web komprehensif yang dirancang untuk mengelola dan mengikuti kompetisi olahraga. Aplikasi ini menyediakan serangkaian fitur lengkap bagi penyelenggara, peserta, dan penggemar untuk melacak setiap aspek turnamen, mulai dari jadwal pertandingan hingga statistik pemain secara mendalam.

Tujuan utama proyek ini adalah untuk menyediakan platform terpusat dan mudah digunakan yang menyederhanakan logistik manajemen turnamen dan meningkatkan pengalaman penonton. Salah satu fitur unggulannya adalah "Match Storyteller", sebuah agen AI yang secara otomatis menghasilkan pratinjau dan rekap pertandingan, memberikan narasi yang menarik seputar kompetisi.

## 2. Stack Teknologi

Aplikasi ini dibangun menggunakan tumpukan teknologi modern yang berfokus pada kinerja, skalabilitas, dan pengalaman pengembang.

- **Framework Utama**: [Next.js](https://nextjs.org/) (v15) - Framework React untuk aplikasi web sisi server (SSR) dan statis (SSG).
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/) - Menambahkan tipe statis ke JavaScript untuk meningkatkan kualitas kode dan mengurangi bug.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first untuk desain antarmuka yang cepat dan kustom.
- **Komponen UI**: [Shadcn/UI](https://ui.shadcn.com/) - Kumpulan komponen UI yang dapat digunakan kembali, dibangun di atas Radix UI dan Tailwind CSS.
- **Manajemen State Server**: [TanStack Query](https://tanstack.com/query/latest) (sebelumnya React Query) - Untuk mengambil, menyimpan di cache, dan menyinkronkan data dari server.
- **Backend & Database**: [Firebase](https://firebase.google.com/) - Digunakan untuk hosting dan kemungkinan layanan backend lainnya.
- **Fitur AI**: [Google AI - Genkit](https://firebase.google.com/docs/genkit) - Toolkit untuk membangun alur kerja AI yang terintegrasi dengan model Gemini (`gemini-2.0-flash`).
- **Validasi Skema**: [Zod](https://zod.dev/) - Validator skema TypeScript-first untuk validasi input dan data.
- **Manajemen Form**: [React Hook Form](https://react-hook-form.com/) - Pustaka untuk mengelola state form dengan efisien.

## 3. Arsitektur & Struktur Proyek

Proyek ini mengikuti struktur standar aplikasi Next.js dengan App Router, dengan beberapa direktori tambahan untuk kebutuhan spesifik aplikasi.

- **`src/app/`**: Direktori inti dari Next.js App Router. Setiap folder di sini mewakili sebuah rute dalam aplikasi.
  - **`layout.tsx`**: Layout utama aplikasi.
  - **`page.tsx`**: Halaman utama (homepage).
  - **`admin/`**, **`competitions/`**, etc.: Direktori rute untuk berbagai fitur aplikasi.

- **`src/components/`**: Berisi semua komponen React yang dapat digunakan kembali.
  - **`ui/`**: Komponen UI dasar dari Shadcn/UI (Button, Card, Input, dll.).
  - **`layout/`**: Komponen yang terkait dengan tata letak halaman (misalnya, MainLayout).
  - **`ai/`**, **`competitions/`**, etc.: Komponen spesifik fitur.

- **`src/ai/`**: Direktori khusus untuk semua logika terkait Genkit AI.
  - **`genkit.ts`**: Konfigurasi dan inisialisasi plugin Genkit.
  - **`flows/`**: Berisi semua alur kerja (flows) Genkit, seperti `match-storyteller.ts`.

- **`src/lib/`**: Berisi fungsi utilitas dan pustaka pembantu.
  - **`utils.ts`**: Fungsi utilitas umum yang digunakan di seluruh aplikasi.

- **`src/data/`**: Berisi data mock atau statis yang digunakan untuk pengembangan dan pengujian.

- **`src/hooks/`**: Berisi custom React hooks yang digunakan dalam aplikasi.

- **`public/`**: Aset statis yang akan disajikan secara publik (misalnya, gambar, ikon).

- **`docs/`**: Berisi file dokumentasi tambahan seperti `blueprint.md`.

## 4. Petunjuk Penggunaan & Instalasi

Bagian ini menjelaskan cara menginstal, mengkonfigurasi, dan menjalankan proyek Match Maestro di lingkungan pengembangan lokal.

### Prasyarat

- [Node.js](https://nodejs.org/) (versi 20 atau lebih tinggi)
- [npm](https://www.npmjs.com/) (biasanya terinstal bersama Node.js)
- Akses ke layanan Google AI untuk fitur Genkit.

### Instalasi

1.  **Kloning Repositori:**
    ```bash
    git clone <URL_REPOSITORI>
    cd <NAMA_DIREKTORI_PROYEK>
    ```

2.  **Instal Dependensi:**
    Gunakan npm untuk menginstal semua paket yang diperlukan dari `package.json`.
    ```bash
    npm install
    ```

### Menjalankan Aplikasi

Aplikasi ini terdiri dari dua bagian yang perlu dijalankan secara bersamaan: server web Next.js dan server Genkit untuk alur kerja AI.

1.  **Jalankan Server Web (Next.js):**
    Buka terminal pertama dan jalankan perintah berikut untuk memulai server pengembangan Next.js.
    ```bash
    npm run dev
    ```
    Aplikasi akan tersedia di `http://localhost:9002`.

2.  **Jalankan Server AI (Genkit):**
    Buka terminal kedua dan jalankan perintah berikut untuk memulai server Genkit.
    ```bash
    npm run genkit:dev
    ```
    Ini akan memulai UI Genkit di `http://localhost:4000` di mana Anda dapat memantau dan menguji alur kerja AI.

## 5. Alur Kerja AI (Match Storyteller)

Fitur "Match Storyteller" menggunakan Google Genkit untuk menghasilkan narasi olahraga secara dinamis.

### Gambaran Umum

Alur kerja ini menerima detail pertandingan sebagai input dan menghasilkan pratinjau (untuk pertandingan yang akan datang) atau ringkasan (untuk pertandingan yang telah selesai). Proses ini dienkapsulasi dalam sebuah Genkit Flow yang dipanggil oleh server Next.js.

### Detail Implementasi

- **Lokasi Kode**: `src/ai/flows/match-storyteller.ts`
- **Konfigurasi Model**: Menggunakan model `gemini-2.0-flash` dari Google AI, yang dikonfigurasi di `src/ai/genkit.ts`.
- **Alur Kerja**: `matchStorytellerFlow` adalah alur kerja utama yang didefinisikan dengan `ai.defineFlow`.
- **Skema Input & Output**:
  - **Input**: `MatchSummaryInputSchema` (didefinisikan dengan Zod) mengharuskan adanya `matchDetails` dan `matchStatus`. `score` dan `keyEvents` bersifat opsional.
  - **Output**: `MatchSummaryOutputSchema` (didefinisikan dengan Zod) menjamin bahwa output dari AI akan berisi `preview` dan `summary`.
- **Prompt**:
  - Prompt yang didefinisikan dengan `ai.definePrompt` menginstruksikan AI untuk bertindak sebagai "jurnalis olahraga ahli yang berspesialisasi dalam hoki".
  - Prompt ini menggunakan template kondisional untuk menghasilkan pratinjau jika `matchStatus` adalah 'Scheduled' dan ringkasan jika 'Completed'.
- **Eksekusi**: Fungsi `generateMatchSummary` diekspor sebagai Server Action untuk dipanggil dari komponen frontend.

## 6. Deployment

Proyek ini dikonfigurasi untuk deployment ke [Firebase App Hosting](https://firebase.google.com/docs/app-hosting).

Konfigurasi deployment didefinisikan dalam file `apphosting.yaml`.
```yaml
# Settings to manage and configure a Firebase App Hosting backend.
# https://firebase.google.com/docs/app-hosting/configure

runConfig:
  # Increase this value if you'd like to automatically spin up
  # more instances in response to increased traffic.
  maxInstances: 1
```
Saat ini, konfigurasi diatur untuk menjalankan maksimal satu instance server. Untuk melakukan deployment, ikuti petunjuk resmi dari Firebase untuk menghubungkan repositori GitHub dan men-deploy aplikasi.

## 7. Skrip yang Tersedia

Proyek ini dilengkapi dengan beberapa skrip npm yang didefinisikan dalam `package.json` untuk membantu proses pengembangan.

- **`npm run dev`**
  Menjalankan server pengembangan Next.js dengan Turbopack di `http://localhost:9002`.

- **`npm run genkit:dev`**
  Memulai UI pengembangan Genkit di `http://localhost:4000` untuk memantau dan menguji alur kerja AI.

- **`npm run genkit:watch`**
  Sama seperti `genkit:dev`, tetapi juga memantau perubahan file pada alur kerja AI dan me-restart server secara otomatis.

- **`npm run build`**
  Membuat build produksi dari aplikasi Next.js, siap untuk deployment.

- **`npm run start`**
  Menjalankan server produksi dari build yang telah dibuat.

- **`npm run lint`**
  Menjalankan linter (ESLint) untuk memeriksa masalah gaya dan kualitas kode.

- **`npm run typecheck`**
  Menjalankan pemeriksa tipe TypeScript (`tsc`) untuk memverifikasi tipe di seluruh proyek tanpa menghasilkan file JavaScript.
