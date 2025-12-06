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

    // 2. teszt: delete
    describe('deleteTask', () => {
        it('should remove task reference from column and delete task', async () => {
            // ARRANGE
            const taskId = 'task_abc';
            const columnId = 'col_123';

            const mockTask = { _id: taskId, column: columnId };

            Task.findById.mockResolvedValue(mockTask);
            Task.deleteOne.mockResolvedValue(true);
            Column.findByIdAndUpdate.mockResolvedValue(true);

            // ACT
            await taskService.deleteTask(taskId);

            // ASSERT
            expect(Task.findById).toHaveBeenCalledWith(taskId);
            expect(Column.findByIdAndUpdate).toHaveBeenCalledWith(
                columnId,
                { $pull: { tasks: taskId } }
            );
            expect(Task.deleteOne).toHaveBeenCalledWith({ _id: taskId });
        });
    });

    // 3. teszteset: Task mozgatás
    describe('moveTask', () => {
        it('should move task from source column to dest column at specific index', async () => {
            // ARRANGE
            const taskId = 'task_move';
            const sourceColumnId = 'col_src';
            const destColumnId = 'col_dest';
            const destIndex = 2;

            // Mongoose mock
            Column.findByIdAndUpdate.mockResolvedValue(true);
            Task.findByIdAndUpdate.mockResolvedValue({ _id: taskId, column: destColumnId });

            // ACT
            await taskService.moveTask(taskId, sourceColumnId, destColumnId, destIndex);

            // ASSERT

            expect(Column.findByIdAndUpdate).toHaveBeenNthCalledWith(1,
                sourceColumnId,
                { $pull: { tasks: taskId } }
            );

            expect(Column.findByIdAndUpdate).toHaveBeenNthCalledWith(2,
                destColumnId,
                {
                    $push: {
                        tasks: {
                            $each: [taskId],
                            $position: destIndex
                        }
                    }
                }
            );

            expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(
                taskId,
                { column: destColumnId },
                { new: true }
            );
        });
    });

    // 4. teszteset: Task frissítés
    describe('updateTask', () => {
        it('should update task details', async () => {
            // ARRANGE
            const taskId = 'task_update';
            const updateData = { title: 'Átírt cím', description: 'Új leírás' };
            const mockUpdatedTask = { _id: taskId, ...updateData };

            Task.findByIdAndUpdate.mockResolvedValue(mockUpdatedTask);

            // ACT
            const result = await taskService.updateTask(taskId, updateData);

            // ASSERT
            expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(
                taskId,
                updateData,
                { new: true }
            );
            expect(result).toEqual(mockUpdatedTask);
        });

        it('should throw error if task not found', async () => {
            Task.findByIdAndUpdate.mockResolvedValue(null);

            await expect(taskService.updateTask('bad_id', {}))
                .rejects
                .toThrow('Task not found.');
        });
    });

});