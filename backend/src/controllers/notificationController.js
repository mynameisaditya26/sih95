const Notification = require('../models/Notification');
exports.getNotifications = async (req, res, next) => {
  try { const data = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 }).limit(50); res.status(200).json(data); } catch (error) { next(error); }
};
exports.markAsRead = async (req, res, next) => {
  try { await Notification.findByIdAndUpdate(req.params.id, { read: true }); res.status(200).json({ message: 'Marked read' }); } catch (error) { next(error); }
};
exports.markAllAsRead = async (req, res, next) => {
  try { await Notification.updateMany({ userId: req.user._id, read: false }, { read: true }); res.status(200).json({ message: 'All read' }); } catch (error) { next(error); }
};
exports.getUnreadCount = async (req, res, next) => {
  try { const count = await Notification.countDocuments({ userId: req.user._id, read: false }); res.status(200).json({ count }); } catch (error) { next(error); }
};
exports.createNotification = async (userId, title, message, type, metadata = {}) => {
  try { return await Notification.create({ userId, title, message, type, metadata }); } catch (error) { console.error('Notification error:', error); return null; }
};
