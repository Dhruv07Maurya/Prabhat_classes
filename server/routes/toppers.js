const express = require('express');
const router = express.Router();
const Topper = require('../models/Topper');

// @route   GET /api/toppers
// @desc    Get all toppers with optional year filter
router.get('/', async (req, res) => {
  try {
    const { year, limit } = req.query;
    
    let query = { isActive: true };
    if (year && year !== 'All-Time Records') {
      query.year = year;
    }
    
    const toppers = await Topper.find(query)
      .sort({ rank: 1 })
      .limit(limit ? parseInt(limit) : 10);
    
    console.log(`[API] Fetched ${toppers.length} toppers for year: ${year || 'all'}`);
    res.json({ success: true, data: toppers, count: toppers.length });
  } catch (error) {
    console.error('[API Error] GET /toppers:', error.message);
    res.status(500).json({ success: false, error: 'Server error fetching toppers' });
  }
});

// @route   GET /api/toppers/:id
// @desc    Get single topper by ID
router.get('/:id', async (req, res) => {
  try {
    const topper = await Topper.findById(req.params.id);
    
    if (!topper) {
      return res.status(404).json({ success: false, error: 'Topper not found' });
    }
    
    res.json({ success: true, data: topper });
  } catch (error) {
    console.error('[API Error] GET /toppers/:id:', error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   POST /api/toppers
// @desc    Create new topper
router.post('/', async (req, res) => {
  try {
    const topper = await Topper.create(req.body);
    console.log('[API] Created new topper:', topper.name);
    res.status(201).json({ success: true, data: topper });
  } catch (error) {
    console.error('[API Error] POST /toppers:', error.message);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, error: messages });
    }
    res.status(500).json({ success: false, error: 'Server error creating topper' });
  }
});

// @route   PUT /api/toppers/:id
// @desc    Update topper
router.put('/:id', async (req, res) => {
  try {
    const topper = await Topper.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!topper) {
      return res.status(404).json({ success: false, error: 'Topper not found' });
    }
    
    console.log('[API] Updated topper:', topper.name);
    res.json({ success: true, data: topper });
  } catch (error) {
    console.error('[API Error] PUT /toppers/:id:', error.message);
    res.status(500).json({ success: false, error: 'Server error updating topper' });
  }
});

// @route   DELETE /api/toppers/:id
// @desc    Delete topper (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const topper = await Topper.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!topper) {
      return res.status(404).json({ success: false, error: 'Topper not found' });
    }
    
    console.log('[API] Soft deleted topper:', topper.name);
    res.json({ success: true, message: 'Topper removed successfully' });
  } catch (error) {
    console.error('[API Error] DELETE /toppers/:id:', error.message);
    res.status(500).json({ success: false, error: 'Server error deleting topper' });
  }
});

module.exports = router;
