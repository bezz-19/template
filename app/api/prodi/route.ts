import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/session'
import prisma from '@/lib/prisma'

// GET all prodi (only active by default, or all if includeDeleted=true)
export async function GET(request: Request) {
  try {
    const session = await verifySession()
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const includeDeleted = searchParams.get('includeDeleted') === 'true'

    const prodis = await prisma.prodi.findMany({
      where: includeDeleted ? {} : { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      success: true,
      prodis,
    })
  } catch (error) {
    console.error('Get prodi error:', error)
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
