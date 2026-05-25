const express = require('express');
const router = express.Router();
const DemoBooking = require('../models/DemoBooking');

// @route   GET /api/bookings
// @desc    Get all demo bookings (admin)
router.get('/', async (req, res) => {
  try {
    const { status, date } = req.query;
    
    let query = {};
    if (status) query.status = status;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.selectedDate = { $gte: startDate, $lt: endDate };
    }
    
    const bookings = await DemoBooking.find(query)
      .sort({ createdAt: -1 });
    
    console.log(`[API] Fetched ${bookings.length} demo bookings`);
    res.json({ success: true, data: bookings, count: bookings.length });
  } catch (error) {
    console.error('[API Error] GET /bookings:', error.message);
    res.status(500).json({ success: false, error: 'Server error fetching bookings' });
  }
});

// @route   POST /api/bookings
// @desc    Create new demo booking
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, selectedDate, classInterested, preferredBatch } = req.body;
    
    // Check for existing booking with same phone/email on same date
    const existingBooking = await DemoBooking.findOne({
      $or: [{ phone }, { email }],
      selectedDate: new Date(selectedDate),
      status: { $ne: 'cancelled' }
    });
    
    if (existingBooking) {
      return res.status(400).json({ 
        success: false, 
        error: 'A booking already exists for this phone/email on the selected date' 
      });
    }
    
    const booking = await DemoBooking.create({
      name,
      phone,
      email,
      selectedDate: new Date(selectedDate),
      classInterested,
      preferredBatch
    });
    
    console.log('[API] Created new demo booking for:', booking.name);
    res.status(201).json({ 
      success: true, 
      data: booking,
      message: 'Demo class booked successfully! We will contact you shortly.'
    });
  } catch (error) {
    console.error('[API Error] POST /bookings:', error.message);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, error: messages.join(', ') });
    }
    res.status(500).json({ success: false, error: 'Server error creating booking' });
  }
});

// @route   PUT /api/bookings/:id/status
// @desc    Update booking status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' });
    }
    
    const booking = await DemoBooking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }
    
    console.log('[API] Updated booking status:', booking._id, 'to', status);
    res.json({ success: true, data: booking });
  } catch (error) {
    console.error('[API Error] PUT /bookings/:id/status:', error.message);
    res.status(500).json({ success: false, error: 'Server error updating booking' });
  }
});

// @route   DELETE /api/bookings/:id
// @desc    Cancel booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await DemoBooking.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );
    
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }
    
    console.log('[API] Cancelled booking:', booking._id);
    res.json({ success: true, message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('[API Error] DELETE /bookings/:id:', error.message);
    res.status(500).json({ success: false, error: 'Server error cancelling booking' });
  }
});

module.exports = router;
