import prisma from './prisma'

/**
 * Generate NIP dengan format: YYYY/MM/XXXX
 * YYYY = Tahun
 * MM = Bulan
 * XXXX = Nomor urut (4 digit)
 */
export async function generateNIP(): Promise<string> {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const prefix = `${year}/${month}/`

  // Get last NIP with same prefix
  const lastProfile = await prisma.profile.findFirst({
    where: {
      nip: {
        startsWith: prefix,
      },
    },
    orderBy: {
      nip: 'desc',
    },
  })

  let sequence = 1
  if (lastProfile && lastProfile.nip) {
    // Extract sequence number from last NIP
    const lastSequence = parseInt(lastProfile.nip.split('/')[2])
    sequence = lastSequence + 1
  }

  // Format sequence to 4 digits
  const sequenceStr = String(sequence).padStart(4, '0')

  return `${prefix}${sequenceStr}`
}
