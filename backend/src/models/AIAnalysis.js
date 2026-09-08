const mongoose = require('mongoose');
const aiAnalysisSchema = new mongoose.Schema({
  evidenceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Evidence', required: true },
  findings: [String],
  detectedIssues: [String],
  confidence: Number,
  recommendations: [String],
}, { timestamps: true });
module.exports = mongoose.model('AIAnalysis', aiAnalysisSchema);
