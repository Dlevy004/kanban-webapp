import React from 'react';
import './Column.css';
import Task from './Task.jsx';
import { Droppable } from '@hello-pangea/dnd';

function Column({ columnData, onAddTask }) {

    return (
        <div className="column-container">
            <div className="column-title">{columnData.title}</div>

            <Droppable droppableId={columnData._id}>
                {(provided) => (
                    <div
                        className="tasks-list"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{ minHeight: '100px' }}
                    >
                        {columnData.tasks && columnData.tasks.map((task, index) => (
                            <Task key={task._id} taskData={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            <button className="new-task-button" onClick={() => onAddTask(columnData._id)}>
                + Create new task
            </button>
        </div>
    );
}

export default Column;