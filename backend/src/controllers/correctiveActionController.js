const CorrectiveAction = require('../models/CorrectiveAction');
const { getSocket } = require('../services/socketService');
exports.getCorrectiveActions = async (req, res, next) => {
  try {
    let filter = {};
    if (req.user.role === 'INSTITUTION') {
      const { institutionId } = req.query;
      if (institutionId) filter.institutionId = institutionId;
      else return res.status(200).json([]);
    }
    const data = await CorrectiveAction.find(filter).populate('violationId').populate('institutionId', 'name');
    res.status(200).json(data);
  } catch (error) { next(error); }
};
exports.createCorrectiveAction = async (req, res, next) => {
  try {
    const data = await CorrectiveAction.create(req.body);
    getSocket().emit('corrective_action_submitted', { correctiveActionId: data._id });
    res.status(201).json(data);
  } catch (error) { next(error); }
};
exports.reviewCorrectiveAction = async (req, res, next) => {
  try {
    const { status, adminComments } = req.body;
    const data = await CorrectiveAction.findByIdAndUpdate(req.params.id,
      { status, reviewedAt: new Date(), adminComments },
      { new: true }
    );
    res.status(200).json(data);
  } catch (error) { next(error); }
};
