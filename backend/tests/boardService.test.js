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

});