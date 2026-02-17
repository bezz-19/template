# WhatsApp Business API Setup Guide

## 1. Daftar Meta for Developers

1. Buka [Meta for Developers](https://developers.facebook.com/)
2. Login dengan akun Facebook Anda
3. Klik "My Apps" → "Create App"
4. Pilih "Business" sebagai app type
5. Isi informasi app (nama, email, dll)

## 2. Setup WhatsApp Product

1. Di dashboard app, klik "Add Product"
2. Pilih "WhatsApp" → klik "Set Up"
3. Pilih atau buat Business Portfolio
4. Pilih atau buat WhatsApp Business Account

## 3. Dapatkan Credentials

### Phone Number ID
1. Buka "WhatsApp" → "API Setup"
2. Copy "Phone number ID" (contoh: `123456789012345`)

### Access Token
1. Di halaman yang sama, ada "Temporary access token"
2. Copy token tersebut (untuk testing)
3. **PENTING**: Untuk production, buat System User Token:
   - Buka "Business Settings" → "System Users"
   - Create System User
   - Generate Token dengan permissions: `whatsapp_business_messaging`, `whatsapp_business_management`

### Webhook Verify Token
1. Buat string random sendiri (contoh: `my_secret_verify_token_12345`)
2. Simpan untuk digunakan di webhook setup

## 4. Update .env

```env
WABA_PHONE_NUMBER_ID="123456789012345"
WABA_ACCESS_TOKEN="EAAxxxxxxxxxxxxx"
WABA_WEBHOOK_VERIFY_TOKEN="my_secret_verify_token_12345"
```

## 5. Setup Webhook (Setelah Deploy)

### Local Development (Gunakan ngrok)

1. Install ngrok: https://ngrok.com/download
2. Jalankan Next.js dev server:
   ```bash
   npm run dev
   ```
3. Di terminal lain, jalankan ngrok:
   ```bash
   ngrok http 3000
   ```
4. Copy URL ngrok (contoh: `https://abc123.ngrok.io`)

### Configure Webhook di Meta

1. Buka "WhatsApp" → "Configuration"
2. Klik "Edit" di Webhook section
3. Isi:
   - **Callback URL**: `https://abc123.ngrok.io/api/webhook/whatsapp` (atau domain production Anda)
   - **Verify Token**: `my_secret_verify_token_12345` (sama dengan di .env)
4. Klik "Verify and Save"
5. Subscribe ke webhook fields:
   - ✅ messages
   - ✅ message_status

## 6. Test Webhook

1. Kirim pesan WhatsApp ke nomor bisnis Anda
2. Cek console/logs untuk melihat webhook payload
3. Pesan seharusnya muncul di database dan UI

## 7. Add Test Number (Development)

Untuk testing, tambahkan nomor WhatsApp Anda:

1. Buka "WhatsApp" → "API Setup"
2. Scroll ke "To"
3. Klik "Add phone number"
4. Masukkan nomor WhatsApp Anda
5. Verifikasi dengan kode OTP

Sekarang Anda bisa kirim/terima pesan dari nomor tersebut.

## 8. Production Checklist

Sebelum production:

- [ ] Ganti Temporary Token dengan System User Token
- [ ] Verify Business (untuk unlimited messaging)
- [ ] Setup proper webhook URL (bukan ngrok)
- [ ] Enable webhook signature verification
- [ ] Setup rate limiting
- [ ] Monitor webhook logs

## Troubleshooting

### Webhook tidak menerima pesan
- Cek apakah webhook URL accessible dari internet
- Cek verify token sudah benar
- Cek webhook fields sudah di-subscribe
- Cek logs di Meta for Developers → Webhooks

### Tidak bisa kirim pesan
- Cek access token masih valid
- Cek phone number ID benar
- Cek nomor penerima sudah di-add (untuk testing)
- Cek rate limits

### Error 403 Forbidden
- Access token expired atau invalid
- Permissions tidak cukup
- Business verification required

## Resources

- [WhatsApp Business API Docs](https://developers.facebook.com/docs/whatsapp)
- [Cloud API Reference](https://developers.facebook.com/docs/whatsapp/cloud-api/reference)
- [Webhook Reference](https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks)
