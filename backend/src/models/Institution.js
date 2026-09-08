const mongoose = require('mongoose');
const institutionSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  registrationNumber: { type: String, required: true, unique: true, trim: true },
  category: { type: String, enum: ['SCHOOL','COLLEGE','HOSPITAL','GOVERNMENT_OFFICE','PUBLIC_SECTOR','PRIVATE_SECTOR','OTHER'], default: 'OTHER' },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  latitude: { type: Number, required: true, min: -90, max: 90 },
  longitude: { type: Number, required: true, min: -180, max: 180 },
  riskScore: { type: Number, default: 0, min: 0, max: 100 },
  complianceScore: { type: Number, default: 0, min: 0, max: 100 },
  status: { type: String, enum: ['ACTIVE','INACTIVE','UNDER_REVIEW'], default: 'ACTIVE' },
}, { timestamps: true });
module.exports = mongoose.model('Institution', institutionSchema);
