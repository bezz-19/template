# Update Labels - Panduan Lengkap

## Labels yang Akan Dibuat

1. **qualified lead** - Biru (#3B82F6)
2. **deal making** - Ungu (#8B5CF6)
3. **offering letter** - Orange (#F59E0B)
4. **field survey** - Hijau (#10B981)
5. **deal** - Hijau Terang (#22C55E)
6. **tidak berkualitas** - Merah (#EF4444)

## Cara Update

### 1. Jalankan Seed

```bash
npx prisma db seed
```

Ini akan create/update semua labels di database.

### 2. Verify di Prisma Studio

```bash
npx prisma studio
```

Buka table `Label` dan pastikan ada 6 labels dengan order 1-6.

### 3. Deploy ke Vercel

```bash
git add .
git commit -m "feat: complete labels for kanban board"
git push
```

## Fitur Kanban Board

### Sync 2 Arah

1. **Pindah di Kanban → Label Update**
   - Drag & drop contact di kanban board
   - Label contact otomatis update
   - Perubahan tersimpan di database

2. **Update Label → Kanban Update**
   - Update label contact di messages page
   - Kanban board otomatis refresh
   - Contact pindah ke column yang sesuai

### Cara Kerja

1. **Drag Contact**:
   - Klik dan hold contact card
   - Drag ke column label lain
   - Drop untuk update

2. **Auto Sync**:
   - API call ke `/api/contacts/:id/label`
   - Database update `labelId`
   - UI update real-time

## Testing

### Test Kanban Board

1. Buka: https://crm-wa.vercel.app/dashboard/board
2. Lihat contacts di berbagai columns
3. Drag contact dari "qualified lead" ke "deal making"
4. Contact harus pindah column
5. Refresh page, contact tetap di column baru

### Test Messages Page

1. Buka: https://crm-wa.vercel.app/dashboard/messages
2. Klik contact
3. Update label via dropdown (jika ada)
4. Buka board page
5. Contact harus ada di column label baru

## Struktur Database

```prisma
model Label {
  id       String    @id @default(cuid())
  name     String    @unique
  color    String
  order    Int
  contacts Contact[]
}

model Contact {
  id          String    @id @default(cuid())
  waId        String    @unique
  name        String?
  phoneNumber String
  profilePic  String?
  labelId     String
  label       Label     @relation(fields: [labelId], references: [id])
  messages    Message[]
}
```

## API Endpoints

### GET /api/labels

Get all labels sorted by order.

**Response**:
```json
[
  {
    "id": "label_id",
    "name": "qualified lead",
    "color": "#3B82F6",
    "order": 1
  },
  ...
]
```

### PATCH /api/contacts/:id/label

Update contact label.

**Request**:
```json
{
  "labelId": "new_label_id"
}
```

**Response**:
```json
{
  "id": "contact_id",
  "labelId": "new_label_id"
}
```

## Troubleshooting

### Labels Tidak Muncul

**Penyebab**: Seed belum dijalankan

**Solusi**:
```bash
npx prisma db seed
```

### Contact Tidak Pindah di Kanban

**Penyebab**: API error atau network issue

**Solusi**:
1. Cek browser console untuk error
2. Cek Vercel logs
3. Pastikan API endpoint `/api/contacts/:id/label` berfungsi

### Kanban Tidak Sync dengan Messages

**Penyebab**: Cache atau state management issue

**Solusi**:
1. Refresh page
2. Clear browser cache
3. Cek apakah `labelId` di database sudah update

## Customization

### Ubah Warna Label

Edit `prisma/seed.ts`:

```typescript
const labels = [
  { name: 'qualified lead', order: 1, color: '#YOUR_COLOR' },
  ...
]
```

Lalu jalankan:
```bash
npx prisma db seed
```

### Tambah Label Baru

1. Edit `prisma/seed.ts`
2. Tambah label baru dengan order yang sesuai
3. Jalankan seed
4. Label otomatis muncul di kanban board

### Ubah Order Label

Edit order di seed file, lalu jalankan seed. Kanban columns akan otomatis re-order.

## Next Steps

Setelah labels lengkap:

1. Test drag & drop di kanban board
2. Verify sync dengan messages page
3. Monitor API calls di Vercel logs
4. Setup notification untuk label changes (optional)

## Notes

- Kanban board menggunakan `@dnd-kit/core` untuk drag & drop
- Sync real-time tanpa perlu refresh
- Labels sorted by `order` field
- Contact hanya bisa punya 1 label
- Label "tidak berkualitas" untuk filter out unqualified leads
