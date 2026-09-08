const Institution = require('../models/Institution');
const Inspector = require('../models/Inspector');
const Inspection = require('../models/Inspection');
const Violation = require('../models/Violation');
exports.getDashboardStats = async (req, res, next) => {
  try {
    const totalInst = await Institution.countDocuments();
    const totalInsp = await Inspector.countDocuments();
    const today = new Date(); today.setHours(0,0,0,0);
    const tom = new Date(today); tom.setDate(tom.getDate()+1);
    const todayInsp = await Inspection.countDocuments({ createdAt: { $gte: today, $lt: tom } });
    const ongoing = await Inspection.countDocuments({ status: 'IN_PROGRESS' });
    const pending = await Inspection.countDocuments({ status: 'SUBMITTED' });
    const highRisk = await Institution.countDocuments({ riskScore: { $gte: 70 } });
    const criticalViolations = await Violation.countDocuments({ severity: 'CRITICAL', status: 'OPEN' });
    const recentInspections = await Inspection.find().sort({ createdAt: -1 }).limit(10).populate('institutionId', 'name').populate({ path: 'inspectorId', populate: { path: 'userId', select: 'name' } });
    const highRiskInst = await Institution.find({ riskScore: { $gte: 70 } }).select('name latitude longitude riskScore complianceScore').limit(20);
    res.status(200).json({
      stats: { totalInstitutions: totalInst, totalInspectors: totalInsp, todayInspections: todayInsp, ongoingInspections: ongoing, pendingReviews: pending, highRiskInstitutions: highRisk, criticalViolations },
      recentInspections,
      highRiskInst
    });
  } catch (error) { next(error); }
};
exports.getTrends = async (req, res, next) => {
  try {
    const data = await Inspection.aggregate([
      { $match: { createdAt: { $gte: new Date(Date.now() - 30*24*60*60*1000) } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    res.status(200).json(data);
  } catch (error) { next(error); }
};
exports.getAnalytics = async (req, res, next) => {
  try {
    const total = await Inspection.countDocuments();
    const approved = await Inspection.countDocuments({ status: 'APPROVED' });
    const rejected = await Inspection.countDocuments({ status: 'REJECTED' });
    const violations = await Violation.countDocuments();
    const resolved = await Violation.countDocuments({ status: 'RESOLVED' });
    const avgCompliance = await Institution.aggregate([{ $group: { _id: null, avg: { $avg: '$complianceScore' } } }]);
    res.status(200).json({
      totalInspections: total,
      approvedInspections: approved,
      rejectedInspections: rejected,
      totalViolations: violations,
      resolvedViolations: resolved,
      averageComplianceScore: avgCompliance.length > 0 ? avgCompliance[0].avg : 0
    });
  } catch (error) { next(error); }
};
