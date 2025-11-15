const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, taskController.handleCreateTask);

router.get('/:id', authMiddleware, taskController.handleReadTaskById);

router.get('/column/:columnId', authMiddleware, taskController.handleReadTasksByColumn);

router.get('/board/:boardId', authMiddleware, taskController.handleReadTasksByBoard);

router.put('/:id', authMiddleware, taskController.handleUpdateTask);

router.delete('/:id', authMiddleware, taskController.handleDeleteTask);

module.exports = router;
