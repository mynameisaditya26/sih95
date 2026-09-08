const Institution = require('../models/Institution');
const Inspection = require('../models/Inspection');
const Violation = require('../models/Violation');
const CorrectiveAction = require('../models/CorrectiveAction');
const { getSocket } = require('../services/socketService');
exports.getProfile = async (req, res, next) => {
  try { const data = await Institution.findById(req.query.institutionId); res.status(200).json(data); } catch (error) { next(error); }
};
exports.getInspections = async (req, res, next) => {
  try { const data = await Inspection.find({ institutionId: req.query.institutionId }).populate('inspectorId', 'employeeId').sort({ createdAt: -1 }); res.status(200).json(data); } catch (error) { next(error); }
};
exports.getViolations = async (req, res, next) => {
  try { const data = await Violation.find({ institutionId: req.query.institutionId }).populate('inspectionId', 'type status').sort({ createdAt: -1 }); res.status(200).json(data); } catch (error) { next(error); }
};
exports.getCorrectiveActions = async (req, res, next) => {
  try { const data = await CorrectiveAction.find({ institutionId: req.query.institutionId }).populate('violationId').sort({ submittedAt: -1 }); res.status(200).json(data); } catch (error) { next(error); }
};
exports.submitCorrectiveAction = async (req, res, next) => {
  try {
    const { violationId, description, evidence } = req.body;
    const { institutionId } = req.query;
    const violation = await Violation.findById(violationId);
    if (!violation || violation.institutionId.toString() !== institutionId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const existing = await CorrectiveAction.findOne({ violationId, status: { $ne: 'REJECTED' } });
    if (existing) return res.status(400).json({ message: 'Action already pending' });
    const data = await CorrectiveAction.create({ violationId, institutionId, description, evidence, status: 'PENDING' });
    getSocket().emit('corrective_action_submitted', { correctiveActionId: data._id });
    res.status(201).json(data);
  } catch (error) { next(error); }
};
