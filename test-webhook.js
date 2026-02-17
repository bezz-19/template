// Test webhook locally
const webhookPayload = {
  entry: [{
    changes: [{
      value: {
        messages: [{
          from: "6285175434869",
          id: "test_msg_123",
          timestamp: "1234567890",
          type: "text",
          text: {
            body: "Test manual webhook"
          }
        }],
        contacts: [{
          profile: {
            name: "Test User"
          }
        }]
      }
    }]
  }]
}

async function testWebhook() {
  console.log('🧪 Testing webhook...\n')
  console.log('Payload:', JSON.stringify(webhookPayload, null, 2))
  console.log('\n📤 Sending to webhook...\n')

  try {
    const response = await fetch('http://localhost:3000/api/webhook/whatsapp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    })

    const data = await response.json()
    
    console.log('📥 Response status:', response.status)
    console.log('📥 Response data:', JSON.stringify(data, null, 2))

    if (response.ok) {
      console.log('\n✅ Webhook test successful!')
      console.log('\n🔍 Check:')
      console.log('1. Prisma Studio: http://localhost:5555')
      console.log('2. Contact table → should have waId: 6285175434869')
      console.log('3. Message table → should have content: "Test manual webhook"')
    } else {
      console.log('\n❌ Webhook test failed!')
      console.log('Error details:', data)
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

testWebhook()
