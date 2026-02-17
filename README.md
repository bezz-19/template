# WhatsApp CRM Kanban System

Sistem CRM internal untuk mengelola pesan WhatsApp dengan Kanban board.

## Fitur

- **Authentication**: Login & Register untuk Admin dan CS
- **Messages**: Tampilan chat mirip WhatsApp dengan support text, gambar, video
- **Labels**: Assign label ke contact untuk kategorisasi
- **Kanban Board**: Drag & drop contact antar label
- **WABA Integration**: Webhook untuk menerima pesan dari WhatsApp Business API

## Tech Stack

- Next.js 16 (App Router)
- Prisma ORM
- Supabase PostgreSQL
- NextAuth.js
- Zod
- Tailwind CSS
- shadcn/ui
- dnd-kit (drag & drop)

## Setup

Lihat [SETUP.md](./SETUP.md) untuk instruksi lengkap.

## Struktur Project

```
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── contacts/     # Contact management
│   │   ├── messages/     # Message handling
│   │   ├── labels/       # Label management
│   │   └── webhook/      # WABA webhook
│   ├── (auth)/           # Auth pages (login, register)
│   ├── dashboard/        # Dashboard layout
│   ├── messages/         # Messages page
│   └── board/            # Kanban board page
├── lib/
│   ├── prisma.ts         # Prisma client
│   ├── auth.ts           # NextAuth config
│   ├── utils.ts          # Utility functions
│   └── validations/      # Zod schemas
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed data
└── types/                # TypeScript types
```

## Database Models

- **User**: Admin & CS accounts
- **Label**: Kanban columns (qualified lead, deal making, etc.)
- **Contact**: WhatsApp contacts
- **Message**: Chat messages (text, image, video, etc.)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

### Contacts
- `GET /api/contacts` - Get all contacts
- `PATCH /api/contacts/[id]/label` - Update contact label

### Messages
- `GET /api/messages?contactId=xxx` - Get messages by contact
- `POST /api/messages/send` - Send message

### Labels
- `GET /api/labels` - Get all labels

### Webhook
- `GET /api/webhook/whatsapp` - Verify webhook
- `POST /api/webhook/whatsapp` - Receive messages from WABA

## Development

```bash
# Install dependencies
npm install

# Setup database
npm run db:generate
npm run db:push
npm run db:seed

# Run development server
npm run dev
```

## Next Steps

1. Build UI pages (login, register, messages, board)
2. Integrate WABA untuk send/receive messages
3. Add real-time updates (optional)
4. Deploy to production
