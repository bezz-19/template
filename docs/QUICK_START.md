# Quick Start Guide - WhatsApp CRM

## 🚀 Setup dalam 10 Menit

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
# Generate Prisma Client
npm run db:generate

# Push schema ke database
npm run db:push

# Seed default labels
npm run db:seed
```

### 3. Setup Environment Variables
Copy `.env.example` ke `.env` dan isi:
```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
WABA_PHONE_NUMBER_ID="dari Meta"
WABA_ACCESS_TOKEN="dari Meta"
WABA_WEBHOOK_VERIFY_TOKEN="buat sendiri"
NEXTAUTH_SECRET="generate dengan: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Run Development Server
```bash
npm run dev
```

### 5. Setup Webhook (Terminal Baru)
```bash
ngrok http 3000
```

### 6. Configure di Meta
1. Buka https://developers.facebook.com/
2. WhatsApp → Configuration → Webhook
3. URL: `https://[ngrok-url].ngrok-free.app/api/webhook/whatsapp`
4. Verify token: (dari .env)
5. Subscribe: messages, message_status

### 7. Test
1. Buka http://localhost:3000
2. Register akun
3. Login
4. Kirim pesan WhatsApp ke nomor bisnis
5. Lihat pesan muncul di CRM!

## 📚 Dokumentasi Lengkap
Lihat `docs/WABA_SETUP_LENGKAP.md` untuk panduan detail step-by-step.

## 🆘 Troubleshooting
- **Database error**: Cek connection string di .env
- **Webhook not verified**: Cek ngrok running & verify token
- **Can't send message**: Cek access token & phone number ID
- **Message not received**: Cek webhook fields subscribed

## 📁 Struktur Project
```
├── app/
│   ├── api/              # API routes
│   ├── (auth)/           # Login & Register
│   └── dashboard/        # Messages & Board
├── lib/
│   ├── prisma.ts         # Database client
│   ├── auth.ts           # NextAuth config
│   └── whatsapp.ts       # WABA integration
├── prisma/
│   └── schema.prisma     # Database schema
└── docs/                 # Documentation
```

## 🎯 Next Steps
1. Customize UI sesuai brand
2. Add more features (broadcast, template, etc)
3. Deploy to production
4. Business verification untuk unlimited messaging
