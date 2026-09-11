// backend-example.js
// This file serves as a reference for how a Node.js/Express backend 
// could handle the booking requests, email notifications, and admin APIs.

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Mock Database (e.g. MongoDB, PostgreSQL)
const bookingsDb = [];

/**
 * @route POST /api/bookings
 * @desc Create a new booking from the frontend wizard
 */
app.post('/api/bookings', async (req, res) => {
  try {
    const { serviceId, date, time, user, paymentMethod } = req.body;

    // 1. Validate Input
    if (!serviceId || !date || !time || !user.name || !user.email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 2. Check Availability (Prevent double booking)
    const isBooked = bookingsDb.some(b => b.date === date && b.time === time);
    if (isBooked) {
      return res.status(409).json({ error: 'Time slot no longer available' });
    }

    // 3. Process Payment (if applicable)
    // If paymentMethod === 'card', integrate with Stripe/Square here
    // e.g. const charge = await stripe.charges.create({...});

    // 4. Save to Database
    const newBooking = {
      id: 'BB-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      serviceId,
      date,
      time,
      user,
      paymentMethod,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    
    bookingsDb.push(newBooking);

    // 5. Send Confirmation Emails (using Nodemailer/SendGrid)
    // await sendEmail(user.email, 'Booking Confirmed', emailTemplate(newBooking));
    // await sendEmail('admin@bloomandblush.com', 'New Booking Received', adminTemplate(newBooking));

    res.status(201).json({ 
      success: true, 
      bookingId: newBooking.id,
      message: 'Booking confirmed successfully' 
    });

  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @route GET /api/admin/bookings
 * @desc Get all bookings for admin dashboard
 */
app.get('/api/admin/bookings', (req, res) => {
  // Add authentication middleware here in real app
  res.json({ bookings: bookingsDb });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
