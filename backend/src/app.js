const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { errorHandler } = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const institutionRoutes = require('./routes/institutionRoutes');
const inspectorRoutes = require('./routes/inspectorRoutes');
const inspectionRoutes = require('./routes/inspectionRoutes');
const evidenceRoutes = require('./routes/evidenceRoutes');
const violationRoutes = require('./routes/violationRoutes');
const correctiveActionRoutes = require('./routes/correctiveActionRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const cctvRoutes = require('./routes/cctvRoutes');
const adminRoutes = require('./routes/adminRoutes');
const institutionPortalRoutes = require('./routes/institutionPortalRoutes');
const path = require('path');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/institutions', institutionRoutes);
app.use('/api/inspectors', inspectorRoutes);
app.use('/api/inspections', inspectionRoutes);
app.use('/api/evidence', evidenceRoutes);
app.use('/api/violations', violationRoutes);
app.use('/api/corrective-actions', correctiveActionRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/cctv', cctvRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/institution', institutionPortalRoutes);

app.get('/', (req, res) => res.json({ message: 'SIH Inspection API is running' }));
app.use(errorHandler);
module.exports = app;
