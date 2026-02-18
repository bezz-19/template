# Label Tracking Setup

## Overview

Setiap perubahan label di kanban board akan di-track di database dengan informasi:
- Label sebelumnya (from)
- Label baru (to)
- Siapa yang mengubah (user ID atau system)
- Kapan diubah (timestamp)
- Alasan perubahan (optional)

## Database Schema

### LabelHistory Model

```prisma
model LabelHistory {
  id          String   @id @default(uuid())
  contactId   String
  fromLabelId String
  toLabelId   String
  changedBy   String?  // User ID, "system", atau "webhook"
  reason      String?  // Optional reason
  createdAt   DateTime @default(now())
  
  contact   Contact
  fromLabel Label
  toLabel   Label
}
```

## Setup

### 1. Generate Migration

```bash
npx prisma migrate dev --name add_label_history
```

Ini akan:
- Create table `label_history`
- Add foreign keys ke `contacts` dan `labels`
- Add indexes untuk performance

### 2. Deploy ke Vercel

```bash
git add .
git commit -m "feat: add label tracking history"
git push
```

Vercel akan otomatis run migration saat deploy.

## API Endpoints

### PATCH /api/contacts/:id/label

Update label dan create history.

**Request**:
```json
{
  "labelId": "new_label_id",
  "reason": "Customer requested quote" // optional
}
```

**Response**:
```json
{
  "id": "contact_id",
  "labelId": "new_label_id",
  "label": {
    "id": "label_id",
    "name": "deal making",
    "color": "#8B5CF6"
  }
}
```

**What Happens**:
1. Get current label
2. Update contact label
3. Create history record
4. Return updated contact

### GET /api/contacts/:id/history

Get label change history for a contact.

**Response**:
```json
[
  {
    "id": "history_id",
    "contactId": "contact_id",
    "fromLabelId": "label_1",
    "toLabelId": "label_2",
    "changedBy": "user_id",
    "reason": "Customer requested quote",
    "createdAt": "2024-02-18T10:30:00Z",
    "fromLabel": {
      "id": "label_1",
      "name": "qualified lead",
      "color": "#3B82F6"
    },
    "toLabel": {
      "id": "label_2",
      "name": "deal making",
      "color": "#8B5CF6"
    }
  }
]
```

## Usage Examples

### Track Manual Change (Kanban Board)

Saat user drag & drop di kanban:

```typescript
await fetch(`/api/contacts/${contactId}/label`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    labelId: newLabelId,
    reason: 'Moved via kanban board'
  }),
})
```

### Track Automatic Change (Webhook)

Saat webhook update label:

```typescript
await prisma.$transaction([
  prisma.contact.update({
    where: { id: contactId },
    data: { labelId: newLabelId },
  }),
  prisma.labelHistory.create({
    data: {
      contactId,
      fromLabelId: oldLabelId,
      toLabelId: newLabelId,
      changedBy: 'webhook',
      reason: 'Auto-updated from WhatsApp message',
    }
  })
])
```

### Get Contact History

```typescript
const history = await fetch(`/api/contacts/${contactId}/history`)
const data = await history.json()

// Display timeline
data.forEach(item => {
  console.log(`${item.fromLabel.name} → ${item.toLabel.name}`)
  console.log(`Changed by: ${item.changedBy}`)
  console.log(`At: ${item.createdAt}`)
})
```

## Analytics Queries

### Most Common Label Transitions

```sql
SELECT 
  fl.name as from_label,
  tl.name as to_label,
  COUNT(*) as count
FROM label_history lh
JOIN labels fl ON lh.from_label_id = fl.id
JOIN labels tl ON lh.to_label_id = tl.id
GROUP BY fl.name, tl.name
ORDER BY count DESC
LIMIT 10;
```

### Average Time in Each Label

```sql
WITH label_durations AS (
  SELECT 
    contact_id,
    from_label_id,
    created_at,
    LEAD(created_at) OVER (PARTITION BY contact_id ORDER BY created_at) as next_change
  FROM label_history
)
SELECT 
  l.name,
  AVG(EXTRACT(EPOCH FROM (next_change - created_at))/3600) as avg_hours
FROM label_durations ld
JOIN labels l ON ld.from_label_id = l.id
WHERE next_change IS NOT NULL
GROUP BY l.name
ORDER BY avg_hours DESC;
```

### Contacts Never Moved

```sql
SELECT c.id, c.name, c.phone_number, l.name as current_label
FROM contacts c
JOIN labels l ON c.label_id = l.id
LEFT JOIN label_history lh ON c.id = lh.contact_id
WHERE lh.id IS NULL;
```

## UI Components (Optional)

### Contact History Timeline

Buat component untuk show history di contact detail:

```typescript
function ContactHistory({ contactId }: { contactId: string }) {
  const [history, setHistory] = useState([])
  
  useEffect(() => {
    fetch(`/api/contacts/${contactId}/history`)
      .then(res => res.json())
      .then(setHistory)
  }, [contactId])
  
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Label History</h3>
      {history.map(item => (
        <div key={item.id} className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fromLabel.color }} />
          <span>→</span>
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.toLabel.color }} />
          <div className="flex-1">
            <p className="text-sm">
              {item.fromLabel.name} → {item.toLabel.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(item.createdAt), 'dd MMM yyyy, HH:mm')}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
```

## Benefits

1. **Audit Trail**: Track semua perubahan label
2. **Analytics**: Analyze conversion funnel
3. **Debugging**: Identify issues in label flow
4. **Reporting**: Generate reports on label transitions
5. **Compliance**: Meet audit requirements

## Performance

- Indexes on `contactId` dan `createdAt` untuk fast queries
- History tidak affect kanban board performance
- Async tracking (tidak block UI)

## Troubleshooting

### Migration Error

**Error**: Foreign key constraint fails

**Solution**:
```bash
npx prisma migrate reset
npx prisma db seed
```

### History Not Created

**Error**: Label updated but no history

**Solution**:
1. Cek transaction berhasil
2. Cek foreign keys valid
3. Cek Vercel logs untuk error

### Too Many History Records

**Solution**: Add cleanup job untuk delete old history:

```typescript
// Delete history older than 1 year
await prisma.labelHistory.deleteMany({
  where: {
    createdAt: {
      lt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
    }
  }
})
```

## Next Steps

1. Run migration
2. Test label changes di kanban
3. Verify history created
4. Build analytics dashboard (optional)
5. Add history timeline to contact detail (optional)
