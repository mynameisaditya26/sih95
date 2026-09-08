const mongoose = require('mongoose');
const checklistItemSchema = new mongoose.Schema({
  question: { type: String, required: true },
  category: { type: String, enum: ['Infrastructure','Staff','Safety','Operations','Documentation','Compliance'], required: true },
  answer: { type: String, enum: ['PASS','FAIL','NA', null], default: null },
  comment: { type: String, default: '' },
  evidenceRequired: { type: Boolean, default: false },
});
const inspectionSchema = new mongoose.Schema({
  institutionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institution', required: true },
  inspectorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inspector', required: true },
  type: { type: String, enum: ['SURPRISE','SCHEDULED','FOLLOW_UP'], required: true },
  status: { type: String, enum: ['PENDING','ASSIGNED','ACCEPTED','IN_PROGRESS','SUBMITTED','UNDER_REVIEW','APPROVED','REJECTED','CLOSED'], default: 'PENDING' },
  scheduledAt: { type: Date, default: null },
  startedAt: { type: Date, default: null },
  completedAt: { type: Date, default: null },
  latitude: { type: Number, default: null },
  longitude: { type: Number, default: null },
  gpsVerified: { type: Boolean, default: false },
  gpsVerifiedAt: { type: Date, default: null },
  complianceScore: { type: Number, default: null },
  riskScore: { type: Number, default: null },
  summary: { type: String, default: '' },
  adminStatus: { type: String, enum: ['PENDING','APPROVED','REJECTED','ESCALATED'], default: 'PENDING' },
  checklist: [checklistItemSchema],
  assignedAt: { type: Date, default: null },
  reason: { type: String, default: '' },
}, { timestamps: true });
module.exports = mongoose.model('Inspection', inspectionSchema);
