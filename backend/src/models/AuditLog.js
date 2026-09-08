const mongoose = require('mongoose');
const auditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true, enum: ['LOGIN','LOGOUT','CREATE_INSTITUTION','UPDATE_INSTITUTION','DELETE_INSTITUTION','CREATE_INSPECTOR','UPDATE_INSPECTOR','DELETE_INSPECTOR','CREATE_INSPECTION','UPDATE_INSPECTION','DELETE_INSPECTION','ASSIGN_INSPECTOR','START_INSPECTION','GPS_VERIFIED','UPLOAD_EVIDENCE','AI_ANALYSIS','CREATE_VIOLATION','UPDATE_VIOLATION','ESCALATE_VIOLATION','RESOLVE_VIOLATION','APPROVE_REPORT','REJECT_REPORT','SUBMIT_CORRECTIVE_ACTION','REVIEW_CORRECTIVE_ACTION','APPROVE_CORRECTIVE_ACTION','REJECT_CORRECTIVE_ACTION','SYSTEM'] },
  entity: { type: String },
  entityId: { type: mongoose.Schema.Types.ObjectId },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true });
module.exports = mongoose.model('AuditLog', auditLogSchema);
