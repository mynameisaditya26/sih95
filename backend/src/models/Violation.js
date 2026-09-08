const mongoose = require('mongoose');
const violationSchema = new mongoose.Schema({
  inspectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inspection', required: true },
  institutionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institution', required: true },
  category: { type: String, required: true },
  severity: { type: String, enum: ['LOW','MEDIUM','HIGH','CRITICAL'], default: 'LOW' },
  description: { type: String, required: true },
  evidenceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Evidence', default: null },
  status: { type: String, enum: ['OPEN','UNDER_REVIEW','ACTION_REQUIRED','RESOLVED','ESCALATED'], default: 'OPEN' },
  dueDate: { type: Date, default: null },
  resolutionDescription: { type: String, default: '' },
}, { timestamps: true });
module.exports = mongoose.model('Violation', violationSchema);
