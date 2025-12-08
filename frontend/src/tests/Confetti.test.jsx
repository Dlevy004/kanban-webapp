import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskCard from '../components/Task';


jest.mock('@hello-pangea/dnd', () => ({
    Draggable: ({ children }) => children({
        draggableProps: {},
        dragHandleProps: {},
        innerRef: jest.fn()
    }, { isDragging: false })
}));

describe('TaskCard Component', () => {
    const mockTask = {
        _id: 'task-123',
        title: 'Teszt Feladat Konfettivel',
        description: 'Ez egy nagyon fontos feladat.',
        dueDate: '2024-12-31',
        isCompleted: false
    };

    const mockHandlers = {
        onDelete: jest.fn(),
        onUpdate: jest.fn(),
        onClick: jest.fn(),
        onToggleCompletion: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Helyesen megjeleníti a feladat adatait', () => {
        render(<TaskCard taskData={mockTask} index={0} columnId="col-1" {...mockHandlers} />);
        
        expect(screen.getByText('Teszt Feladat Konfettivel')).toBeInTheDocument();
        expect(screen.getByText('Ez egy nagyon fontos feladat.')).toBeInTheDocument();
        expect(screen.getByText(/2024/)).toBeInTheDocument();
    });

    test('A pipa (check circle) kattintáskor meghívja a szülő függvényét (onToggleCompletion)', () => {
        render(<TaskCard taskData={mockTask} index={0} columnId="col-1" {...mockHandlers} />);

        const checkBtn = screen.getByTitle('Mark as done');
        
        fireEvent.click(checkBtn);

        expect(mockHandlers.onToggleCompletion).toHaveBeenCalledTimes(1);
        expect(mockHandlers.onToggleCompletion).toHaveBeenCalledWith('task-123', 'col-1', true);
    });

    test('Ha a feladat kész (isCompleted: true), akkor megjelenik a pipa és az áthúzás', () => {
        const completedTask = { ...mockTask, isCompleted: true };
        
        const { container } = render(<TaskCard taskData={completedTask} index={0} columnId="col-1" {...mockHandlers} />);

        expect(container.querySelector('.completed-task')).toBeInTheDocument();
        expect(container.querySelector('.task-check-circle.checked')).toBeInTheDocument();
        
        expect(screen.getByText('✓')).toBeInTheDocument();
    });
});