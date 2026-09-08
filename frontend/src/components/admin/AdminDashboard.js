import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useSocket } from '../../context/SocketContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './AdminDashboard.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const { socket } = useSocket();

  useEffect(() => {
    fetchData();
    if (socket) {
      const handleUpdate = () => fetchData();
      socket.on('inspection_started', handleUpdate);
      socket.on('inspection_submitted', handleUpdate);
      socket.on('evidence_uploaded', handleUpdate);
      socket.on('violation_detected', handleUpdate);
      return () => {
        socket.off('inspection_started', handleUpdate);
        socket.off('inspection_submitted', handleUpdate);
        socket.off('evidence_uploaded', handleUpdate);
        socket.off('violation_detected', handleUpdate);
      };
    }
  }, [socket]);

  const fetchData = async () => {
    try {
      const [statsRes, trendsRes] = await Promise.all([
        api.get('/admin/dashboard'),
        api.get('/admin/trends'),
      ]);
      setStats(statsRes.data);
      setTrends(trendsRes.data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  if (loading) return <div>Loading...</div>;
  if (!stats) return <div>No data</div>;

  const { stats: metrics, recentInspections, highRiskInst } = stats;
  const COLORS = ['#0088FE','#00C49F','#FFBB28','#FF8042'];
  const violationData = [
    { name: 'Safety', value: 12 },
    { name: 'Infrastructure', value: 8 },
    { name: 'Operations', value: 5 },
    { name: 'Compliance', value: 3 },
  ];

  return <div className="admin-dashboard">
    <h2>Admin Dashboard</h2>
    <div className="stats-grid">
      <div className="stat-card"><h3>Total Institutions</h3><p className="stat-number">{metrics.totalInstitutions}</p></div>
      <div className="stat-card"><h3>Total Inspectors</h3><p className="stat-number">{metrics.totalInspectors}</p></div>
      <div className="stat-card"><h3>Today's Inspections</h3><p className="stat-number">{metrics.todayInspections}</p></div>
      <div className="stat-card"><h3>Ongoing</h3><p className="stat-number">{metrics.ongoingInspections}</p></div>
      <div className="stat-card"><h3>Pending Reviews</h3><p className="stat-number">{metrics.pendingReviews}</p></div>
      <div className="stat-card"><h3>High Risk Institutions</h3><p className="stat-number">{metrics.highRiskInstitutions}</p></div>
      <div className="stat-card"><h3>Critical Violations</h3><p className="stat-number">{metrics.criticalViolations}</p></div>
    </div>
    <div className="charts-row">
      <div className="chart-box"><h3>Inspection Trends</h3><ResponsiveContainer width="100%" height={300}><LineChart data={trends}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="_id"/><YAxis/><Tooltip/><Legend/><Line type="monotone" dataKey="count" stroke="#8884d8"/></LineChart></ResponsiveContainer></div>
      <div className="chart-box"><h3>Violation Categories</h3><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={violationData} cx="50%" cy="50%" labelLine={false} label={({name,percent}) => `${name}: ${(percent*100).toFixed(0)}%`} outerRadius={80} dataKey="value">{violationData.map((_,i) => <Cell key={i} fill={COLORS[i % COLORS.length]}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer></div>
    </div>
    <div className="map-section"><h3>High Risk Locations</h3><MapContainer center={[20.5937,78.9629]} zoom={5} style={{height:'400px',width:'100%'}}><TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>{highRiskInst.map(inst => <Marker key={inst._id} position={[inst.latitude, inst.longitude]}><Popup><strong>{inst.name}</strong><br/>Risk: {inst.riskScore}<br/>Compliance: {inst.complianceScore}</Popup></Marker>)}</MapContainer></div>
    <div className="recent-inspections"><h3>Recent Inspections</h3><table className="table"><thead><tr><th>Institution</th><th>Inspector</th><th>Status</th><th>Type</th><th>Date</th></tr></thead><tbody>{recentInspections.map(insp => <tr key={insp._id}><td>{insp.institutionId?.name || 'N/A'}</td><td>{insp.inspectorId?.userId?.name || 'N/A'}</td><td><span className={`status-badge ${insp.status.toLowerCase()}`}>{insp.status}</span></td><td>{insp.type}</td><td>{new Date(insp.createdAt).toLocaleDateString()}</td></tr>)}</tbody></table></div>
  </div>;
};
export default AdminDashboard;
