# WhatsApp CRM - Architecture Overview

## Fitur Utama

### 1. Authentication
- Login & Register untuk Admin dan CS
- Role-based access control (ADMIN | CS)
- Session management dengan NextAuth

### 2. Halaman Messages
- Tampilan chat mirip WhatsApp
- List semua contact dengan preview pesan terakhir
- Buka detail chat per contact
- Balas pesan (text, gambar, video)
- Assign label ke contact
- Real-time message updates

### 3. Halaman Board (Kanban)
- Board dengan kolom sesuai label
- Drag & drop contact antar kolom
- Sinkronisasi otomatis dengan halaman Messages
- Filter dan search contact

## Database Schema

### User
- Authentication dan role management
- Tracking siapa yang mengirim pesan

### Label
- 6 default labels dengan warna
- Bisa diatur oleh Admin/CS
- Urutan untuk Kanban board

### Contact
- Representasi customer dari WhatsApp
- Linked ke Label (default: qualified lead)
- Menyimpan info WA ID, nama, nomor, foto profil

### Message
- Semua pesan masuk/keluar
- Support text, image, video, document, audio
- Status tracking (sent, delivered, read, failed)
- Linked ke Contact dan User (pengirim)

## Flow Data

### Message → Board
1. Contact menerima label
2. Label menentukan posisi di Kanban board
3. Perubahan label di Messages → otomatis update Board

### Board → Message
1. Drag contact ke kolom lain di Board
2. Update labelId di Contact
3. Otomatis terlihat di halaman Messages

## Tech Stack

- **Next.js 16**: App Router, Server Actions
- **Prisma**: ORM untuk database operations
- **Supabase**: PostgreSQL database
- **Zod**: Schema validation
- **shadcn/ui**: UI components
- **Tailwind CSS**: Styling
- **WABA**: WhatsApp Business API integration

## Next Steps

1. Setup authentication (NextAuth)
2. Create API routes untuk WABA webhook
3. Build Messages UI
4. Build Kanban Board UI
5. Implement drag & drop
6. Add real-time updates (optional: Supabase Realtime)
