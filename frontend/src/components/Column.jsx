import React from 'react';
import './Column.css';
import Task from './Task.jsx';
import { Droppable } from '@hello-pangea/dnd';

function Column({ columnData, onAddTask, onDeleteColumn, onUpdateColumn, onDeleteTask, onUpdateTask, onTaskClick, onCompleteTask }) {
    return (
        <div className="column-container">
            <div className="column-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>

                <div
                    className="column-title"
                    onClick={() => onUpdateColumn(columnData._id, columnData.title)}
                    style={{ cursor: 'pointer', flexGrow: 1 }}
                    title="Click to rename"
                >
                    {columnData.title}
                </div>

                <button
                    onClick={() => onDeleteColumn(columnData._id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff4d4f', fontWeight: 'bold' }}
                >
                    ✕
                </button>
            </div>

            <Droppable droppableId={columnData._id}>
                {(provided) => (
                    <div
                        className="tasks-list"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{ minHeight: '100px' }}
                    >
                        {columnData.tasks && columnData.tasks.map((task, index) => (
                            <Task
                                key={task._id}
                                taskData={task}
                                index={index}
                                columnId={columnData._id}
                                onDelete={onDeleteTask}
                                onUpdate={onUpdateTask}
                                onClick={() => onTaskClick(task)}
                                onComplete={onCompleteTask}
                            />
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