import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const labels = await prisma.label.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { contacts: true },
        },
      },
    })

    return NextResponse.json(labels)
  } catch (error) {
    console.error('Get labels error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan' },
      { status: 500 }
    )
  }
}
