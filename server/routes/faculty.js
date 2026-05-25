const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty');

// @route   GET /api/faculty
// @desc    Get all faculty members
router.get('/', async (req, res) => {
  try {
    const faculty = await Faculty.find({ isActive: true })
      .sort({ order: 1, isOwner: -1 });
    
    console.log(`[API] Fetched ${faculty.length} faculty members`);
    res.json({ success: true, data: faculty, count: faculty.length });
  } catch (error) {
    console.error('[API Error] GET /faculty:', error.message);
    res.status(500).json({ success: false, error: 'Server error fetching faculty' });
  }
});

// @route   GET /api/faculty/:id
// @desc    Get single faculty member
router.get('/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    
    if (!faculty) {
      return res.status(404).json({ success: false, error: 'Faculty not found' });
    }
    
    res.json({ success: true, data: faculty });
  } catch (error) {
    console.error('[API Error] GET /faculty/:id:', error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   POST /api/faculty
// @desc    Add new faculty member
router.post('/', async (req, res) => {
  try {
    const faculty = await Faculty.create(req.body);
    console.log('[API] Created new faculty:', faculty.name);
    res.status(201).json({ success: true, data: faculty });
  } catch (error) {
    console.error('[API Error] POST /faculty:', error.message);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, error: messages });
    }
    res.status(500).json({ success: false, error: 'Server error creating faculty' });
  }
});

// @route   PUT /api/faculty/:id
// @desc    Update faculty member
router.put('/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!faculty) {
      return res.status(404).json({ success: false, error: 'Faculty not found' });
    }
    
    console.log('[API] Updated faculty:', faculty.name);
    res.json({ success: true, data: faculty });
  } catch (error) {
    console.error('[API Error] PUT /faculty/:id:', error.message);
    res.status(500).json({ success: false, error: 'Server error updating faculty' });
  }
});

// @route   DELETE /api/faculty/:id
// @desc    Remove faculty member (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!faculty) {
      return res.status(404).json({ success: false, error: 'Faculty not found' });
    }
    
    console.log('[API] Soft deleted faculty:', faculty.name);
    res.json({ success: true, message: 'Faculty removed successfully' });
  } catch (error) {
    console.error('[API Error] DELETE /faculty/:id:', error.message);
    res.status(500).json({ success: false, error: 'Server error deleting faculty' });
  }
});

module.exports = router;
