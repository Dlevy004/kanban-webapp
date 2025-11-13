import React from 'react';
import './Column.css';
import Task from './Task.jsx';

function Column({ columnData }) {

    return (
        <div className="column-container">
            <div className="column-title">{columnData.title}</div>

            <div className="tasks-list">
                {columnData.tasks.map(task => (
                    <Task key={task._id} taskData={task} />
                ))}
            </div>

            <button className="new-task-button">
                + Create new task
            </button>
        </div>
    );
}

export default Column;