const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  role: {
    type: String,
    required: true,
    default: 'Faculty'
  },
  subject: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: '/images/placeholder-faculty.png'
  },
  experience: {
    type: String,
    required: true
  },
  description: {
    type: String,
    maxlength: 500
  },
  qualifications: [String],
  isOwner: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Faculty', facultySchema);
