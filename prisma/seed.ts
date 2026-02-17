import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding default labels...')

  const labels = [
    { name: 'qualified lead', order: 1, color: '#3B82F6' },
    { name: 'deal making', order: 2, color: '#8B5CF6' },
    { name: 'offering letter', order: 3, color: '#F59E0B' },
    { name: 'field survey', order: 4, color: '#10B981' },
    { name: 'deal', order: 5, color: '#22C55E' },
    { name: 'tidak berkualitas', order: 6, color: '#EF4444' },
  ]

  for (const label of labels) {
    await prisma.label.upsert({
      where: { name: label.name },
      update: {},
      create: label,
    })
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
