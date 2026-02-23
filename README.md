# Next.js Dashboard Template

Template sederhana untuk aplikasi dengan authentication (login/register) dan dashboard yang sudah terintegrasi dengan Supabase menggunakan Prisma ORM.

## Features

- ✅ Authentication (Login & Register)
- ✅ Role-based access (ADMIN, KARYAWAN & MAHASISWA)
- ✅ Protected dashboard routes
- ✅ Session management
- ✅ Supabase PostgreSQL integration
- ✅ Prisma ORM
- ✅ Tailwind CSS + shadcn/ui components

## Tech Stack

- **Next.js 15** - React framework with App Router
- **Prisma 6** - Database ORM
- **Supabase** - PostgreSQL database
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **bcryptjs** - Password hashing
- **jose** - JWT session management
- **Zod** - Schema validation

## Quick Start

### 1. Clone & Install

```bash
git clone <your-repo>
cd <your-project>
npm install
```

### 2. Setup Database

Buat project baru di [Supabase](https://supabase.com):

1. Buka Supabase Dashboard
2. Create new project
3. Tunggu database ready
4. Buka **Project Settings** > **Database**
5. Copy **Connection String** (pilih mode: Session)

### 3. Setup Environment Variables

Copy `.env.example` ke `.env`:

```bash
cp .env.example .env
```

Edit `.env` dan isi dengan credentials Supabase Anda:

```env
# Database (dari Supabase Project Settings > Database)
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"

# Session Secret (generate dengan: openssl rand -base64 32)
SESSION_SECRET="your-super-secret-key-min-32-characters"
```

**Generate SESSION_SECRET:**
```bash
openssl rand -base64 32
```

### 4. Setup Prisma & Database

```bash
# Generate Prisma Client
bunx prisma generate

# Push schema ke database
bunx prisma db push
```

### 5. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## Usage

### Register User

1. Buka http://localhost:3000/register
2. Isi email, password, dan pilih role (USER/ADMIN)
3. Klik Register
4. Redirect ke login page

### Login

1. Buka http://localhost:3000/login
2. Isi email dan password
3. Klik Login
4. Redirect ke dashboard

### Dashboard

Setelah login, Anda akan masuk ke dashboard di `/dashboard` yang menampilkan informasi user.

## Project Structure

```
├── app/
│   ├── (auth)/              # Auth pages (login, register)
│   │   ├── login/
│   │   └── register/
│   ├── actions/             # Server actions
│   │   └── auth-actions.ts  # Login, register, logout
│   ├── dashboard/           # Protected dashboard
│   │   ├── layout.tsx       # Dashboard layout with navbar
│   │   └── page.tsx         # Dashboard home
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx             # Landing page
├── components/
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── prisma.ts            # Prisma client
│   ├── session.ts           # Session management
│   └── utils.ts             # Utility functions
├── prisma/
│   └── schema.prisma        # Database schema
└── .env.example             # Environment variables template
```

## Database Schema

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  ADMIN
  USER
}
```

## Available Scripts

```bash
# Development
npm run dev              # Start dev server

# Database
npm run db:generate      # Generate Prisma Client
npm run db:push          # Push schema to database
npm run db:studio        # Open Prisma Studio

# Testing
npm run test             # Run Playwright E2E tests (headless)
npm run test:ui          # Run tests with UI mode (interactive)
npm run test:headed      # Run tests with browser visible
npm run test:setup       # Create test users
npm run test:report      # View test report

# Build
npm run build            # Build for production
npm start                # Start production server
```

## Customization

### Add More Fields to User

Edit `prisma/schema.prisma`:

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String?  // Add this
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Then run:
```bash
bunx prisma db push
```

### Add More Models

Edit `prisma/schema.prisma` dan tambahkan model baru, lalu:

```bash
bunx prisma db push
```

### Change Styling

Edit `app/globals.css` atau component files. Template ini menggunakan Tailwind CSS.

## Deployment

### Vercel (Recommended)

1. Push code ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Set environment variables:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `SESSION_SECRET`
4. Deploy

### Other Platforms

Pastikan set environment variables dan jalankan:

```bash
npm run build
npm start
```

## Troubleshooting

### Database Connection Error

- Pastikan `DATABASE_URL` dan `DIRECT_URL` benar
- Cek Supabase project masih aktif
- Cek password tidak ada karakter special yang perlu di-encode

### Prisma Client Error

```bash
bunx prisma generate
```

### Session Error

- Pastikan `SESSION_SECRET` sudah diset di `.env`
- Minimal 32 karakter

## Testing

Template ini dilengkapi dengan automated E2E testing menggunakan Playwright.

### Quick Test

**Windows:**
```bash
scripts/run-all-tests.bat
```

**Linux/Mac:**
```bash
chmod +x scripts/run-all-tests.sh
./scripts/run-all-tests.sh
```

### Manual Testing

```bash
# Setup test users (one time)
node scripts/setup-test-users.js

# Run tests
npm run test              # Headless
npm run test:ui           # Interactive UI mode
npm run test:headed       # See browser
```

### Test Coverage

- ✅ 9 automated E2E tests
- ✅ KARYAWAN profile management
- ✅ ADMIN profile management with admin-only fields
- ✅ Role-based access control
- ✅ Security testing

### Documentation

**Testing Guides:**
- [docs/AUTOMATED_TESTING.md](./docs/AUTOMATED_TESTING.md) - Automated testing guide
- [docs/MANUAL_TESTING_GUIDE.md](./docs/MANUAL_TESTING_GUIDE.md) - Manual testing steps
- [docs/RUN_TESTS.md](./docs/RUN_TESTS.md) - Quick reference
- [docs/TEST_RESULTS_DOCUMENTATION.md](./docs/TEST_RESULTS_DOCUMENTATION.md) - Detailed test results
- [docs/TESTING_PROFILE_MANAGEMENT.md](./docs/TESTING_PROFILE_MANAGEMENT.md) - Test cases

**Setup & Configuration:**
- [docs/QUICK_SETUP.md](./docs/QUICK_SETUP.md) - Quick setup guide
- [docs/GETTING_STARTED.md](./docs/GETTING_STARTED.md) - Getting started
- [docs/SETUP.md](./docs/SETUP.md) - Detailed setup
- [docs/ADMIN_SETUP.md](./docs/ADMIN_SETUP.md) - Admin setup guide
- [docs/REGISTRATION_SECURITY.md](./docs/REGISTRATION_SECURITY.md) - Registration security

**Feature Guides:**
- [docs/USER_MANAGEMENT_GUIDE.md](./docs/USER_MANAGEMENT_GUIDE.md) - User management
- [docs/PRODI_MANAGEMENT_GUIDE.md](./docs/PRODI_MANAGEMENT_GUIDE.md) - Program Studi management
- [docs/PROJECT_STRUCTURE.md](./docs/PROJECT_STRUCTURE.md) - Project structure
- [docs/FAQ.md](./docs/FAQ.md) - Frequently asked questions
- [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md) - Contributing guide

## License

MIT

## Support

Jika ada pertanyaan atau issue, silakan buat issue di repository ini.
