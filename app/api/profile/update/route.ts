import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/session'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const UpdateProfileSchema = z.object({
  // Fields that KARYAWAN can edit
  nik: z.string().optional().nullable(),
  namaLengkap: z.string().optional().nullable(),
  gelarDepan: z.string().optional().nullable(),
  gelarBelakang: z.string().optional().nullable(),
  telepon: z.string().optional().nullable(),
  alamat: z.string().optional().nullable(),
  tempatLahir: z.string().optional().nullable(),
  tanggalLahir: z.string().optional().nullable(), // ISO date string
  jenisKelamin: z.enum(['LAKI_LAKI', 'PEREMPUAN']).optional().nullable(),
  fotoProfil: z.string().optional().nullable(),
  
  // Fields that only ADMIN can edit
  jabatan: z.string().optional().nullable(),
  statusKepegawaian: z.enum(['TETAP', 'TIDAK_TETAP']).optional().nullable(),
})

export async function PUT(request: Request) {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = UpdateProfileSchema.safeParse(body)

    if (!validatedData.success) {
      return NextResponse.json(
        { success: false, message: 'Data tidak valid', errors: validatedData.error.flatten() },
        { status: 400 }
      )
    }

    const data = validatedData.data

    // Check if profile exists
    let profile = await prisma.profile.findUnique({
      where: { userId: session.userId },
    })

    // Prepare update data based on role
    const updateData: any = {}

    // Fields that both KARYAWAN and ADMIN can edit
    if (data.nik !== undefined) updateData.nik = data.nik
    if (data.namaLengkap !== undefined) updateData.namaLengkap = data.namaLengkap
    if (data.gelarDepan !== undefined) updateData.gelarDepan = data.gelarDepan
    if (data.gelarBelakang !== undefined) updateData.gelarBelakang = data.gelarBelakang
    if (data.telepon !== undefined) updateData.telepon = data.telepon
    if (data.alamat !== undefined) updateData.alamat = data.alamat
    if (data.tempatLahir !== undefined) updateData.tempatLahir = data.tempatLahir
    if (data.tanggalLahir !== undefined) {
      updateData.tanggalLahir = data.tanggalLahir ? new Date(data.tanggalLahir) : null
    }
    if (data.jenisKelamin !== undefined) updateData.jenisKelamin = data.jenisKelamin
    if (data.fotoProfil !== undefined) updateData.fotoProfil = data.fotoProfil

    // Fields that only ADMIN can edit
    if (session.role === 'ADMIN') {
      if (data.jabatan !== undefined) updateData.jabatan = data.jabatan
      if (data.statusKepegawaian !== undefined) updateData.statusKepegawaian = data.statusKepegawaian
    }

    if (profile) {
      // Update existing profile
      profile = await prisma.profile.update({
        where: { userId: session.userId },
        data: updateData,
      })
    } else {
      // Create new profile
      profile = await prisma.profile.create({
        data: {
          userId: session.userId,
          ...updateData,
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Profile berhasil diupdate',
      profile,
    })
  } catch (error) {
    console.error('Update profile error:', error)
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
