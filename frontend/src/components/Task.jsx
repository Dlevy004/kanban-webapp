import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import './Task.css';

function TaskCard({ taskData, index, columnId, onDelete, onUpdate, onClick, onToggleCompletion }) {

    const isCompleted = taskData.isCompleted || false;

    const formatDate = (dateString) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString('hu-HU');
    };

    const handleCheckClick = (e) => {
        e.stopPropagation(); 
        
        if (onToggleCompletion) {
            onToggleCompletion(taskData._id, columnId, !isCompleted);
        }
    };

    return (
        <Draggable draggableId={taskData._id} index={index}>
            {(provided, snapshot) => (
                <div
                    className={`task-card-container ${isCompleted ? 'completed-task' : ''}`}
                    ref={provided.innerRef}
                    onClick={() => {
                        if (!snapshot.isDragging) {
                            onClick();
                        }
                    }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className="task-header">
                        
                        <div 
                            className={`task-check-circle ${isCompleted ? 'checked' : ''}`} 
                            onClick={handleCheckClick}
                            title="Mark as done"
                        >
                            {isCompleted && <span>✓</span>}
                        </div>

                        <h4 className={`task-title ${isCompleted ? 'completed' : ''}`}>
                            {taskData.title}
                        </h4>

                        <div className="task-actions" style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
                            <button
                                onMouseDown={(e) => { e.preventDefault(); e.stopPropagation() }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onUpdate(taskData._id, columnId, taskData.title);
                                }}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '2px', opacity: 0.7 }}
                                title="Edit"
                            >
                                ✏️
                            </button>

                            <button
                                onMouseDown={(e) => { e.preventDefault(); e.stopPropagation() }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onDelete(taskData._id, columnId);
                                }}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '2px', opacity: 0.7 }}
                                title="Delete"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>

                    {taskData.description && (
                        <div className="task-description">
                            {taskData.description}
                        </div>
                    )}

                    {taskData.dueDate && (
                        <div className="task-footer">
                            <span>📅</span>
                            {formatDate(taskData.dueDate)}
                        </div>
                    )}
                </div>
            )}
        </Draggable>
    );
}

export default TaskCard;