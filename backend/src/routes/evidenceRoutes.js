const express = require('express');
const { uploadEvidence, getEvidence } = require('../controllers/evidenceController');
const { protect } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const upload = require('../middleware/upload');
const router = express.Router({ mergeParams: true });
router.use(protect);
router.route('/').get(getEvidence).post(roleMiddleware('INSPECTOR'), upload.single('file'), uploadEvidence);
module.exports = router;
