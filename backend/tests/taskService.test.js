const taskService = require('../services/taskService');
const Task = require('../models/taskModel');
const Column = require('../models/columnModel');

// mock adatok
jest.mock('../models/taskModel');
jest.mock('../models/columnModel');

describe('TaskService Tesztek', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // 1. teszteset: create
    describe('createTask', () => {
        it('should create a new task and add it to the column', async () => {
            // ARRANGE
            const title = 'Új Feladat';
            const description = 'Ez egy teszt leírás';
            const boardId = 'board_123';
            const columnId = 'col_123';
            const assigneeId = null;
            const dueDate = null;

            const mockColumn = {
                _id: columnId,
                board: boardId,
                tasks: [],
                save: jest.fn().mockResolvedValue(true)
            };

            const mockNewTask = { 
                _id: 'task_abc', 
                title, 
                description, 
                board: boardId, 
                column: columnId, 
                order: 0 
            };

            Column.findById.mockResolvedValue(mockColumn);
            Task.findOne.mockReturnValue({ sort: jest.fn().mockResolvedValue(null) });
            Task.create.mockResolvedValue(mockNewTask);

            // ACT
            const result = await taskService.createTask(title, description, boardId, columnId, assigneeId, dueDate);

            // ASSERT
            expect(Column.findById).toHaveBeenCalledWith(columnId);

            expect(Task.create).toHaveBeenCalledWith(expect.objectContaining({
                title,
                description,
                board: boardId,
                column: columnId,
                order: 0
            }));

            expect(mockColumn.tasks).toContain('task_abc');
            expect(mockColumn.save).toHaveBeenCalled();
            expect(result).toEqual(mockNewTask);
        });
    });

});