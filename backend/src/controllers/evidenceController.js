const Evidence = require('../models/Evidence');
const Inspection = require('../models/Inspection');
const Inspector = require('../models/Inspector');
const { getSocket } = require('../services/socketService');
const aiService = require('../services/aiService');
const AIAnalysis = require('../models/AIAnalysis');
const path = require('path');

exports.uploadEvidence = async (req, res, next) => {
  try {
    const { latitude, longitude, description } = req.body;
    const inspectionId = req.params.id;
    const inspection = await Inspection.findById(inspectionId);
    if (!inspection) return res.status(404).json({ message: 'Not found' });
    const inspector = await Inspector.findOne({ userId: req.user._id });
    if (!inspector || inspection.inspectorId.toString() !== inspector._id.toString()) return res.status(403).json({ message: 'Not authorized' });
    if (!req.file) return res.status(400).json({ message: 'No file' });
    const ev = await Evidence.create({
      inspectionId, institutionId: inspection.institutionId, inspectorId: inspector._id,
      fileUrl: `/uploads/${req.file.filename}`,
      fileType: req.file.mimetype,
      latitude: parseFloat(latitude), longitude: parseFloat(longitude),
      description
    });
    getSocket().emit('evidence_uploaded', { inspectionId, evidenceId: ev._id });
    // Trigger AI analysis asynchronously
    try {
      const filePath = path.join(__dirname, '../../uploads', req.file.filename);
      const result = await aiService.analyzeImage(filePath);
      const ai = await AIAnalysis.create({
        evidenceId: ev._id,
        findings: result.findings,
        detectedIssues: result.detectedIssues,
        confidence: result.confidence,
        recommendations: result.recommendations
      });
      ev.aiAnalysis = ai._id;
      await ev.save();
      getSocket().emit('ai_analysis_completed', { evidenceId: ev._id, analysisId: ai._id });
    } catch (err) {
      console.error('AI analysis failed:', err);
    }
    res.status(201).json(ev);
  } catch (error) { next(error); }
};
exports.getEvidence = async (req, res, next) => {
  try {
    const data = await Evidence.find({ inspectionId: req.params.id }).populate('aiAnalysis');
    res.status(200).json(data);
  } catch (error) { next(error); }
};
