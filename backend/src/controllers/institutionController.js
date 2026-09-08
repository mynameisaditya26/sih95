const Institution = require('../models/Institution');
exports.getInstitutions = async (req, res, next) => {
  try { const inst = await Institution.find(); res.status(200).json(inst); } catch (error) { next(error); }
};
exports.getInstitutionById = async (req, res, next) => {
  try { const inst = await Institution.findById(req.params.id); if (!inst) return res.status(404).json({ message: 'Not found' }); res.status(200).json(inst); } catch (error) { next(error); }
};
exports.createInstitution = async (req, res, next) => {
  try { const inst = await Institution.create(req.body); res.status(201).json(inst); } catch (error) { next(error); }
};
exports.updateInstitution = async (req, res, next) => {
  try { const inst = await Institution.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.status(200).json(inst); } catch (error) { next(error); }
};
exports.deleteInstitution = async (req, res, next) => {
  try { await Institution.findByIdAndDelete(req.params.id); res.status(200).json({ message: 'Deleted' }); } catch (error) { next(error); }
};
