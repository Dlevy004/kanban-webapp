import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardLayout from '../components/DashboardLayout'; 
import { MemoryRouter, Routes, Route } from 'react-router-dom';

jest.mock('../components/ThemeToggle', () => () => <button>Theme Toggle</button>);

describe('DashboardLayout Joke Generator', () => {
    
    let mockRandom;

    beforeEach(() => {
        mockRandom = jest.spyOn(global.Math, 'random');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('Betöltéskor megjelenít egy viccet (1. vicc)', () => {
        mockRandom.mockReturnValue(0);

        render(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <DashboardLayout />
            </MemoryRouter>
        );

        expect(screen.getByText(/Mire táncolnak a programozók/i)).toBeInTheDocument();
    });

    test('Navigáláskor (URL váltáskor) új viccet generál', async () => {
        mockRandom.mockReturnValue(0);

        render(
            <MemoryRouter initialEntries={['/dashboard']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <Routes>
                    <Route element={<DashboardLayout />}>
                        <Route path="/dashboard" element={<h1>Dashboard Home</h1>} />
                        <Route path="/profile" element={<h1>Profile Page</h1>} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/Mire táncolnak a programozók/i)).toBeInTheDocument();

        mockRandom.mockReturnValue(0.99);

        const profileBtn = screen.getByText('Profil');
        await act(async () => {
            fireEvent.click(profileBtn);
        });

        expect(screen.getByText(/Öröklődés által/i)).toBeInTheDocument();
        
        expect(screen.queryByText(/Mire táncolnak a programozók/i)).not.toBeInTheDocument();
    });

    test('A vicc konténer megjelenik', () => {
        mockRandom.mockReturnValue(0);
        
        render(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <DashboardLayout />
            </MemoryRouter>
        );

        const viccText = screen.getByText(/Algoritmusra/i);
        const container = viccText.closest('.joke-container');
        expect(container).toBeInTheDocument();
    });
});