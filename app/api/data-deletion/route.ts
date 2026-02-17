import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Data Deletion Callback untuk Meta
// Meta akan panggil endpoint ini ketika user request hapus data via Facebook
export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    console.log('📥 Data deletion request received:', body)

    // Meta mengirim signed_request yang berisi user_id
    const signedRequest = body.signed_request
    
    if (!signedRequest) {
      return NextResponse.json(
        { error: 'Missing signed_request' },
        { status: 400 }
      )
    }

    // Parse signed_request (format: signature.payload)
    const [signature, payload] = signedRequest.split('.')
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid signed_request format' },
        { status: 400 }
      )
    }

    // Decode payload (base64)
    const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8')
    const data = JSON.parse(decodedPayload)
    
    console.log('📋 Decoded data:', data)

    // Data berisi: { user_id: "xxx", algorithm: "HMAC-SHA256", issued_at: xxx }
    const userId = data.user_id

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing user_id in payload' },
        { status: 400 }
      )
    }

    // TODO: Implement actual data deletion logic
    // Untuk sekarang, kita log saja. Nanti bisa ditambahkan:
    // 1. Cari user berdasarkan userId (mapping ke waId atau email)
    // 2. Hapus semua data user (messages, contact, dll)
    // 3. Log deletion untuk audit trail

    console.log(`🗑️ Data deletion requested for user: ${userId}`)

    // Generate confirmation code untuk tracking
    const confirmationCode = `del_${Date.now()}_${userId.substring(0, 8)}`

    // Return response dengan URL dan confirmation code
    // Meta akan tampilkan ini ke user
    return NextResponse.json({
      url: `${process.env.NEXTAUTH_URL}/data-deletion?code=${confirmationCode}`,
      confirmation_code: confirmationCode,
    })
  } catch (error: any) {
    console.error('❌ Data deletion error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// GET endpoint untuk verifikasi (optional)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  return NextResponse.json({
    message: 'Data Deletion Callback Endpoint',
    status: 'active',
    code: code || 'none',
  })
}
