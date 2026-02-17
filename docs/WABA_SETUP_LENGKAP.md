# Panduan Lengkap Setup WhatsApp Business API (WABA)

## 📋 Daftar Isi
1. [Persiapan Awal](#1-persiapan-awal)
2. [Daftar Meta for Developers](#2-daftar-meta-for-developers)
3. [Buat App di Meta](#3-buat-app-di-meta)
4. [Setup WhatsApp Business](#4-setup-whatsapp-business)
5. [Dapatkan Credentials](#5-dapatkan-credentials)
6. [Setup Webhook Lokal](#6-setup-webhook-lokal)
7. [Configure Webhook di Meta](#7-configure-webhook-di-meta)
8. [Testing](#8-testing)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. Persiapan Awal

### Yang Anda Butuhkan:
- ✅ Akun Facebook (personal atau business)
- ✅ Nomor WhatsApp untuk testing (bisa nomor pribadi)
- ✅ Email aktif
- ✅ Koneksi internet stabil
- ✅ Project Next.js sudah running

### Install Tools:
```bash
# Install ngrok untuk expose localhost
# Download dari: https://ngrok.com/download
# Atau via npm:
npm install -g ngrok

# Verify installation
ngrok version
```

---

## 2. Daftar Meta for Developers

### Langkah 2.1: Buka Meta for Developers
1. Buka browser, kunjungi: **https://developers.facebook.com/**
2. Klik tombol **"Get Started"** atau **"My Apps"** di pojok kanan atas
3. Login dengan akun Facebook Anda

### Langkah 2.2: Verifikasi Akun (jika diminta)
1. Meta mungkin meminta verifikasi email
2. Cek inbox email Anda
3. Klik link verifikasi
4. Kembali ke Meta for Developers

---

## 3. Buat App di Meta

### Langkah 3.1: Create New App
1. Di dashboard, klik **"Create App"** (tombol hijau)
2. Pilih **"Business"** sebagai app type
3. Klik **"Next"**

### Langkah 3.2: Isi Detail App
```
App Name: WhatsApp CRM Kanban
App Contact Email: [email Anda]
Business Portfolio: [Pilih existing atau Create New]
```
4. Klik **"Create App"**
5. Masukkan password Facebook Anda untuk konfirmasi

### Langkah 3.3: Catat App ID
Setelah app dibuat, Anda akan melihat:
```
App ID: 1234567890123456
App Secret: [jangan share ke siapapun]
```
**SIMPAN App ID ini!**

---

## 4. Setup WhatsApp Business

### Langkah 4.1: Add WhatsApp Product
1. Di dashboard app, scroll ke **"Add products to your app"**
2. Cari **"WhatsApp"**
3. Klik **"Set up"**

### Langkah 4.2: Setup Business Portfolio
Jika belum punya:
1. Klik **"Create a Business Portfolio"**
2. Isi nama bisnis: `WhatsApp CRM Business`
3. Klik **"Create"**

### Langkah 4.3: Setup WhatsApp Business Account
1. Pilih **"Create a new WhatsApp Business Account"**
2. Isi nama: `WhatsApp CRM`
3. Pilih kategori: `Technology` atau `Business Services`
4. Klik **"Continue"**

### Langkah 4.4: Pilih Business Portfolio
1. Pilih portfolio yang baru dibuat
2. Klik **"Continue"**

---

## 5. Dapatkan Credentials

### Langkah 5.1: Buka WhatsApp API Setup
1. Di sidebar kiri, klik **"WhatsApp"**
2. Klik **"API Setup"**
3. Anda akan melihat halaman dengan:
   - Test phone number (nomor WhatsApp dari Meta)
   - Phone number ID
   - WhatsApp Business Account ID
   - Temporary access token

### Langkah 5.2: Copy Phone Number ID
```
Cari bagian "From"
Phone number ID: 123456789012345
```
**COPY dan SIMPAN!**

### Langkah 5.3: Copy Temporary Access Token
```
Cari bagian "Temporary access token"
Token: EAAxxxxxxxxxxxxxxxxxxxxxxxxx
```
**COPY dan SIMPAN!**

⚠️ **PENTING**: Token ini expired dalam 24 jam. Untuk production, buat System User Token (dijelaskan di bawah).

### Langkah 5.4: Buat Webhook Verify Token
Buat string random sendiri, contoh:
```
my_super_secret_webhook_token_2024
```
**SIMPAN token ini!**

### Langkah 5.5: Update .env
Buka file `.env` di project Anda dan update:

```env
# Database (sudah ada)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# WhatsApp Business API
WABA_PHONE_NUMBER_ID="123456789012345"
WABA_ACCESS_TOKEN="EAAxxxxxxxxxxxxxxxxxxxxxxxxx"
WABA_WEBHOOK_VERIFY_TOKEN="my_super_secret_webhook_token_2024"

# App (sudah ada)
NODE_ENV="development"
NEXTAUTH_SECRET="super_secret_key"
NEXTAUTH_URL="http://localhost:3000"
```

**SAVE file .env!**

---

## 6. Setup Webhook Lokal

### Langkah 6.1: Jalankan Next.js Dev Server
Buka terminal (Git Bash atau CMD):
```bash
cd C:\Users\ELFAN\Documents\crm-kiro
npm run dev
```

Tunggu sampai muncul:
```
✓ Ready on http://localhost:3000
```

**JANGAN TUTUP terminal ini!**

### Langkah 6.2: Jalankan ngrok
Buka terminal BARU (terminal kedua):
```bash
ngrok http 3000
```

Anda akan melihat output seperti:
```
Session Status                online
Account                       [your account]
Version                       3.x.x
Region                        United States (us)
Forwarding                    https://abc123def456.ngrok-free.app -> http://localhost:3000
```

**COPY URL ngrok** (yang https://abc123def456.ngrok-free.app)

⚠️ **PENTING**: 
- URL ini berubah setiap kali restart ngrok
- Untuk URL tetap, upgrade ke ngrok paid plan
- **JANGAN TUTUP terminal ngrok!**

### Langkah 6.3: Test Webhook Endpoint
Buka browser, akses:
```
https://abc123def456.ngrok-free.app/api/webhook/whatsapp?hub.mode=subscribe&hub.verify_token=my_super_secret_webhook_token_2024&hub.challenge=test123
```

Ganti:
- `abc123def456.ngrok-free.app` dengan URL ngrok Anda
- `my_super_secret_webhook_token_2024` dengan verify token Anda

Jika berhasil, browser akan menampilkan:
```
test123
```

✅ Webhook endpoint Anda sudah siap!

---

## 7. Configure Webhook di Meta

### Langkah 7.1: Buka Webhook Configuration
1. Kembali ke Meta for Developers
2. Di sidebar, klik **"WhatsApp"** → **"Configuration"**
3. Scroll ke bagian **"Webhook"**
4. Klik **"Edit"**

### Langkah 7.2: Isi Webhook Details
```
Callback URL: https://abc123def456.ngrok-free.app/api/webhook/whatsapp
Verify token: my_super_secret_webhook_token_2024
```

⚠️ Ganti dengan URL ngrok dan verify token Anda!

### Langkah 7.3: Verify and Save
1. Klik **"Verify and Save"**
2. Meta akan mengirim request ke webhook Anda
3. Jika berhasil, muncul ✅ "Webhook verified"
4. Jika gagal, cek:
   - URL ngrok benar?
   - Verify token sama dengan di .env?
   - Next.js dev server masih running?
   - ngrok masih running?

### Langkah 7.4: Subscribe to Webhook Fields
Setelah verified, scroll ke bawah:
1. Cari **"Webhook fields"**
2. Klik **"Manage"**
3. Centang:
   - ✅ **messages** (untuk menerima pesan masuk)
   - ✅ **message_status** (untuk status pesan: delivered, read)
4. Klik **"Done"**

✅ Webhook sudah terhubung!

---

## 8. Testing

### Langkah 8.1: Add Test Phone Number
Untuk testing, tambahkan nomor WhatsApp Anda:

1. Kembali ke **"WhatsApp"** → **"API Setup"**
2. Scroll ke bagian **"To"**
3. Klik **"Add phone number"**
4. Masukkan nomor WhatsApp Anda (format: +62812xxxxxxxx)
5. Klik **"Send code"**
6. Cek WhatsApp Anda, akan ada kode OTP
7. Masukkan kode OTP
8. Klik **"Verify"**

✅ Nomor Anda sudah ditambahkan!

### Langkah 8.2: Test Kirim Pesan dari Meta
1. Di halaman **"API Setup"**
2. Bagian **"To"**, pilih nomor Anda
3. Bagian **"Message"**, ketik: `Hello from Meta!`
4. Klik **"Send message"**
5. Cek WhatsApp Anda, pesan masuk!

### Langkah 8.3: Test Terima Pesan (Webhook)
1. Buka WhatsApp di HP Anda
2. Balas pesan dari nomor bisnis Meta
3. Ketik: `Test webhook`
4. Kirim

**Cek terminal Next.js**, seharusnya muncul log:
```
Webhook received: { ... }
```

**Cek database** (via Prisma Studio):
```bash
# Terminal baru (terminal ketiga)
npx prisma studio
```
Buka browser: http://localhost:5555
- Cek tabel **Contact** → ada contact baru
- Cek tabel **Message** → ada message baru

✅ Webhook berhasil menerima pesan!

### Langkah 8.4: Test Kirim Pesan dari CRM
1. Buka browser: http://localhost:3000
2. Login ke CRM
3. Buka halaman **Messages**
4. Pilih contact yang baru dibuat
5. Ketik pesan: `Test from CRM`
6. Klik Send
7. Cek WhatsApp Anda → pesan masuk!

✅ Sistem sudah fully integrated!

---

## 9. Troubleshooting

### Problem: Webhook tidak verified
**Solusi:**
```bash
# Cek Next.js running
curl http://localhost:3000/api/webhook/whatsapp

# Cek ngrok running
curl https://your-ngrok-url.ngrok-free.app/api/webhook/whatsapp

# Cek logs di terminal Next.js
# Cek logs di terminal ngrok
```

### Problem: Tidak menerima pesan masuk
**Solusi:**
1. Cek webhook fields sudah di-subscribe
2. Cek ngrok masih running (URL tidak berubah)
3. Cek terminal Next.js untuk error logs
4. Restart Next.js dan ngrok

### Problem: Tidak bisa kirim pesan
**Solusi:**
1. Cek access token masih valid (expired 24 jam)
2. Cek phone number ID benar
3. Cek nomor penerima sudah di-add sebagai test number
4. Cek .env sudah di-load (restart Next.js)

### Problem: Access token expired
**Solusi - Buat System User Token (untuk production):**

1. Buka **Business Settings** (link di pojok kiri bawah Meta dashboard)
2. Klik **"System Users"** di sidebar
3. Klik **"Add"**
4. Nama: `WhatsApp CRM System User`
5. Role: **Admin**
6. Klik **"Create System User"**
7. Klik **"Add Assets"**
8. Pilih **"Apps"** → pilih app Anda → **Full Control**
9. Klik **"Generate New Token"**
10. Pilih app Anda
11. Centang permissions:
    - ✅ whatsapp_business_messaging
    - ✅ whatsapp_business_management
12. Klik **"Generate Token"**
13. **COPY token** (tidak akan ditampilkan lagi!)
14. Update `.env`:
```env
WABA_ACCESS_TOKEN="[token baru yang tidak expired]"
```
15. Restart Next.js

### Problem: ngrok URL berubah terus
**Solusi:**
1. Upgrade ke ngrok paid plan untuk static URL
2. Atau deploy ke production (Vercel, Railway, dll)
3. Update webhook URL di Meta setiap kali ngrok restart

---

## 10. Production Deployment

### Langkah 10.1: Deploy ke Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables di Vercel dashboard
# Copy semua dari .env
```

### Langkah 10.2: Update Webhook URL
1. Buka Meta for Developers
2. WhatsApp → Configuration → Webhook
3. Edit URL menjadi: `https://your-domain.vercel.app/api/webhook/whatsapp`
4. Verify and Save

### Langkah 10.3: Business Verification (Optional)
Untuk unlimited messaging:
1. Buka Business Settings
2. Security Center → Start Verification
3. Upload dokumen bisnis
4. Tunggu approval (1-3 hari)

---

## 📞 Support

Jika masih ada masalah:
1. Cek [WhatsApp Business API Docs](https://developers.facebook.com/docs/whatsapp)
2. Cek [Meta Developer Community](https://developers.facebook.com/community/)
3. Cek logs di terminal untuk error details

---

## ✅ Checklist

Setup berhasil jika:
- [ ] App dibuat di Meta for Developers
- [ ] WhatsApp product ditambahkan
- [ ] Phone Number ID & Access Token didapat
- [ ] .env sudah diupdate
- [ ] Next.js dev server running
- [ ] ngrok running dan URL didapat
- [ ] Webhook verified di Meta
- [ ] Webhook fields di-subscribe
- [ ] Test number ditambahkan
- [ ] Bisa kirim pesan dari Meta ke WhatsApp
- [ ] Bisa terima pesan dari WhatsApp ke CRM
- [ ] Bisa kirim pesan dari CRM ke WhatsApp

Selamat! 🎉 WhatsApp Business API sudah terintegrasi dengan CRM Anda!
