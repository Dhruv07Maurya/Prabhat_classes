const mongoose = require('mongoose');

const demoBookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: 'Please enter a valid 10-digit phone number'
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: 'Please enter a valid email address'
    }
  },
  selectedDate: {
    type: Date,
    required: [true, 'Demo date is required']
  },
  preferredBatch: {
    type: String,
    enum: ['Morning', 'Afternoon', 'Evening'],
    default: 'Morning'
  },
  classInterested: {
    type: String,
    enum: ['IX', 'X', 'XI Commerce', 'XII Commerce'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  notes: String
}, {
  timestamps: true
});

module.exports = mongoose.model('DemoBooking', demoBookingSchema);
