const express = require('express');
const { getCorrectiveActions, createCorrectiveAction, reviewCorrectiveAction } = require('../controllers/correctiveActionController');
const { protect } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const router = express.Router();
router.use(protect);
router.route('/').get(getCorrectiveActions).post(roleMiddleware('INSTITUTION'), createCorrectiveAction);
router.put('/:id/review', roleMiddleware('ADMIN'), reviewCorrectiveAction);
module.exports = router;
