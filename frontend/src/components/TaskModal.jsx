import React, { useState } from 'react';
import './TaskModal.css';

export default function TaskModal({ task, onClose, onSave }) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description || '');

    const [isGenerating, setIsGenerating] = useState(false);

    const formatDateForInput = (dateString) => {
        if (dateString) {
            return new Date(dateString).toISOString().split('T')[0];
        }

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    const [dueDate, setDueDate] = useState(formatDateForInput(task.dueDate));

    const handleAiGenerate = async () => {
        if (!title) {
            alert("Provide a title first!");
            return;
        }

        setIsGenerating(true);
        try {
            const response = await fetch('/api/ai/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ title })
            });

            const data = await response.json();

            if (response.ok) {
                setDescription(data.description);
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            console.error("AI Error:", error);
            alert("Failed to reach AI server.");
        } finally {
            setIsGenerating(false);
        }
    };

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

                        <button
                            type="button"
                            onClick={handleAiGenerate}
                            disabled={isGenerating}
                            style={{
                                fontSize: '0.8rem',
                                padding: '4px 8px',
                                background: 'var(--color-accent-soft)',
                                color: 'var(--color-accent)',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: isGenerating ? 'wait' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px'
                            }}
                            title="Generate with AI"
                        >
                            {isGenerating ? 'Generating...' : 'Write with AI'}
                        </button>

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
