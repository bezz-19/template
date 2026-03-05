import { verifySession } from '@/lib/session'

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

export async function POST(request: Request) {
  try {
    const session = await verifySession()
    if (!session) {
      return new Response(
        JSON.stringify({ success: false, message: 'Unauthorized' }),
        { status: 401 }
      )
    }

    const { message, history = [] } = await request.json()

    if (!message) {
      return new Response(
        JSON.stringify({ success: false, message: 'Message is required' }),
        { status: 400 }
      )
    }

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      return new Response(
        JSON.stringify({ success: false, message: 'Groq API key not configured' }),
        { status: 500 }
      )
    }

    // Build messages array with history (limit to last 10 messages for speed)
    const recentHistory = history.slice(-10)
    const messages = [
      {
        role: 'system',
        content: `Anda adalah asisten AI untuk Sistem Informasi Pesantren. Anda membantu santri, ustadz, dan admin dengan:

1. Informasi umum tentang pesantren (jadwal, kegiatan, peraturan)
2. Bantuan pembelajaran agama Islam (tajwid, fiqih, hadits, tafsir sederhana)
3. Motivasi dan bimbingan untuk santri
4. Bantuan akademik dan tugas sekolah

PENTING:
- Gunakan bahasa yang sopan dan santun
- Untuk pertanyaan agama yang kompleks, arahkan untuk bertanya langsung ke ustadz
- Jangan memberikan fatwa, hanya informasi umum
- Selalu awali dengan salam dan akhiri dengan doa
- Gunakan referensi Al-Quran dan Hadits jika relevan

Jawab dengan singkat, jelas, dan bermanfaat.`,
      },
      ...recentHistory,
      {
        role: 'user',
        content: message,
      },
    ]

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant', // Faster model
        messages,
        temperature: 0.7,
        max_tokens: 512, // Reduced for faster response
        stream: true, // Enable streaming
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Groq API error:', error)
      return new Response(
        JSON.stringify({ success: false, message: 'Failed to get AI response' }),
        { status: response.status }
      )
    }

    // Stream the response
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chat error:', error)
    return new Response(
      JSON.stringify({ success: false, message: 'Internal server error' }),
      { status: 500 }
    )
  }
}
