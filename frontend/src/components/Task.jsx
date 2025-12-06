import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import './Task.css';

function TaskCard({ taskData, index }) {
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
                </div>
            )}
        </Draggable>
    );
}

export default TaskCard;
