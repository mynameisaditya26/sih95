const mongoose = require('mongoose');
const evidenceSchema = new mongoose.Schema({
  inspectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inspection', required: true },
  institutionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institution', required: true },
  inspectorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inspector', required: true },
  fileUrl: { type: String, required: true },
  fileType: { type: String, enum: ['image/jpeg','image/png','video/mp4','video/quicktime'], required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  capturedAt: { type: Date, default: Date.now },
  description: { type: String, default: '' },
  aiAnalysis: { type: mongoose.Schema.Types.ObjectId, ref: 'AIAnalysis', default: null },
}, { timestamps: true });
module.exports = mongoose.model('Evidence', evidenceSchema);
