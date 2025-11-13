const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');  
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, boardController.handleCreateBoard);
router.get('/:id', protect, boardController.handleReadByIdBoard);
router.get('/', protect, boardController.handleReadAllBoards);
router.put('/:id', protect, boardController.handleUpdateBoard);
router.delete('/:id', protect, boardController.handleDeleteBoard);

module.exports = router;