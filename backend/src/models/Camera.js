const mongoose = require('mongoose');
const cameraSchema = new mongoose.Schema({
  name: { type: String, required: true },
  institutionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institution', required: true },
  status: { type: String, enum: ['online','offline','maintenance'], default: 'online' },
  streamUrl: { type: String, default: '' },
  lastSeen: { type: Date, default: Date.now },
  isDemo: { type: Boolean, default: true },
}, { timestamps: true });
module.exports = mongoose.model('Camera', cameraSchema);
