import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
const InstitutionViolations = () => {
  const { user } = useAuth();
  const [violations, setViolations] = useState([]);
  const institutionId = user?.institutionId || 'PLACEHOLDER';
  useEffect(() => { api.get(`/institution/violations?institutionId=${institutionId}`).then(res => setViolations(res.data)).catch(console.error); }, [institutionId]);
  const resolve = async (id) => {
    if (!window.confirm('Mark as resolved?')) return;
    try { await api.post(`/api/violations/${id}/resolve`, { institutionId }); const res = await api.get(`/institution/violations?institutionId=${institutionId}`); setViolations(res.data); } catch(e) { alert(e.response?.data?.message); }
  };
  return <div><h2>Violations</h2><table><thead><tr><th>Category</th><th>Severity</th><th>Description</th><th>Status</th><th>Action</th></tr></thead><tbody>{violations.map(v => <tr key={v._id}><td>{v.category}</td><td>{v.severity}</td><td>{v.description}</td><td>{v.status}</td><td>{v.status === 'OPEN' && <button onClick={() => resolve(v._id)}>Resolve</button>}</td></tr>)}</tbody></table></div>;
};
export default InstitutionViolations;
