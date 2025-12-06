const columnService = require('../services/columnService');
const Column = require('../models/columnModel');
const Board = require('../models/boardModel');
const Task = require('../models/taskModel');

// Modellek mockolása
jest.mock('../models/columnModel');
jest.mock('../models/boardModel');
jest.mock('../models/taskModel');

describe('ColumnService Tesztek', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // 1. teszteset: Oszlop létrehozása
    describe('createColumn', () => {
        it('should create a column and add it to the board', async () => {
            // ARRANGE
            const title = 'Teendők';
            const boardId = 'board_123';
            const order = 0;

            const mockNewColumn = { 
                _id: 'col_new', 
                title, 
                board: boardId, 
                order,
                tasks: [] 
            };

            Column.create.mockResolvedValue(mockNewColumn);
            Board.findByIdAndUpdate.mockResolvedValue(true);

            // ACT
            const result = await columnService.createColumn(title, boardId, order);

            // ASSERT
            expect(Column.create).toHaveBeenCalledWith({
                title,
                board: boardId,
                order: 0,
                tasks: []
            });

            expect(Board.findByIdAndUpdate).toHaveBeenCalledWith(
                boardId,
                { $push: { columns: 'col_new' } }
            );

            expect(result).toEqual(mockNewColumn);
        });
    });

    // 2. teszteset: Oszlop törlése
    describe('deleteColumn', () => {
        it('should delete column, remove from board, and delete associated tasks', async () => {
            // ARRANGE
            const columnId = 'col_delete';
            const boardId = 'board_123';

            const mockColumn = { _id: columnId, board: boardId };

            Column.findById.mockResolvedValue(mockColumn);
            Task.deleteMany.mockResolvedValue({ deletedCount: 5 });
            Board.findByIdAndUpdate.mockResolvedValue(true);
            Column.findByIdAndDelete.mockResolvedValue(true);

            // ACT
            await columnService.deleteColumn(columnId);

            // ASSERT
            expect(Column.findById).toHaveBeenCalledWith(columnId);

            expect(Task.deleteMany).toHaveBeenCalledWith({ column: columnId });

            expect(Board.findByIdAndUpdate).toHaveBeenCalledWith(
                boardId,
                { $pull: { columns: columnId } }
            );

            expect(Column.findByIdAndDelete).toHaveBeenCalledWith(columnId);
        });

        it('should throw error if column not found', async () => {
            Column.findById.mockResolvedValue(null);

            await expect(columnService.deleteColumn('invalid_id'))
                .rejects
                .toThrow('Column not found');
        });
    });

    // 3. teszteset: Oszlop frissítése
    describe('updateColumn', () => {
        it('should update column title', async () => {
            // ARRANGE
            const columnId = 'col_update';
            const updateData = { title: 'Új Cím' };
            const mockUpdatedColumn = { _id: columnId, title: 'Új Cím' };

            Column.findByIdAndUpdate.mockResolvedValue(mockUpdatedColumn);

            // ACT
            const result = await columnService.updateColumn(columnId, updateData);

            // ASSERT
            expect(Column.findByIdAndUpdate).toHaveBeenCalledWith(
                columnId,
                updateData,
                { new: true }
            );
            expect(result).toEqual(mockUpdatedColumn);
        });
    });
});
