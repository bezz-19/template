# Fix Label History Migration

## Masalah

```
Drift detected: Your database schema is not in sync with your migration history
```

Database sudah punya tabel-tabel tapi Prisma migration history kosong.

## Solusi (Tanpa Hapus Data)

### 1. Sync Schema dengan db push

```bash
npx prisma db push
```

Ini akan:
- Add table `label_history` ke database
- Add foreign keys dan indexes
- TIDAK hapus data yang sudah ada
- TIDAK create migration file

### 2. Verify Schema

```bash
npx prisma db pull
```

Cek apakah schema sudah sync.

### 3. Test Label Change

Buka kanban board dan drag contact ke label lain, lalu cek database:

```sql
SELECT * FROM label_history ORDER BY created_at DESC LIMIT 5;
```

## Alternatif (Jika Data Boleh Hilang)

Jika data di database boleh dihapus (development only):

```bash
npx prisma migrate reset
npx prisma db seed
```

Ini akan:
- Drop semua tabel
- Create migration history
- Run semua migrations
- Run seed untuk create labels

## Rekomendasi

Gunakan `npx prisma db push` karena:
- Data tidak hilang
- Lebih cepat
- Cocok untuk development
- Tidak perlu migration history untuk sekarang

Nanti saat production, baru gunakan `prisma migrate deploy`.

## Setelah db push

1. Test drag & drop di kanban board
2. Cek table label_history:
   ```sql
   SELECT 
     lh.*,
     fl.name as from_label,
     tl.name as to_label
   FROM label_history lh
   JOIN labels fl ON lh.from_label_id = fl.id
   JOIN labels tl ON lh.to_label_id = tl.id
   ORDER BY lh.created_at DESC;
   ```

3. Test API endpoint:
   ```bash
   curl http://localhost:3000/api/contacts/{contact_id}/history
   ```

## Vercel Deployment

Setelah push ke git, Vercel akan otomatis run `prisma generate` dan `prisma db push`.

Pastikan environment variables di Vercel sudah ada:
- DATABASE_URL
- DIRECT_URL
