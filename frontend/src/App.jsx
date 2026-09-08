import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import ProtectedRoute from './routes/ProtectedRoute'

import Landing from './pages/Landing'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

import AdminDashboard from './pages/AdminDashboard'
import ProjectManagement from './pages/ProjectManagement'
import ProjectDetails from './pages/ProjectDetails'
import LiveMap from './pages/LiveMap'
import CctvMonitoring from './pages/CctvMonitoring'
import SurpriseVideoCall from './pages/SurpriseVideoCall'
import InspectionManagement from './pages/InspectionManagement'
import RandomAssignment from './pages/RandomAssignment'
import InspectorDashboard from './pages/InspectorDashboard'
import InspectionDetails from './pages/InspectionDetails'
import InspectionChecklist from './pages/InspectionChecklist'
import EvidenceCapture from './pages/EvidenceCapture'
import OfflineInspectionMode from './pages/OfflineInspectionMode'
import InspectionHistory from './pages/InspectionHistory'
import AttendanceAnalytics from './pages/AttendanceAnalytics'
import AiAnomalyCenter from './pages/AiAnomalyCenter'
import RiskManagement from './pages/RiskManagement'
import ComplianceDashboard from './pages/ComplianceDashboard'
import DigitalReports from './pages/DigitalReports'
import Notifications from './pages/Notifications'
import NgoDashboard from './pages/NgoDashboard'
import RegionalDashboard from './pages/RegionalDashboard'
import UserManagement from './pages/UserManagement'
import AuditLogs from './pages/AuditLogs'
import SettingsPage from './pages/Settings'
import HelpSupport from './pages/HelpSupport'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      <Route path="/app" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="projects" element={<ProjectManagement />} />
        <Route path="projects/:projectId" element={<ProjectDetails />} />
        <Route path="live-map" element={<LiveMap />} />
        <Route path="cctv" element={<CctvMonitoring />} />
        <Route path="surprise-vc" element={<SurpriseVideoCall />} />
        <Route path="inspections" element={<InspectionManagement />} />
        <Route path="inspections/:inspectionId" element={<InspectionDetails />} />
        <Route path="inspections/:inspectionId/checklist" element={<InspectionChecklist />} />
        <Route path="random-assignment" element={<RandomAssignment />} />
        <Route path="inspector-dashboard" element={<InspectorDashboard />} />
        <Route path="evidence-capture" element={<EvidenceCapture />} />
        <Route path="offline-mode" element={<OfflineInspectionMode />} />
        <Route path="inspection-history" element={<InspectionHistory />} />
        <Route path="attendance" element={<AttendanceAnalytics />} />
        <Route path="ai-anomalies" element={<AiAnomalyCenter />} />
        <Route path="risk-management" element={<RiskManagement />} />
        <Route path="compliance" element={<ComplianceDashboard />} />
        <Route path="reports" element={<DigitalReports />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="ngo-dashboard" element={<NgoDashboard />} />
        <Route path="regional-dashboard" element={<RegionalDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="audit-logs" element={<AuditLogs />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="help" element={<HelpSupport />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
