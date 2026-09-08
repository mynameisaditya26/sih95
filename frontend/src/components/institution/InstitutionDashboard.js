import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
const InstitutionDashboard = () => {
  const { user } = useAuth();
  const [institution, setInstitution] = useState(null);
  const [inspections, setInspections] = useState([]);
  const [violations, setViolations] = useState([]);
  const [actions, setActions] = useState([]);
  const institutionId = user?.institutionId || 'PLACEHOLDER';
  useEffect(() => {
    Promise.all([
      api.get(`/institution/profile?institutionId=${institutionId}`),
      api.get(`/institution/inspections?institutionId=${institutionId}`),
      api.get(`/institution/violations?institutionId=${institutionId}`),
      api.get(`/institution/corrective-actions?institutionId=${institutionId}`),
    ]).then(([p, i, v, a]) => { setInstitution(p.data); setInspections(i.data); setViolations(v.data); setActions(a.data); }).catch(console.error);
  }, [institutionId]);
  if (!institution) return <div>Loading...</div>;
  const openViolations = violations.filter(v => v.status !== 'RESOLVED' && v.status !== 'ESCALATED');
  return <div><h2>{institution.name}</h2><div className="stats-grid"><div className="stat-card"><h3>Compliance</h3><p>{institution.complianceScore}</p></div><div className="stat-card"><h3>Risk</h3><p>{institution.riskScore}</p></div><div className="stat-card"><h3>Open Violations</h3><p>{openViolations.length}</p></div></div></div>;
};
export default InstitutionDashboard;
