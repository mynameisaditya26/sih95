import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { NotificationProvider } from './context/NotificationContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Header from './components/common/Header';
import Login from './pages/Login';
import InspectorDashboard from './components/inspector/InspectorDashboard';
import InspectionDetail from './components/inspector/InspectionDetail';
import AdminDashboard from './components/admin/AdminDashboard';
import LiveMonitoring from './components/admin/LiveMonitoring';
import InstitutionDashboard from './components/institution/InstitutionDashboard';
import InstitutionViolations from './components/institution/InstitutionViolations';
import InstitutionCorrectiveActions from './components/institution/InstitutionCorrectiveActions';
import './App.css';
const AppContent = () => {
  const { user } = useAuth();
  return <>
    {user && <Header />}
    <div className="main-content">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><InspectorDashboard /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><InspectorDashboard /></ProtectedRoute>} />
        <Route path="/inspector/inspection/:id" element={<ProtectedRoute allowedRoles={['INSPECTOR']}><InspectionDetail /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/live-monitoring" element={<ProtectedRoute allowedRoles={['ADMIN']}><LiveMonitoring /></ProtectedRoute>} />
        <Route path="/institution/dashboard" element={<ProtectedRoute allowedRoles={['INSTITUTION']}><InstitutionDashboard /></ProtectedRoute>} />
        <Route path="/institution/violations" element={<ProtectedRoute allowedRoles={['INSTITUTION']}><InstitutionViolations /></ProtectedRoute>} />
        <Route path="/institution/corrective-actions" element={<ProtectedRoute allowedRoles={['INSTITUTION']}><InstitutionCorrectiveActions /></ProtectedRoute>} />
      </Routes>
    </div>
  </>;
};
const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <SocketProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </SocketProvider>
    </AuthProvider>
  </BrowserRouter>
);
export default App;
