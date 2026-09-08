const Violation = require('../models/Violation');
const { getSocket } = require('../services/socketService');
const notificationController = require('./notificationController');
const User = require('../models/User');

exports.getViolations = async (req, res, next) => {
  try {
    let filter = {};
    if (req.user.role === 'INSTITUTION') {
      const { institutionId } = req.query;
      if (institutionId) filter.institutionId = institutionId;
      else return res.status(200).json([]);
    }
    const data = await Violation.find(filter).populate('institutionId', 'name').populate('inspectionId', 'type status');
    res.status(200).json(data);
  } catch (error) { next(error); }
};
exports.getViolationById = async (req, res, next) => {
  try { const data = await Violation.findById(req.params.id); res.status(200).json(data); } catch (error) { next(error); }
};
exports.createViolation = async (req, res, next) => {
  try {
    const data = await Violation.create(req.body);
    getSocket().emit('violation_detected', { violationId: data._id, severity: data.severity });
    if (data.severity === 'CRITICAL') {
      getSocket().emit('critical_alert', { violationId: data._id });
      const admins = await User.find({ role: 'ADMIN' });
      for (const admin of admins) {
        await notificationController.createNotification(
          admin._id,
          'Critical Violation Detected',
          `Critical violation: ${data.description}`,
          'CRITICAL_ALERT',
          { violationId: data._id }
        );
      }
    }
    res.status(201).json(data);
  } catch (error) { next(error); }
};
exports.updateViolation = async (req, res, next) => {
  try { const data = await Violation.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.status(200).json(data); } catch (error) { next(error); }
};
exports.escalateViolation = async (req, res, next) => {
  try {
    const v = await Violation.findById(req.params.id);
    if (!v) return res.status(404).json({ message: 'Not found' });
    v.status = 'ESCALATED';
    await v.save();
    getSocket().emit('critical_alert', { violationId: v._id });
    res.status(200).json({ message: 'Escalated' });
  } catch (error) { next(error); }
};
exports.resolveViolation = async (req, res, next) => {
  try {
    const { resolutionDescription, institutionId } = req.body;
    const v = await Violation.findById(req.params.id);
    if (!v) return res.status(404).json({ message: 'Not found' });
    if (institutionId && v.institutionId.toString() !== institutionId) return res.status(403).json({ message: 'Not authorized' });
    v.status = 'RESOLVED';
    v.resolutionDescription = resolutionDescription || 'Resolved';
    await v.save();
    res.status(200).json({ message: 'Resolved' });
  } catch (error) { next(error); }
};
