const Inspector = require('../models/Inspector');
const User = require('../models/User');
exports.getInspectors = async (req, res, next) => {
  try { const data = await Inspector.find().populate('userId', 'name email phone'); res.status(200).json(data); } catch (error) { next(error); }
};
exports.getInspectorById = async (req, res, next) => {
  try { const data = await Inspector.findById(req.params.id).populate('userId', 'name email phone'); if (!data) return res.status(404).json({ message: 'Not found' }); res.status(200).json(data); } catch (error) { next(error); }
};
exports.createInspector = async (req, res, next) => {
  try {
    const { userId, employeeId, department } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const existing = await Inspector.findOne({ userId });
    if (existing) return res.status(400).json({ message: 'User already inspector' });
    const data = await Inspector.create({ userId, employeeId, department });
    await data.populate('userId', 'name email phone');
    res.status(201).json(data);
  } catch (error) { next(error); }
};
exports.updateInspector = async (req, res, next) => {
  try {
    const data = await Inspector.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('userId', 'name email phone');
    res.status(200).json(data);
  } catch (error) { next(error); }
};
exports.deleteInspector = async (req, res, next) => {
  try { await Inspector.findByIdAndDelete(req.params.id); res.status(200).json({ message: 'Deleted' }); } catch (error) { next(error); }
};
