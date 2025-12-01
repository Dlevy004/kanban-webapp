const boardService = require('../services/boardService');
const Board = require('../models/boardModel');
const Column = require('../models/columnModel');
const Task = require('../models/taskModel');

// mock adatok
jest.mock('../models/boardModel');
jest.mock('../models/columnModel');
jest.mock('../models/taskModel');

describe('BoardService Tesztek', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // 1. teszteset: létrehozás
    describe('createBoard', () => {
        it('should create a new board successfully', async () => {
            // arrange
            const title = 'Új Projekt Tábla';
            const ownerId = 'user123';
            const mockBoard = { _id: 'board1', title, owner: ownerId, columns: [] };

            Board.create.mockResolvedValue(mockBoard);

            // act
            const result = await boardService.createBoard(title, ownerId);

            // assert
            expect(Board.create).toHaveBeenCalledWith({
                title,
                owner: ownerId,
                columns: []
            });
            expect(result).toEqual(mockBoard);
        });
    });

    // 2. teszteset: lekérés
    describe('readByIdBoard', () => {
        it('should return board with populated columns and tasks', async () => {
            // arrange
            const boardId = 'board1';
            const mockBoard = { _id: boardId, title: 'Populated Board' };

            const mockPopulate = jest.fn().mockResolvedValue(mockBoard);
            Board.findById.mockReturnValue({ populate: mockPopulate });

            // act
            const result = await boardService.readByIdBoard(boardId);

            // assert
            expect(Board.findById).toHaveBeenCalledWith(boardId);

            expect(mockPopulate).toHaveBeenCalledWith(expect.objectContaining({
                path: 'columns',
                populate: { path: 'tasks', model: 'Task' }
            }));
            expect(result).toEqual(mockBoard);
        });

        it('should throw error if board not found', async () => {
            // arrange
            const mockPopulate = jest.fn().mockResolvedValue(null);
            Board.findById.mockReturnValue({ populate: mockPopulate });

            // act & assert
            await expect(boardService.readByIdBoard('badId'))
                .rejects
                .toThrow('Board not found.');
        });
    });

});