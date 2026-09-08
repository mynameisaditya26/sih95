const mongoose = require('mongoose');
const correctiveActionSchema = new mongoose.Schema({
  violationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Violation', required: true },
  institutionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institution', required: true },
  description: { type: String, required: true },
  evidence: { type: String, default: '' },
  status: { type: String, enum: ['PENDING','APPROVED','REJECTED','IN_REVIEW'], default: 'PENDING' },
  submittedAt: { type: Date, default: Date.now },
  reviewedAt: { type: Date, default: null },
  adminComments: { type: String, default: '' },
}, { timestamps: true });
module.exports = mongoose.model('CorrectiveAction', correctiveActionSchema);
