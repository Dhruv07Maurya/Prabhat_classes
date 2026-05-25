const express = require('express');
const router = express.Router();
const ContactSubmission = require('../models/ContactSubmission');

// @route   GET /api/contacts
// @desc    Get all contact submissions (admin)
router.get('/', async (req, res) => {
  try {
    const { isRead } = req.query;
    
    let query = {};
    if (isRead !== undefined) query.isRead = isRead === 'true';
    
    const contacts = await ContactSubmission.find(query)
      .sort({ createdAt: -1 });
    
    console.log(`[API] Fetched ${contacts.length} contact submissions`);
    res.json({ success: true, data: contacts, count: contacts.length });
  } catch (error) {
    console.error('[API Error] GET /contacts:', error.message);
    res.status(500).json({ success: false, error: 'Server error fetching contacts' });
  }
});

// @route   POST /api/contacts
// @desc    Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message, source } = req.body;
    
    const contact = await ContactSubmission.create({
      name,
      email,
      phone,
      message,
      source: source || 'footer_form'
    });
    
    console.log('[API] New contact submission from:', contact.name);
    res.status(201).json({ 
      success: true, 
      data: contact,
      message: 'Thank you for your message! We will get back to you soon.'
    });
  } catch (error) {
    console.error('[API Error] POST /contacts:', error.message);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, error: messages.join(', ') });
    }
    res.status(500).json({ success: false, error: 'Server error submitting contact form' });
  }
});

// @route   PUT /api/contacts/:id/read
// @desc    Mark contact as read
router.put('/:id/read', async (req, res) => {
  try {
    const contact = await ContactSubmission.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({ success: false, error: 'Contact not found' });
    }
    
    res.json({ success: true, data: contact });
  } catch (error) {
    console.error('[API Error] PUT /contacts/:id/read:', error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   DELETE /api/contacts/:id
// @desc    Delete contact submission
router.delete('/:id', async (req, res) => {
  try {
    const contact = await ContactSubmission.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ success: false, error: 'Contact not found' });
    }
    
    console.log('[API] Deleted contact submission:', contact._id);
    res.json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('[API Error] DELETE /contacts/:id:', error.message);
    res.status(500).json({ success: false, error: 'Server error deleting contact' });
  }
});

module.exports = router;
