const express = require('express');
const { getInspectors, getInspectorById, createInspector, updateInspector, deleteInspector } = require('../controllers/inspectorController');
const { protect } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const router = express.Router();
router.use(protect);
router.route('/').get(roleMiddleware('ADMIN'), getInspectors).post(roleMiddleware('ADMIN'), createInspector);
router.route('/:id').get(getInspectorById).put(updateInspector).delete(roleMiddleware('ADMIN'), deleteInspector);
module.exports = router;
