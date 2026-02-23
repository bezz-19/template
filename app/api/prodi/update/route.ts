import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/session'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const UpdateProdiSchema = z.object({
  id: z.string().uuid(),
  code: z.string().optional().nullable(),
  nama: z.string().min(1, 'Nama prodi wajib diisi'),
  jenjang: z.string().min(1, 'Jenjang wajib diisi'),
  status: z.boolean(),
})

export async function PUT(request: Request) {
  try {
    const session = await verifySession()
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = UpdateProdiSchema.safeParse(body)

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

    const { id, code, nama, jenjang, status } = validatedData.data

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

    // Check if code already exists (if changed and provided)
    if (code && code !== existingProdi.code) {
      const codeExists = await prisma.prodi.findUnique({
        where: { code },
      })

      if (codeExists) {
        return NextResponse.json(
          { success: false, message: 'Kode prodi sudah digunakan' },
          { status: 400 }
        )
      }
    }

    const prodi = await prisma.prodi.update({
      where: { id },
      data: {
        code: code || null,
        nama,
        jenjang,
        status,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Prodi berhasil diupdate',
      prodi,
    })
  } catch (error) {
    console.error('Update prodi error:', error)
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
