# Deployment Guide

## Environment Variables

Pastikan semua environment variables sudah diset:

```env
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# WhatsApp Business API
WABA_PHONE_NUMBER_ID="your_phone_number_id"
WABA_ACCESS_TOKEN="your_access_token"
WABA_WEBHOOK_VERIFY_TOKEN="your_verify_token"

# NextAuth
NEXTAUTH_SECRET="generate_with_openssl_rand_base64_32"
NEXTAUTH_URL="https://your-domain.com"

# App
NODE_ENV="production"
```

## Generate NextAuth Secret

```bash
openssl rand -base64 32
```

## Build & Deploy

### Vercel (Recommended)

1. Push code ke GitHub
2. Import project di Vercel
3. Set environment variables
4. Deploy

### Manual Deployment

```bash
# Install dependencies
npm install

# Generate Prisma Client
npm run db:generate

# Build
npm run build

# Start production server
npm start
```

## Database Migration

```bash
# Push schema ke production database
npm run db:push

# Seed default labels
npm run db:seed
```

## WhatsApp Webhook Setup

1. Buka Meta for Developers
2. Navigate ke WhatsApp > Configuration
3. Set Webhook URL: `https://your-domain.com/api/webhook/whatsapp`
4. Set Verify Token: sama dengan `WABA_WEBHOOK_VERIFY_TOKEN`
5. Subscribe ke events: `messages`, `message_status`

## Post-Deployment Checklist

- [ ] Database connected
- [ ] Default labels seeded
- [ ] WABA webhook verified
- [ ] Login/Register working
- [ ] Messages page working
- [ ] Board page working
- [ ] Drag & drop working
- [ ] Label changes syncing

## Monitoring

Monitor logs untuk:
- Webhook errors
- Database connection issues
- Authentication failures
- Message send/receive errors
