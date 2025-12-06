import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Column from '../components/Column';
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

    return (
        <main className="board-page-main">

            {columns.map((column) => (
                <Column key={column._id} columnData={column} onAddTask={handleAddTask} />
            ))}

            <button onClick={handleAddColumn} className="new-column-button">
                + Create new column
            </button>
        </main>
    );
}

export default BoardPage;