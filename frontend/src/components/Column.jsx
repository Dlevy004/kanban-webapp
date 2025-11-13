import React from 'react';
import './Column.css';

function Column({ columnData }) {

    return (
        <div className="column-container">
            <div className="column-title">{columnData.title}</div>

            <div className="tasks-list">

            </div>

            <button className="new-task-button">
                + Create new task
            </button>
        </div>
    );
}

export default Column;