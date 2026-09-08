const mongoose = require('mongoose');
const inspectorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  employeeId: { type: String, required: true, unique: true, trim: true },
  department: { type: String, required: true, trim: true },
  currentLatitude: { type: Number, default: null },
  currentLongitude: { type: Number, default: null },
  availability: { type: Boolean, default: true },
  workload: { type: Number, default: 0, min: 0 },
}, { timestamps: true });
module.exports = mongoose.model('Inspector', inspectorSchema);
