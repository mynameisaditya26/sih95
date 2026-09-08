// ============================================================================
// mockData.js
// ----------------------------------------------------------------------------
// ALL demo/mock data for the DoSJE Smart Monitoring prototype lives here,
// intentionally separated from UI components so a real backend can later
// replace src/services/mockService.js without touching any page/component.
//
// NOTE: This is 100% simulated data for demonstration purposes only.
// ============================================================================

// ---- simple seeded pseudo-random generator so data is stable across reloads
let seed = 42
function rand() {
  seed = (seed * 9301 + 49297) % 233280
  return seed / 233280
}
function pick(arr) { return arr[Math.floor(rand() * arr.length)] }
function randInt(min, max) { return Math.floor(rand() * (max - min + 1)) + min }

export const STATES = [
  { state: 'Delhi', districts: ['New Delhi', 'North Delhi', 'South Delhi'] },
  { state: 'Maharashtra', districts: ['Mumbai', 'Pune', 'Nagpur'] },
  { state: 'Uttar Pradesh', districts: ['Lucknow', 'Kanpur', 'Varanasi'] },
  { state: 'West Bengal', districts: ['Kolkata', 'Howrah', 'Siliguri'] },
  { state: 'Tamil Nadu', districts: ['Chennai', 'Coimbatore', 'Madurai'] },
  { state: 'Karnataka', districts: ['Bengaluru', 'Mysuru', 'Hubballi'] },
  { state: 'Rajasthan', districts: ['Jaipur', 'Jodhpur', 'Udaipur'] },
  { state: 'Bihar', districts: ['Patna', 'Gaya', 'Muzaffarpur'] },
]

export const SCHEMES = [
  'PM-DAKSH Skill Development',
  'National Fellowship for SC Students',
  'Shelter Home for Senior Citizens',
  'Assistance to Disabled Persons (ADIP)',
  'Scholarship for OBC Students',
  'Rehabilitation of Manual Scavengers',
  'Care Home for Destitute Women',
  'De-addiction Awareness Program',
]

const NGO_PREFIX = ['Asha', 'Nirmal', 'Sewa', 'Prayas', 'Umeed', 'Vikas', 'Kalyan', 'Jyoti', 'Manzil', 'Saksham', 'Roshni', 'Sahyog']
const NGO_SUFFIX = ['Welfare Society', 'Charitable Trust', 'Foundation', 'Institute', 'Seva Sansthan', 'Development Trust', 'Rehabilitation Centre']

const FIRST_NAMES = ['Rahul', 'Priya', 'Amit', 'Sunita', 'Vikram', 'Anjali', 'Rajesh', 'Deepa', 'Suresh', 'Kavita', 'Manoj', 'Neha', 'Arun', 'Pooja', 'Sanjay', 'Ritu', 'Ashok', 'Meena', 'Vivek', 'Shreya']
const LAST_NAMES = ['Sharma', 'Verma', 'Gupta', 'Singh', 'Reddy', 'Iyer', 'Nair', 'Patil', 'Das', 'Chatterjee', 'Mishra', 'Yadav', 'Joshi', 'Bhatt', 'Rao']

function fullName() { return `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}` }

export const RISK_LEVELS = ['LOW', 'MEDIUM', 'HIGH']
export const PROJECT_STATUSES = ['Active', 'Under Review', 'Suspended', 'Closed']

export const PROJECTS = Array.from({ length: 24 }).map((_, i) => {
  const st = pick(STATES)
  const district = pick(st.districts)
  const risk = pick(RISK_LEVELS)
  const riskScore = risk === 'HIGH' ? randInt(70, 96) : risk === 'MEDIUM' ? randInt(40, 69) : randInt(5, 39)
  const compliance = Math.max(35, 100 - riskScore + randInt(-8, 8))
  const cctvTotal = randInt(3, 8)
  const cctvOffline = risk === 'HIGH' ? randInt(1, 3) : randInt(0, 1)
  return {
    id: `DOSJE-PRJ-${String(1000 + i)}`,
    name: `${pick(NGO_PREFIX)} ${pick(NGO_SUFFIX)}`,
    scheme: pick(SCHEMES),
    state: st.state,
    district,
    incharge: fullName(),
    inchargePhone: `+91 ${randInt(70000, 99999)} ${randInt(10000, 99999)}`,
    beneficiaries: randInt(35, 420),
    staff: randInt(4, 40),
    risk,
    riskScore,
    compliance,
    cctvTotal,
    cctvOnline: cctvTotal - cctvOffline,
    cctvOffline,
    lastInspection: `${randInt(1, 28)} ${pick(['Jun', 'Jul', 'Aug', 'Sep'])} 2026`,
    status: pick(PROJECT_STATUSES),
    lat: 20 + rand() * 12,
    lng: 72 + rand() * 15,
    registeredOn: `${randInt(2018, 2024)}`,
    address: `${randInt(1, 200)}, ${pick(['MG Road', 'Civil Lines', 'Sector 12', 'Gandhi Nagar', 'Station Road'])}, ${district}`,
  }
})

