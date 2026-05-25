const mongoose = require('mongoose');

const contactSubmissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  source: {
    type: String,
    enum: ['footer_form', 'contact_page', 'popup'],
    default: 'footer_form'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  respondedAt: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('ContactSubmission', contactSubmissionSchema);
