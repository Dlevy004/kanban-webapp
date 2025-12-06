import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Column from '../components/Column';
import { DragDropContext } from '@hello-pangea/dnd';
import './BoardPage.css';

function BoardPage() {
    const { id } = useParams();

    const [boardData, setBoardData] = useState(null);
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        if (boardData && boardData.title) {
            document.title = `${boardData.title} | Kanban App`;
        } else {
            document.title = 'Tábla | Kanban App';
        }
    }, [boardData]);

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

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <main className="board-page-main">

                {columns.map((column) => (
                    <Column key={column._id} columnData={column} onAddTask={handleAddTask} />
                ))}

                <button onClick={handleAddColumn} className="new-column-button">
                    + Create new column
                </button>
            </main>
        </DragDropContext>
    );
}

export default BoardPage;