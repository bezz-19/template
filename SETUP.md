# WhatsApp CRM Kanban - Setup Instructions

## Prerequisites
- Node.js 18+ installed
- Supabase account dengan PostgreSQL database

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Database
1. Copy `.env.example` ke `.env`
2. Dapatkan connection string dari Supabase:
   - Buka project settings di Supabase
   - Navigate ke Database → Connection String
   - Copy connection pooling URL (untuk `DATABASE_URL`)
   - Copy direct connection URL (untuk `DIRECT_URL`)
3. Update `.env` dengan credentials Anda

### 3. Configure WhatsApp Business API
1. Daftar di Meta for Developers
2. Setup WhatsApp Business API
3. Dapatkan:
   - Phone Number ID
   - Access Token
   - Webhook Verify Token
4. Update di `.env`

### 4. Initialize Database
```bash
# Generate Prisma Client
npm run db:generate

# Push schema ke database
npm run db:push

# Seed default labels
npm run db:seed
```

### 5. Verify Setup
Database Anda sekarang memiliki:
- `users` table (kosong)
- `labels` table dengan 6 default labels
- `contacts` table (kosong)
- `messages` table (kosong)

## Project Structure
```
├── lib/
│   └── prisma.ts          # Prisma singleton client
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed script
├── .env.example           # Environment variables template
├── package.json
├── tsconfig.json
└── ARCHITECTURE.md        # System architecture overview
```

## Database Schema

### User Model
- `id`: UUID (primary key)
- `email`: String (unique)
- `password`: String (hashed)
- `role`: Enum (ADMIN | CS)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Label Model
- `id`: UUID (primary key)
- `name`: String (unique)
- `order`: Integer
- `color`: String (hex color)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Contact Model
- `id`: UUID (primary key)
- `waId`: String (unique, WhatsApp ID)
- `name`: String (nullable)
- `phoneNumber`: String
- `profilePic`: String (nullable, URL)
- `labelId`: UUID (foreign key ke Label)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Message Model
- `id`: UUID (primary key)
- `waMessageId`: String (unique, WhatsApp message ID)
- `contactId`: UUID (foreign key ke Contact)
- `senderId`: UUID (nullable, foreign key ke User)
- `type`: Enum (TEXT | IMAGE | VIDEO | DOCUMENT | AUDIO)
- `content`: String (nullable, text content)
- `mediaUrl`: String (nullable, media file URL)
- `caption`: String (nullable, media caption)
- `status`: Enum (SENT | DELIVERED | READ | FAILED)
- `isFromContact`: Boolean (true = incoming, false = outgoing)
- `timestamp`: DateTime
- `createdAt`: DateTime

### Default Labels (seeded)
1. qualified lead (biru)
2. deal making (ungu)
3. offering letter (orange)
4. field survey (hijau)
5. deal (hijau muda)
6. tidak berkualitas (merah)

## Next Steps
- Setup authentication (NextAuth)
- Buat API routes untuk WABA webhook
- Build Messages UI
- Build Kanban Board UI
- Implement drag & drop functionality
