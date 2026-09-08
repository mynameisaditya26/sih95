const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Institution = require('../models/Institution');
const Inspector = require('../models/Inspector');
const Inspection = require('../models/Inspection');
const Evidence = require('../models/Evidence');
const Violation = require('../models/Violation');
const Camera = require('../models/Camera');
const bcrypt = require('bcrypt');

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    await Promise.all([
      User.deleteMany({}),
      Institution.deleteMany({}),
      Inspector.deleteMany({}),
      Inspection.deleteMany({}),
      Evidence.deleteMany({}),
      Violation.deleteMany({}),
      Camera.deleteMany({}),
    ]);
    console.log('Cleared existing data');

    // Admin
    await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'ADMIN',
      phone: '9999999999',
    });

    // Institutions (20)
    const institutions = [];
    const categories = ['SCHOOL','HOSPITAL','GOVERNMENT_OFFICE','PUBLIC_SECTOR','PRIVATE_SECTOR'];
    const cities = ['Delhi','Mumbai','Bangalore','Chennai','Kolkata'];
    for (let i=0; i<20; i++) {
      const inst = await Institution.create({
        name: `Institution ${i+1}`,
        registrationNumber: `REG${String(i+1).padStart(5,'0')}`,
        category: categories[i % categories.length],
        address: `${i+1} Main St, ${cities[i % cities.length]}`,
        city: cities[i % cities.length],
        state: 'State',
        latitude: 20 + Math.random() * 10,
        longitude: 70 + Math.random() * 10,
        riskScore: Math.floor(Math.random() * 100),
        complianceScore: Math.floor(Math.random() * 100),
        status: 'ACTIVE',
      });
      institutions.push(inst);
    }

    // Inspectors
    for (let i=0; i<10; i++) {
      const user = await User.create({
        name: `Inspector ${i+1}`,
        email: `inspector${i+1}@example.com`,
        password: 'inspector123',
        role: 'INSPECTOR',
        phone: `99999999${String(i).padStart(2,'0')}`,
      });
      await Inspector.create({
        userId: user._id,
        employeeId: `EMP${String(i+1).padStart(4,'0')}`,
        department: ['Health','Safety','Compliance','Infrastructure'][i % 4],
        currentLatitude: 20 + Math.random() * 10,
        currentLongitude: 70 + Math.random() * 10,
        availability: Math.random() > 0.3,
        workload: Math.floor(Math.random() * 3),
      });
    }

    // Institution user
    await User.create({
      name: 'Institution User',
      email: 'institution@example.com',
      password: 'institution123',
      role: 'INSTITUTION',
      phone: '8888888888',
      institutionId: institutions[0]._id,
    });

    // Inspections
    const inspectorIds = await Inspector.find().select('_id');
    const institutionIds = institutions.map(i => i._id);
    const statuses = ['APPROVED','REJECTED','CLOSED','SUBMITTED','IN_PROGRESS'];
    const types = ['SURPRISE','SCHEDULED','FOLLOW_UP'];
    for (let i=0; i<50; i++) {
      await Inspection.create({
        institutionId: institutionIds[Math.floor(Math.random() * institutionIds.length)],
        inspectorId: inspectorIds[Math.floor(Math.random() * inspectorIds.length)]._id,
        type: types[Math.floor(Math.random() * types.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        scheduledAt: new Date(Date.now() - Math.random() * 30*24*60*60*1000),
        gpsVerified: Math.random() > 0.2,
        complianceScore: Math.floor(Math.random() * 100),
        riskScore: Math.floor(Math.random() * 100),
        checklist: [
          { question: 'Is facility clean?', category: 'Infrastructure', answer: 'PASS', evidenceRequired: true },
          { question: 'Safety protocols followed?', category: 'Safety', answer: 'PASS', evidenceRequired: true },
        ],
      });
    }

    // Violations
    const vCategories = ['Safety','Infrastructure','Operations','Compliance','Staff'];
    const severities = ['LOW','MEDIUM','HIGH','CRITICAL'];
    for (let i=0; i<30; i++) {
      await Violation.create({
        inspectionId: new mongoose.Types.ObjectId(),
        institutionId: institutionIds[Math.floor(Math.random() * institutionIds.length)],
        category: vCategories[Math.floor(Math.random() * vCategories.length)],
        severity: severities[Math.floor(Math.random() * severities.length)],
        description: `Violation ${i+1}`,
        status: ['OPEN','UNDER_REVIEW','ACTION_REQUIRED','RESOLVED','ESCALATED'][Math.floor(Math.random() * 5)],
      });
    }

    // Cameras
    for (let i=0; i<10; i++) {
      await Camera.create({
        name: `Camera ${i+1}`,
        institutionId: institutionIds[Math.floor(Math.random() * institutionIds.length)],
        status: ['online','offline','maintenance'][Math.floor(Math.random() * 3)],
        isDemo: true,
        lastSeen: new Date(),
      });
    }

    console.log('Seed data created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
