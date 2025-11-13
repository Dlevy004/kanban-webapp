const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

router.post('/', boardController.handleCreateBoard);
router.get('/:id', boardController.handleReadByIdBoard);
router.get('/', boardController.handleReadAllBoards);
router.put('/:id', boardController.handleUpdateBoard);
router.delete('/:id', boardController.handleDeleteBoard);

module.exports = router;