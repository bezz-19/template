import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifySession } from '@/lib/session'
import { updateLabelSchema } from '@/lib/validations/message'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await req.json()
    const { labelId } = updateLabelSchema.parse({
      contactId: id,
      labelId: body.labelId,
    })

    // Get current contact to track old label
    const currentContact = await prisma.contact.findUnique({
      where: { id },
      select: { labelId: true }
    })

    if (!currentContact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
    }

    // Update contact label and create history in transaction
    const [contact] = await prisma.$transaction([
      prisma.contact.update({
        where: { id },
        data: { labelId },
        include: { label: true },
      }),
      prisma.labelHistory.create({
        data: {
          contactId: id,
          fromLabelId: currentContact.labelId,
          toLabelId: labelId,
          changedBy: session.userId,
          reason: body.reason || null,
        }
      })
    ])

    return NextResponse.json(contact)
  } catch (error) {
    console.error('Update label error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan' },
      { status: 500 }
    )
  }
}
