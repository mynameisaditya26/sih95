const AuditLog = require('../models/AuditLog');
exports.logAction = async (userId, action, entity, entityId, metadata = {}) => {
  try {
    await AuditLog.create({ userId, action, entity, entityId, metadata });
  } catch (error) {
    console.error('Audit log error:', error);
  }
};
