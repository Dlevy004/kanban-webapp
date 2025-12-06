import React, { useState } from 'react';
import './TaskModal.css';

export default function TaskModal({ task, onClose, onSave }) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description || '');
    
    const formatDateForInput = (dateString) => {
        if (dateString) {
            return new Date(dateString).toISOString().split('T')[0];
        }

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    const [dueDate, setDueDate] = useState(formatDateForInput(task.dueDate));

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...task,
            title,
            description,
            dueDate: dueDate || null
        });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                
                <div className="modal-header">
                    <h2>Task Details</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input 
                            className="input" 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            required 
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea 
                            className="input" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            placeholder="Write a detailed description"
                        />
                    </div>

                    <div className="form-group">
                        <label>Due date</label>
                        <input 
                            className="input" 
                            type="date" 
                            value={dueDate} 
                            onChange={(e) => setDueDate(e.target.value)} 
                        />
                    </div>

                    <div className="modal-actions">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="btn btn-outline"
                        >
                            Cancel
                        </button>
                        
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
