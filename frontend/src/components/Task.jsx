import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import './Task.css';

function TaskCard({ taskData, index, columnId, onDelete, onUpdate }) {
    return (
        <Draggable draggableId={taskData._id} index={index}>
            {(provided) => (
                <div
                    className="task-card-container"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <p className="task-title">{taskData.title}</p>

                    <div className="task-actions" style={{ display: 'flex', gap: '5px' }}>

                        <button
                            onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation()
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onUpdate(taskData._id, columnId, taskData.title);
                            }}
                            style={{
                                background: 'none', border: 'none', cursor: 'pointer',
                                fontSize: '14px', padding: '2px'
                            }}
                            title="Edit"
                        >
                            ✏️
                        </button>

                        <button
                            onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation()
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onDelete(taskData._id, columnId);
                            }}
                            style={{
                                background: 'none', border: 'none', cursor: 'pointer',
                                fontSize: '14px', padding: '2px'
                            }}
                            title="Delete"
                        >
                            🗑️
                        </button>
                    </div>
                </div>
            )}
        </Draggable>
    );
}

export default TaskCard;
