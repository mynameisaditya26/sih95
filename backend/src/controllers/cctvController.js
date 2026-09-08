const Camera = require('../models/Camera');
exports.getCameras = async (req, res, next) => {
  try { const data = await Camera.find().populate('institutionId', 'name'); res.status(200).json(data); } catch (error) { next(error); }
};
exports.getCameraById = async (req, res, next) => {
  try { const data = await Camera.findById(req.params.id); res.status(200).json(data); } catch (error) { next(error); }
};
exports.createCamera = async (req, res, next) => {
  try { const data = await Camera.create(req.body); res.status(201).json(data); } catch (error) { next(error); }
};
exports.updateCamera = async (req, res, next) => {
  try { const data = await Camera.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.status(200).json(data); } catch (error) { next(error); }
};
exports.deleteCamera = async (req, res, next) => {
  try { await Camera.findByIdAndDelete(req.params.id); res.status(200).json({ message: 'Deleted' }); } catch (error) { next(error); }
};
