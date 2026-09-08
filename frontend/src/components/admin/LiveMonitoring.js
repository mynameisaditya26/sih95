import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import './LiveMonitoring.css';
const LiveMonitoring = () => {
  const [cameras, setCameras] = useState([]);
  useEffect(() => { api.get('/cctv').then(res => setCameras(res.data)).catch(console.error); }, []);
  return <div className="live-monitoring"><h2>Live Monitoring (Demo)</h2><p className="demo-note">Simulated feeds for demonstration</p><div className="camera-grid">{cameras.map(cam => <div key={cam._id} className="camera-card"><div className="camera-header"><span className="camera-name">{cam.name}</span><span className={`camera-status ${cam.status}`}>{cam.status}</span></div><div className="camera-feed"><div className="video-placeholder"><span>📹 Demo</span><span>{cam.name}</span></div></div><div className="camera-footer">{cam.institutionId?.name}</div></div>)}</div></div>;
};
export default LiveMonitoring;
