import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/session'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const DeleteProdiSchema = z.object({
  id: z.string().uuid(),
})

export async function DELETE(request: Request) {
  try {
    const session = await verifySession()
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = DeleteProdiSchema.safeParse(body)

    if (!validatedData.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Data tidak valid', 
          errors: validatedData.error.flatten() 
        },
        { status: 400 }
      )
    }

    const { id } = validatedData.data

    // Check if prodi exists
    const existingProdi = await prisma.prodi.findUnique({
      where: { id },
    })

    if (!existingProdi) {
      return NextResponse.json(
        { success: false, message: 'Prodi tidak ditemukan' },
        { status: 404 }
      )
    }

    // Soft delete: set deletedAt
    const prodi = await prisma.prodi.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        status: false, // Set status to inactive
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Prodi berhasil dihapus',
      prodi,
    })
  } catch (error) {
    console.error('Delete prodi error:', error)
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
