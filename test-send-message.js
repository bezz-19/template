// Test script untuk kirim WhatsApp message
require('dotenv').config()

const PHONE_NUMBER_ID = process.env.WABA_PHONE_NUMBER_ID
const ACCESS_TOKEN = process.env.WABA_ACCESS_TOKEN
const TO_NUMBER = '6285175434869' // Ganti dengan nomor test Anda

async function sendTestMessage() {
  const url = `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`
  
  const body = {
    messaging_product: 'whatsapp',
    to: TO_NUMBER,
    type: 'text',
    text: {
      body: 'Hello from Node.js test script! 🚀'
    }
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    
    if (response.ok) {
      console.log('✅ Message sent successfully!')
      console.log('Message ID:', data.messages[0].id)
      console.log('Response:', JSON.stringify(data, null, 2))
    } else {
      console.error('❌ Failed to send message')
      console.error('Error:', JSON.stringify(data, null, 2))
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

sendTestMessage()
