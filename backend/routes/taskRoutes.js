const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, taskController.handleCreateTask);

router.get('/column/:columnId', protect, taskController.handleReadTasksByColumn);

router.get('/board/:boardId', protect, taskController.handleReadTasksByBoard);

router.get('/:id', protect, taskController.handleReadTaskById);

router.put('/:id', protect, taskController.handleUpdateTask);

router.delete('/:id', protect, taskController.handleDeleteTask);

module.exports = router;
