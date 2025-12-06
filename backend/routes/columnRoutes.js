const express = require('express');
const router = express.Router();

const columnController = require('../controllers/columnController'); 
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, columnController.handleCreateColumn);
router.delete('/:id', protect, columnController.handleDeleteColumn);
router.put('/:id', protect, columnController.handleUpdateColumn);

module.exports = router;
