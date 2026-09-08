const express = require('express');
const { getInstitutions, getInstitutionById, createInstitution, updateInstitution, deleteInstitution } = require('../controllers/institutionController');
const { protect } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const router = express.Router();
router.use(protect);
router.route('/').get(getInstitutions).post(roleMiddleware('ADMIN'), createInstitution);
router.route('/:id').get(getInstitutionById).put(roleMiddleware('ADMIN'), updateInstitution).delete(roleMiddleware('ADMIN'), deleteInstitution);
module.exports = router;