export const INSPECTORS = Array.from({ length: 12 }).map((_, i) => {
  const st = pick(STATES)
  return {
    id: `INS-${String(200 + i)}`,
    name: fullName(),
    district: pick(st.districts),
    state: st.state,
    workload: pick(['Low', 'Medium', 'High']),
    activeAssignments: randInt(0, 6),
    completedThisMonth: randInt(3, 22),
    rating: (3.6 + rand() * 1.4).toFixed(1),
    available: rand() > 0.25,
    phone: `+91 ${randInt(70000, 99999)} ${randInt(10000, 99999)}`,
  }
})

const INSPECTION_TYPES = ['Routine Inspection', 'Surprise Inspection', 'Priority Inspection', 'Compliance Audit']
const INSPECTION_STATUS = ['Pending', 'In Progress', 'Completed', 'Overdue']

export const INSPECTIONS = Array.from({ length: 30 }).map((_, i) => {
  const project = pick(PROJECTS)
  const inspector = pick(INSPECTORS)
  const status = pick(INSPECTION_STATUS)
  return {
    id: `INSP-${String(5000 + i)}`,
    projectId: project.id,
    projectName: project.name,
    inspector: inspector.name,
    inspectorId: inspector.id,
    type: pick(INSPECTION_TYPES),
    date: `${randInt(1, 28)} ${pick(['Jun', 'Jul', 'Aug', 'Sep'])} 2026`,
    priority: pick(['Low', 'Medium', 'High']),
    risk: project.risk,
    status,
    complianceScore: status === 'Completed' ? randInt(58, 98) : null,
    location: `${project.district}, ${project.state}`,
  }
})

export const CAMERA_LOCATIONS = ['Main Entrance', 'Activity Room', 'Office', 'Dormitory', 'Kitchen', 'Common Hall', 'Parking Gate', 'Corridor']

export const CCTV_FEEDS = PROJECTS.slice(0, 14).flatMap((p) =>
  Array.from({ length: Math.min(4, p.cctvTotal) }).map((_, idx) => ({
    id: `${p.id}-CAM${idx + 1}`,
    projectId: p.id,
    projectName: p.name,
    name: `Camera 0${idx + 1}`,
    location: CAMERA_LOCATIONS[idx % CAMERA_LOCATIONS.length],
    status: idx < p.cctvOnline ? 'ONLINE' : 'OFFLINE',
    lastActive: idx < p.cctvOnline ? 'Live now' : `${randInt(1, 12)}h ago`,
  }))
)

export const ANOMALY_TYPES = [
  { type: 'Attendance Mismatch', severity: 'HIGH', explanation: 'Reported attendance deviates significantly from CCTV-derived headcount for 3 consecutive days.', action: 'Trigger surprise inspection and request manual register verification.' },
  { type: 'Duplicate Evidence', severity: 'MEDIUM', explanation: 'Two evidence photos submitted for different dates share matching perceptual hash signatures.', action: 'Flag evidence for inspector review before approval.' },
  { type: 'Unusual Attendance Pattern', severity: 'HIGH', explanation: 'Attendance drops sharply every Friday over the last 4 weeks, inconsistent with historical baseline.', action: 'Schedule a priority inspection for the next reporting Friday.' },
  { type: 'Repetitive Reporting Pattern', severity: 'LOW', explanation: 'Inspection remarks text is highly similar (92%) across the last three submitted reports.', action: 'Request additional narrative detail from inspector on next visit.' },
  { type: 'CCTV Downtime Spike', severity: 'MEDIUM', explanation: 'Camera offline duration increased by 340% compared to the monthly average.', action: 'Verify camera health and request maintenance confirmation from project.' },
  { type: 'Location Mismatch', severity: 'HIGH', explanation: 'GPS coordinates of submitted evidence are 3.8 km away from the registered project address.', action: 'Request re-verification of evidence location with inspector.' },
]

export const ANOMALIES = Array.from({ length: 16 }).map((_, i) => {
  const a = pick(ANOMALY_TYPES)
  const project = pick(PROJECTS)
  return {
    id: `ANM-${String(9000 + i)}`,
    ...a,
    confidence: randInt(72, 98),
    projectId: project.id,
    projectName: project.name,
    detectedAt: `${randInt(1, 28)} Sep 2026, ${randInt(0, 23)}:${String(randInt(0, 59)).padStart(2, '0')}`,
    reviewed: rand() > 0.6,
  }
})

const NOTIF_TYPES = [
  { type: 'High Risk Alert', priority: 'High' },
  { type: 'Attendance Anomaly', priority: 'High' },
  { type: 'CCTV Offline', priority: 'Medium' },
  { type: 'Inspection Pending', priority: 'Medium' },
  { type: 'Location Mismatch', priority: 'High' },
  { type: 'Duplicate Evidence', priority: 'Medium' },
  { type: 'Report Pending', priority: 'Low' },
]

