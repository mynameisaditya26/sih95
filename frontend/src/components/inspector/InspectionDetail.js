import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axios';
const InspectionDetail = () => {
  const { id } = useParams();
  const [inspection, setInspection] = useState(null);
  const [gps, setGps] = useState({ latitude: '', longitude: '' });
  useEffect(() => { api.get(`/inspections/${id}`).then(res => setInspection(res.data)).catch(console.error); }, [id]);
  const verifyGPS = async () => { try { const res = await api.post(`/inspections/${id}/gps`, gps); alert(res.data.message); setInspection(prev => ({...prev, gpsVerified: res.data.verified})); } catch(e) { alert(e.response?.data?.message); } };
  const startInspection = async () => { try { await api.post(`/inspections/${id}/start`); alert('Started'); setInspection(prev => ({...prev, status: 'IN_PROGRESS'})); } catch(e) { alert(e.response?.data?.message); } };
  if (!inspection) return <div>Loading...</div>;
  return <div>
    <h2>Inspection Details</h2>
    <p>Institution: {inspection.institutionId?.name}</p>
    <p>Status: {inspection.status}</p>
    <div><h3>GPS</h3><input placeholder="Lat" value={gps.latitude} onChange={e => setGps({...gps, latitude: e.target.value})} /><input placeholder="Lng" value={gps.longitude} onChange={e => setGps({...gps, longitude: e.target.value})} /><button onClick={verifyGPS}>Verify GPS</button></div>
    {inspection.gpsVerified && inspection.status === 'ASSIGNED' && <button onClick={startInspection}>Start</button>}
  </div>;
};
export default InspectionDetail;
