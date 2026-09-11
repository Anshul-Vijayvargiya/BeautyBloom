const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const twilio = require('twilio');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Initialize Twilio
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// ============================================
// SEND WHATSAPP MESSAGE ON BOOKING
// ============================================

app.post('/api/send-booking-whatsapp', async (req, res) => {
  try {
    const { customerPhone, customerName, date, time, services, bookingId, total } = req.body;

    // Check for missing required fields
    if (!customerPhone || !customerName || !date || !time || !services || !bookingId || total === undefined) {
      console.error('Missing required fields in request body:', req.body);
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate phone (must be 10 digits for Indian numbers)
    if (!/^[0-9]{10}$/.test(customerPhone)) {
      console.error('Invalid phone number format:', customerPhone);
      return res.status(400).json({ error: 'Invalid phone number format. Must be 10 digits.' });
    }

    // Format phone: 9876543210 → +919876543210
    const formattedPhone = `+91${customerPhone}`;

    // Build WhatsApp message
    const serviceList = services
      .map(s => `• ${s.name} - ₹${s.price}`)
      .join('\n');

    const message = `🌸 *Booking Confirmed* 🌸

Hi ${customerName}!

Your appointment is confirmed at *Bloom & Blush Beauty Studio*

📅 *Date:* ${date}
🕐 *Time:* ${time}
💇 *Services:*
${serviceList}

💰 *Total:* ₹${total}
🎫 *Booking ID:* ${bookingId}

See you soon! If you need to reschedule, call us at +91-XXXXXXXXXX

*Bloom & Blush Team* 💄✨`;

    // Send via Twilio WhatsApp
    const result = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_SANDBOX}`,
      to: `whatsapp:${formattedPhone}`,
      body: message
    });

    console.log(`✓ WhatsApp sent to ${formattedPhone}. Message SID: ${result.sid}`);

    res.json({
      success: true,
      messageSid: result.sid,
      message: 'WhatsApp message sent successfully!'
    });

  } catch (error) {
    console.error('WhatsApp error:', error.message);
    res.status(500).json({ 
      error: 'Failed to send WhatsApp message',
      details: error.message 
    });
  }
});

// ============================================
// TEST ENDPOINT
// ============================================

app.get('/api/test-whatsapp', async (req, res) => {
  try {
    const message = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_SANDBOX}`,
      to: `whatsapp:+91${process.env.TWILIO_PHONE}`,
      body: 'Test message from Bloom & Blush! ✨'
    });
    res.json({ success: true, messageSid: message.sid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✓ Backend running on http://localhost:${PORT}`);
  console.log(`✓ WhatsApp integration active`);
});
