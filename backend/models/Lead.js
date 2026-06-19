const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  email:      { type: String, required: true },
  phone:      { type: String, required: true },
  city:       { type: String },
  roomType:   { type: String, enum: ['Single', 'Double', 'Triple'], default: 'Single' },
  budget:     { type: String },
  moveInDate: { type: String },
  message:    { type: String },
  source:     { type: String, default: 'website' },
  status:     { type: String, enum: ['new', 'contacted', 'converted', 'lost'], default: 'new' },
  notes:      { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);