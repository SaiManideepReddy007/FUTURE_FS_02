const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const Lead = require('../models/Lead');

// PUBLIC - Submit lead from contact form
router.post('/', async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PROTECTED - Get all leads (admin only)
router.get('/', protect, async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json({ success: true, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PROTECTED - Update lead status or notes
router.put('/:id', protect, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: lead });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PROTECTED - Delete a lead
router.delete('/:id', protect, async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;