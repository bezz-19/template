# Frequently Asked Questions (FAQ)

## Umum

### Q: Apakah WhatsApp Business API gratis?
**A:** Ya, untuk conversation-based pricing. Meta memberikan 1000 conversation gratis per bulan. Setelah itu, dikenakan biaya per conversation (berbeda per negara).

### Q: Apa bedanya WhatsApp Business App vs WhatsApp Business API?
**A:** 
- **WhatsApp Business App**: Gratis, untuk usaha kecil, manual, 1 device
- **WhatsApp Business API**: Untuk enterprise, automation, multi-agent, webhook

### Q: Apakah bisa pakai nomor WhatsApp pribadi?
**A:** Tidak. Anda perlu nomor baru atau nomor yang belum terdaftar di WhatsApp.

---

## Setup & Configuration

### Q: Kenapa webhook tidak verified?
**A:** Cek:
1. Next.js dev server running
2. ngrok running
3. URL ngrok benar (copy paste dengan benar)
4. Verify token di .env sama dengan yang di Meta
5. Tidak ada typo di URL

### Q: Kenapa access token expired terus?
**A:** Temporary access token expired dalam 24 jam. Buat System User Token untuk token yang tidak expired.

### Q: Bagaimana cara dapat nomor WhatsApp Business?
**A:** 
1. **Untuk testing**: Meta menyediakan test number gratis
2. **Untuk production**: Daftar nomor sendiri via Meta Business Manager

### Q: Apakah harus verify business?
**A:** 
- **Tidak wajib** untuk testing (limit 50 unique users)
- **Wajib** untuk production unlimited messaging

---

## Development

### Q: Kenapa pesan tidak masuk ke database?
**A:** Cek:
1. Webhook fields sudah di-subscribe (messages, message_status)
2. Terminal Next.js untuk error logs
3. Database connection di .env benar
4. Prisma schema sudah di-push

### Q: Kenapa tidak bisa kirim pesan?
**A:** Cek:
1. Access token valid
2. Phone Number ID benar
3. Nomor penerima sudah di-add sebagai test number (untuk testing)
4. .env sudah di-load (restart Next.js)

### Q: Bagaimana cara test tanpa HP?
**A:** Gunakan WhatsApp Web atau WhatsApp Desktop untuk testing.

### Q: Apakah bisa kirim broadcast?
**A:** Ya, tapi perlu:
1. Message template approved oleh Meta
2. User opt-in (consent)
3. Business verification

---

## Production

### Q: Bagaimana cara deploy ke production?
**A:** 
1. Deploy Next.js ke Vercel/Railway/VPS
2. Update webhook URL di Meta
3. Ganti temporary token dengan System User Token
4. Setup proper monitoring & logging

### Q: Apakah ngrok bisa untuk production?
**A:** Tidak disarankan. Gunakan:
- Vercel (recommended untuk Next.js)
- Railway
- AWS/GCP/Azure
- VPS dengan domain sendiri

### Q: Bagaimana cara handle rate limiting?
**A:** 
1. Meta limit: 80 messages/second, 1000 messages/day (unverified)
2. Implement queue system (Bull, BullMQ)
3. Add retry logic
4. Monitor rate limit headers

### Q: Apakah perlu database backup?
**A:** Ya! Setup:
1. Supabase automatic backup (sudah included)
2. Manual backup via `pg_dump`
3. Point-in-time recovery

---

## Features

### Q: Apakah bisa kirim gambar/video?
**A:** Ya, sudah support di `lib/whatsapp.ts`. Upload media ke Meta dulu, dapat media ID, lalu kirim.

### Q: Apakah bisa kirim template message?
**A:** Ya, tapi perlu:
1. Buat template di Meta Business Manager
2. Submit untuk approval
3. Gunakan template API

### Q: Apakah bisa group chat?
**A:** Tidak. WhatsApp Business API hanya support 1-on-1 conversation.

### Q: Apakah bisa voice call?
**A:** Tidak. WhatsApp Business API tidak support voice/video call.

### Q: Apakah bisa kirim location?
**A:** Ya, gunakan location message type di API.

---

## Troubleshooting

### Q: Error "Invalid phone number"
**A:** 
1. Format: +[country_code][number] (contoh: +6281234567890)
2. Tidak ada spasi, dash, atau karakter lain
3. Nomor sudah terdaftar di WhatsApp

### Q: Error "Message failed to send"
**A:** Cek:
1. Access token valid
2. Nomor penerima valid
3. Rate limit tidak exceeded
4. Message format benar

### Q: Webhook menerima duplicate messages
**A:** 
1. Implement idempotency check (cek `waMessageId` di database)
2. Sudah di-handle di `app/api/webhook/whatsapp/route.ts`

### Q: Database connection timeout
**A:** 
1. Gunakan connection pooling (sudah setup di DATABASE_URL)
2. Gunakan DIRECT_URL untuk migrations
3. Check Supabase connection limits

---

## Billing & Pricing

### Q: Berapa biaya WhatsApp Business API?
**A:** 
- **Free tier**: 1000 conversations/month
- **Paid**: Varies by country (Indonesia: ~$0.05-0.10 per conversation)
- **Conversation**: 24-hour window

### Q: Apa itu conversation-based pricing?
**A:** 
- User-initiated: User kirim pesan pertama (lebih murah)
- Business-initiated: Business kirim pesan pertama (lebih mahal)
- 24-hour window: Unlimited messages dalam 24 jam = 1 conversation

### Q: Bagaimana cara monitor usage?
**A:** 
1. Meta Business Manager → WhatsApp → Insights
2. Lihat conversation count
3. Setup billing alerts

---

## Security

### Q: Apakah aman menyimpan access token di .env?
**A:** 
- **Development**: OK
- **Production**: Gunakan environment variables di hosting platform
- **Never commit** .env ke git

### Q: Apakah perlu verify webhook signature?
**A:** 
- **Development**: Optional
- **Production**: Highly recommended
- Implement di webhook route

### Q: Bagaimana cara protect API routes?
**A:** 
1. NextAuth middleware (sudah setup)
2. Rate limiting
3. CORS configuration
4. Input validation (Zod)

---

## Support

### Q: Dimana bisa dapat help?
**A:** 
1. [Meta Developer Docs](https://developers.facebook.com/docs/whatsapp)
2. [Meta Developer Community](https://developers.facebook.com/community/)
3. [Stack Overflow](https://stackoverflow.com/questions/tagged/whatsapp-business-api)
4. Project documentation di folder `docs/`

### Q: Bagaimana cara report bug di Meta?
**A:** 
1. Meta for Developers → Support → Report a Bug
2. Sertakan: App ID, error message, timestamp, request/response

---

Masih ada pertanyaan? Buka issue di repository atau hubungi support.
