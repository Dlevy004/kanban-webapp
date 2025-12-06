import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Column from '../components/Column';
import { DragDropContext } from '@hello-pangea/dnd';
import './BoardPage.css';
import TaskModal from '../components/TaskModal';

function BoardPage() {
    const { id } = useParams();

    const [boardData, setBoardData] = useState(null);
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedTask, setSelectedTask] = useState(null);
    const openTaskModal = (task) => {
        setSelectedTask(task);
    };

    useEffect(() => {
        const fetchBoardData = async () => {
            try {
                const response = await fetch(`/api/boards/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    const boardData = data.board;
                    setBoardData(boardData);
                    setColumns(boardData.columns || []);
                } else {
                    console.error("Failed to load board!");
                }
            } catch (error) {
                console.error("Error in query:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBoardData();
        }
    }, [id]);

    const handleAddColumn = async () => {
        const title = prompt("Name the new column");
        if (!title) return;

        try {
            const response = await fetch('/api/columns', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    title: title,
                    boardId: id,
                    order: columns.length
                })
            });

            if (response.ok) {
                const newColumn = await response.json();
                setColumns([...columns, { ...newColumn, tasks: [] }]);
            } else {
                console.error("Error saving column!");
            }
        } catch (error) {
            console.error("Server error:", error);
        }
    };

    const handleAddTask = async (columnId) => {
        const title = prompt("Name the new task");
        if (!title) return;

        if (!id) {
            alert("Error: No board selected (Missing from URL)!");
            return;
        }

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    title: title,

                    column: columnId,
                    columnId: columnId,

                    boardId: id,

                    description: "",
                    dueDate: null,
                    assigneeId: null,
                    order: 0
                })
            });

            if (response.ok) {
                const newTask = await response.json();

                const taskObj = newTask.task ? newTask.task : newTask;

                const updatedColumns = columns.map(col => {
                    if (col._id === columnId) {
                        const currentTasks = col.tasks || [];
                        return { ...col, tasks: [...currentTasks, taskObj] };
                    }
                    return col;
                });
                setColumns(updatedColumns);
            } else {
                const errorData = await response.json();
                console.error("Server error:", errorData);
                alert("Error saving: " + (errorData.message || "Unknown error"));
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    const onDragEnd = async (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        const startColumn = columns.find(col => col._id === source.droppableId);
        const finishColumn = columns.find(col => col._id === destination.droppableId);

        const newColumns = [...columns];

        if (startColumn === finishColumn) {
            const newTaskIds = Array.from(startColumn.tasks);
            const [movedTask] = newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, movedTask);

            const newColumn = { ...startColumn, tasks: newTaskIds };

            setColumns(columns.map(col => col._id === newColumn._id ? newColumn : col));
        }
        else {
            const startTaskIds = Array.from(startColumn.tasks);
            const [movedTask] = startTaskIds.splice(source.index, 1);

            const updatedMovedTask = { ...movedTask, column: finishColumn._id };

            const finishTaskIds = Array.from(finishColumn.tasks);
            finishTaskIds.splice(destination.index, 0, updatedMovedTask);

            const newStart = { ...startColumn, tasks: startTaskIds };
            const newFinish = { ...finishColumn, tasks: finishTaskIds };

            setColumns(columns.map(col => {
                if (col._id === newStart._id) return newStart;
                if (col._id === newFinish._id) return newFinish;
                return col;
            }));
        }

        try {
            await fetch(`/api/tasks/${draggableId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    sourceColumnId: source.droppableId,
                    destColumnId: destination.droppableId,
                    destIndex: destination.index,
                })
            });
        } catch (error) {
            console.error("Error saving moved task:", error);
            alert("Error saving task! Refresh the page!");
        }
    };

    const handleDeleteColumn = async (columnId) => {
        if (!window.confirm("Delete column and all associated tasks with it?")) return;

        try {
            const response = await fetch(`/api/columns/${columnId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });

            if (response.ok) {
                setColumns(columns.filter(col => col._id !== columnId));
            }
        } catch (error) {
            console.error("Error deleting column:", error);
        }
    };

    const handleUpdateColumnTitle = async (columnId, oldTitle) => {
        const newTitle = prompt("Rename column:", oldTitle);
        if (!newTitle || newTitle === oldTitle) return;

        try {
            const response = await fetch(`/api/columns/${columnId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ title: newTitle })
            });

            if (response.ok) {
                setColumns(columns.map(col =>
                    col._id === columnId ? { ...col, title: newTitle } : col
                ));
            }
        } catch (error) {
            console.error("Error renaming column:", error);
        }
    };


    const handleDeleteTask = async (taskId, columnId) => {
        if (!window.confirm("Delete this task?")) return;

        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });

            if (response.ok) {
                const updatedColumns = columns.map(col => {
                    if (col._id === columnId) {
                        return {
                            ...col,
                            tasks: col.tasks.filter(task => task._id !== taskId)
                        };
                    }
                    return col;
                });
                setColumns(updatedColumns);
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleUpdateTaskTitle = async (taskId, columnId, oldTitle) => {
        const newTitle = prompt("Rename task:", oldTitle);
        if (!newTitle || newTitle === oldTitle) return;

        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ title: newTitle })
            });

            if (response.ok) {
                const updatedColumns = columns.map(col => {
                    if (col._id === columnId) {
                        return {
                            ...col,
                            tasks: col.tasks.map(task =>
                                task._id === taskId ? { ...task, title: newTitle } : task
                            )
                        };
                    }
                    return col;
                });
                setColumns(updatedColumns);
            }
        } catch (error) {
            console.error("Error renaming task:", error);
        }
    };

    const handleSaveTaskDetails = async (updatedTaskData) => {
        try {
            const response = await fetch(`/api/tasks/${updatedTaskData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updatedTaskData)
            });

            if (response.ok) {
                const savedTaskResponse = await response.json();
                const savedTask = savedTaskResponse.task || savedTaskResponse;

                const updatedColumns = columns.map(col => {
                    if (col.tasks.some(t => t._id === savedTask._id)) {
                        return {
                            ...col,
                            tasks: col.tasks.map(t => t._id === savedTask._id ? savedTask : t)
                        };
                    }
                    return col;
                });

                setColumns(updatedColumns);
                setSelectedTask(null);
            }
        } catch (error) {
            console.error("Error saving task details:", error);
            alert("Server error saving task details");
        }
    };

    useEffect(() => {
        if (boardData && boardData.title) {
            document.title = `${boardData.title} | Kanban App`;
        } else {
            document.title = 'Tábla | Kanban App';
        }
    }, [boardData]);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <main className="board-page-main">

                {columns.map((column) => (
                    <Column
                        key={column._id}
                        columnData={column}
                        onAddTask={handleAddTask}
                        onDeleteColumn={handleDeleteColumn}
                        onUpdateColumn={handleUpdateColumnTitle}
                        onDeleteTask={handleDeleteTask}
                        onUpdateTask={handleUpdateTaskTitle}
                        onTaskClick={openTaskModal}
                    />
                ))}

                {selectedTask && (
                    <TaskModal
                        task={selectedTask}
                        onClose={() => setSelectedTask(null)}
                        onSave={handleSaveTaskDetails}
                    />
                )}

                <button onClick={handleAddColumn} className="new-column-button">
                    + Create new column
                </button>
            </main>
        </DragDropContext>
    );
}

export default BoardPage;