# Sistem Informasi Pesantren

Platform digital untuk mengelola data santri, ustadz, dan kegiatan Pondok Pesantren Al-Hikmah.

## Fitur Utama

### 1. Manajemen Pengguna
- **Admin**: Mengelola seluruh sistem
- **Ustadz**: Mengelola santri dan monitoring hafalan
- **Santri**: Akses profil dan progress hafalan

### 2. Profil Lengkap
- Data pribadi (nama, tempat/tanggal lahir, alamat)
- Foto profil
- Data wali santri (khusus santri)
- Informasi kamar dan asrama
- Bidang keahlian (khusus ustadz)

### 3. Monitoring Hafalan
- Tracking progress hafalan Al-Quran
- Setoran harian
- Muroja'ah
- Catatan dari ustadz

### 4. AI Assistant
- Tanya jawab seputar pesantren
- Bantuan pembelajaran agama Islam
- Motivasi dan bimbingan
- Tersedia 24/7 via floating chat

## Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Storage**: Supabase Storage
- **AI**: Groq (Llama 3.1)
- **Auth**: JWT dengan cookies

## Setup

### Prerequisites
- Node.js 18+
- PostgreSQL database (Supabase)
- Groq API key

### Installation

1. Clone repository
```bash
git clone https://github.com/bezz-19/template.git
cd template
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp .env.example .env
```

Edit `.env` dan isi:
- `DATABASE_URL`: Connection string PostgreSQL
- `DIRECT_URL`: Direct connection untuk migrations
- `NEXT_PUBLIC_SUPABASE_URL`: URL project Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Anon key dari Supabase
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key dari Supabase
- `SESSION_SECRET`: Random string untuk JWT
- `REGISTRATION_TOKEN`: Token untuk registrasi
- `GROQ_API_KEY`: API key dari Groq

4. Push database schema
```bash
npm run db:push
```

5. Generate Prisma Client
```bash
npm run db:generate
```

6. Run development server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## Struktur Database

### User
- id, email, password, role (ADMIN/USTADZ/SANTRI)

### Profile
- Data pribadi lengkap
- Foto profil
- Data wali (santri)
- Kamar & asrama (santri)
- Bidang keahlian (ustadz)

### HafalanProgress
- Tracking hafalan per santri
- Juz, halaman, surah, ayat
- Status (SETORAN/MUROJA'AH/LULUS)
- Catatan dari ustadz

## Deployment

### Vercel
1. Push ke GitHub
2. Import project di Vercel
3. Set environment variables
4. Deploy

### Environment Variables untuk Production
Pastikan semua variable di `.env` sudah diset di Vercel dashboard.

## Kontribusi

Project ini dibuat untuk keperluan pembelajaran. Silakan fork dan modifikasi sesuai kebutuhan.

## License

MIT License

## Contact

Untuk pertanyaan atau saran, silakan buat issue di GitHub repository.
