// ============================================================================
// mockService.js
// ----------------------------------------------------------------------------
// Every page reads data through these functions instead of importing
// mockData.js directly. When a real backend is ready, replace the body of
// each function with a real fetch()/axios call — keep the same function
// name & return shape and the UI keeps working unmodified.
// ============================================================================
import * as MOCK from '../data/mockData'

const delay = (ms = 250) => new Promise((res) => setTimeout(res, ms))

export async function getProjects() { await delay(); return MOCK.PROJECTS }
export async function getProjectById(id) { await delay(150); return MOCK.PROJECTS.find((p) => p.id === id) }
export async function getInspections() { await delay(); return MOCK.INSPECTIONS }
export async function getInspectionById(id) { await delay(150); return MOCK.INSPECTIONS.find((i) => i.id === id) }
export async function getInspectors() { await delay(); return MOCK.INSPECTORS }
export async function getCctvFeeds() { await delay(); return MOCK.CCTV_FEEDS }
export async function getAttendanceTrend() { await delay(); return MOCK.ATTENDANCE_TREND }
export async function getAnomalies() { await delay(); return MOCK.ANOMALIES }
export async function getRiskScores() { await delay(); return MOCK.PROJECTS.map(p => ({ id: p.id, name: p.name, riskScore: p.riskScore, risk: p.risk })) }
export async function getComplianceBreakdown() { await delay(); return MOCK.COMPLIANCE_BREAKDOWN }
export async function getReports() { await delay(); return MOCK.REPORTS }
export async function getNotifications() { await delay(); return MOCK.NOTIFICATIONS }
export async function getAuditLogs() { await delay(); return MOCK.AUDIT_LOGS }
export async function getUsers() { await delay(); return MOCK.USERS }
export async function getFaqs() { await delay(); return MOCK.FAQS }
