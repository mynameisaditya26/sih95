import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Link } from 'react-router-dom';
const InspectorDashboard = () => {
  const [inspections, setInspections] = useState([]);
  useEffect(() => { api.get('/inspections').then(res => setInspections(res.data)).catch(console.error); }, []);
  return <div><h2>My Inspections</h2>{inspections.map(insp => <div key={insp._id}><Link to={`/inspector/inspection/${insp._id}`}>{insp.institutionId?.name} - {insp.status}</Link></div>)}</div>;
};
export default InspectorDashboard;
