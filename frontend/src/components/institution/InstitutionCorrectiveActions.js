import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
const InstitutionCorrectiveActions = () => {
  const { user } = useAuth();
  const [actions, setActions] = useState([]);
  const [violations, setViolations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ violationId: '', description: '', evidence: '' });
  const institutionId = user?.institutionId || 'PLACEHOLDER';
  useEffect(() => {
    Promise.all([
      api.get(`/institution/corrective-actions?institutionId=${institutionId}`),
      api.get(`/institution/violations?institutionId=${institutionId}`),
    ]).then(([a, v]) => { setActions(a.data); setViolations(v.data.filter(v => v.status === 'OPEN')); }).catch(console.error);
  }, [institutionId]);
  const submit = async (e) => {
    e.preventDefault();
    try { await api.post(`/institution/corrective-actions?institutionId=${institutionId}`, form); alert('Submitted'); setShowForm(false); const res = await api.get(`/institution/corrective-actions?institutionId=${institutionId}`); setActions(res.data); } catch(e) { alert(e.response?.data?.message); }
  };
  return <div><h2>Corrective Actions</h2><button onClick={() => setShowForm(!showForm)}>Submit New</button>{showForm && <form onSubmit={submit}><select value={form.violationId} onChange={e => setForm({...form, violationId: e.target.value})} required><option value="">Select Violation</option>{violations.map(v => <option key={v._id} value={v._id}>{v.category}</option>)}</select><textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required /><input placeholder="Evidence URL" value={form.evidence} onChange={e => setForm({...form, evidence: e.target.value})} /><button type="submit">Submit</button></form>}<table><thead><tr><th>Violation</th><th>Description</th><th>Status</th></tr></thead><tbody>{actions.map(a => <tr key={a._id}><td>{a.violationId?.category}</td><td>{a.description}</td><td>{a.status}</td></tr>)}</tbody></table></div>;
};
export default InstitutionCorrectiveActions;
