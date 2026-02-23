import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/session'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const CreateProdiSchema = z.object({
  code: z.string().optional().nullable(),
  nama: z.string().min(1, 'Nama prodi wajib diisi'),
  jenjang: z.string().min(1, 'Jenjang wajib diisi'),
  status: z.boolean().default(true),
})

export async function POST(request: Request) {
  try {
    const session = await verifySession()
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = CreateProdiSchema.safeParse(body)

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

    const { code, nama, jenjang, status } = validatedData.data

    // Check if code already exists (if provided)
    if (code) {
      const existingProdi = await prisma.prodi.findUnique({
        where: { code },
      })

      if (existingProdi) {
        return NextResponse.json(
          { success: false, message: 'Kode prodi sudah digunakan' },
          { status: 400 }
        )
      }
    }

    const prodi = await prisma.prodi.create({
      data: {
        code: code || null,
        nama,
        jenjang,
        status,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Prodi berhasil ditambahkan',
      prodi,
    })
  } catch (error) {
    console.error('Create prodi error:', error)
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
