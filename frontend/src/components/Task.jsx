import React from 'react';
import './Task.css';

function TaskCard({ taskData }) {
    return (
        <div className="task-card-container">
            <p className="task-title">{taskData.title}</p>
        </div>
    );
}

export default TaskCard;