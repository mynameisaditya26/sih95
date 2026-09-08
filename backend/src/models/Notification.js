const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['INSPECTION_ASSIGNED','GPS_VERIFIED','EVIDENCE_UPLOADED','AI_ANALYSIS_COMPLETED','VIOLATION_DETECTED','CRITICAL_ALERT','INSPECTION_SUBMITTED','REPORT_GENERATED','CORRECTIVE_ACTION_SUBMITTED','SYSTEM'], default: 'SYSTEM' },
  read: { type: Boolean, default: false },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true });
module.exports = mongoose.model('Notification', notificationSchema);
