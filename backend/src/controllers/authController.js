const User = require('../models/User');
const jwt = require('jsonwebtoken');
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role, phone } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });
    const user = await User.create({ name, email, password, role: role || 'INSTITUTION', phone });
    res.status(201).json({ _id: user._id, name, email, role: user.role, token: generateToken(user._id) });
  } catch (error) { next(error); }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: 'Invalid credentials' });
    res.status(200).json({ _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) });
  } catch (error) { next(error); }
};
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (error) { next(error); }
};
