import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { updateLabelSchema } from '@/lib/validations/message'

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { labelId } = updateLabelSchema.parse({
      contactId: params.id,
      labelId: body.labelId,
    })

    const contact = await prisma.contact.update({
      where: { id: params.id },
      data: { labelId },
      include: { label: true },
    })

    return NextResponse.json(contact)
  } catch (error) {
    console.error('Update label error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan' },
      { status: 500 }
    )
  }
}