export const NOTIFICATIONS = Array.from({ length: 18 }).map((_, i) => {
  const n = pick(NOTIF_TYPES)
  const project = pick(PROJECTS)
  return {
    id: `NTF-${String(3000 + i)}`,
    ...n,
    projectName: project.name,
    message: `${n.type} detected for ${project.name} (${project.id}).`,
    time: `${randInt(1, 59)} min ago`,
    read: rand() > 0.5,
  }
})

export const AUDIT_LOGS = Array.from({ length: 24 }).map((_, i) => {
  const actor = pick(INSPECTORS)
  const actions = [
    { action: 'Uploaded evidence', module: 'Evidence Capture' },
    { action: 'Submitted inspection', module: 'Inspections' },
    { action: 'Viewed report', module: 'Reports' },
    { action: 'Approved report', module: 'Reports' },
    { action: 'Started surprise video call', module: 'Surprise VC' },
    { action: 'Updated project status', module: 'Projects' },
    { action: 'Marked anomaly reviewed', module: 'AI Anomalies' },
    { action: 'Reset user password', module: 'User Management' },
  ]
  const a = pick(actions)
  return {
    id: `LOG-${String(70000 + i)}`,
    user: actor.name,
    ...a,
    date: `0${randInt(1, 9)} Sep 2026`,
    time: `${String(randInt(8, 18)).padStart(2, '0')}:${String(randInt(0, 59)).padStart(2, '0')} ${randInt(8,18) < 12 ? 'AM' : 'PM'}`,
    status: pick(['Success', 'Success', 'Success', 'Failed']),
  }
})

export const USERS = Array.from({ length: 16 }).map((_, i) => {
  const st = pick(STATES)
  return {
    id: `USR-${String(400 + i)}`,
    name: fullName(),
    role: pick(['DoSJE Admin', 'Department Official', 'PMU / Inspector', 'NGO / Institute', 'State Authority', 'District Authority']),
    department: pick(['Monitoring Cell', 'PMU', 'IT Cell', 'Field Operations', 'Compliance Wing']),
    state: st.state,
    district: pick(st.districts),
    status: rand() > 0.15 ? 'Active' : 'Disabled',
    lastActive: `${randInt(1, 12)}h ago`,
  }
})

export const ROLES = [
  'DoSJE Admin',
  'Department Official',
  'PMU / Inspector',
  'NGO / Institute',
  'State Authority',
  'District Authority',
]

export const COMPLIANCE_BREAKDOWN = [
  { name: 'Infrastructure', score: 90 },
  { name: 'Staff', score: 95 },
  { name: 'Beneficiary Service', score: 82 },
  { name: 'Documentation', score: 88 },
  { name: 'Attendance', score: 76 },
]

export const ATTENDANCE_TREND = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((m) => ({
  month: m,
  expected: randInt(320, 400),
  actual: randInt(260, 380),
}))

export const PROJECT_GROWTH = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((m, i) => ({
  month: m,
  projects: 14 + i * 2 + randInt(0, 2),
}))

export const INSPECTION_TREND = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((m) => ({
  month: m,
  completed: randInt(20, 55),
  pending: randInt(4, 20),
}))

export const STATE_WISE_PROJECTS = STATES.map((s) => ({
  state: s.state,
  count: PROJECTS.filter((p) => p.state === s.state).length || randInt(2, 6),
}))

export const RISK_DISTRIBUTION = RISK_LEVELS.map((r) => ({
  name: r,
  value: PROJECTS.filter((p) => p.risk === r).length,
}))

export const REPORTS = Array.from({ length: 14 }).map((_, i) => {
  const insp = pick(INSPECTIONS)
  return {
    id: `RPT-${String(8000 + i)}`,
    type: pick(['Inspection Report', 'Compliance Report', 'Risk Report', 'Attendance Report']),
    projectName: insp.projectName,
    inspector: insp.inspector,
    date: insp.date,
    gps: `${(20 + rand() * 12).toFixed(4)}, ${(72 + rand() * 15).toFixed(4)}`,
    complianceScore: randInt(55, 98),
    riskScore: randInt(10, 90),
    approval: pick(['Approved', 'Pending Approval', 'Rejected']),
  }
})

export const FAQS = [
  { q: 'What is the DoSJE Smart Monitoring System?', a: 'A centralized platform for the Department of Social Justice & Empowerment to monitor funded projects, run surprise inspections, and track compliance in near real time.' },
  { q: 'Is the data on this demo real?', a: 'No. Every project, inspection, camera feed, and AI result on this prototype is simulated demo data for presentation purposes only.' },
  { q: 'How is a surprise inspection assigned?', a: 'The Random Inspection Assignment engine matches an available inspector to a project using workload, distance, and conflict-of-interest checks.' },
  { q: 'Can inspectors work without internet access?', a: 'Yes — Offline Inspection Mode lets inspectors save checklists, evidence, and GPS locally and sync once connectivity is restored.' },
  { q: 'How are AI anomalies verified?', a: 'All AI-flagged anomalies are clearly marked as requiring human verification before any action is taken against a project.' },
]
