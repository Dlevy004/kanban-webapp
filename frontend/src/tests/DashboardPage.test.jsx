import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardPage from '../pages/DashboardPage';
import { BrowserRouter } from 'react-router-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('DashboardPage Component', () => {
    const setupLocalStorage = (user) => {
        Storage.prototype.getItem = jest.fn((key) => {
            if (key === 'user') return JSON.stringify(user);
            if (key === 'token') return 'fake-token';
            return null;
        });
    };

    const mockUser = { username: 'TesztElek' };
    const mockBoards = [
        { _id: '1', title: 'Projekt Alpha', createdAt: new Date().toISOString() },
        { _id: '2', title: 'Projekt Beta', createdAt: new Date().toISOString() }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        
        // Alapértelmezett mock: egy rövid késleltetést (Promise) adunk neki, 
        // hogy a React state update-ek sorrendje kiszámíthatóbb legyen.
        global.fetch = jest.fn(() => 
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ board: [] }),
            })
        );

        jest.spyOn(window, 'prompt').mockImplementation(() => null);
        jest.spyOn(window, 'confirm').mockImplementation(() => true);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    const renderWithRouter = async (component) => {
        let result;
        // Az act-be csomagolás segít a kezdeti useEffect lefutásában
        await act(async () => {
            result = render(
                <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                    {component}
                </BrowserRouter>
            );
        });
        return result;
    };

    test('Betöltéskor lekéri és megjeleníti a táblákat', async () => {
        setupLocalStorage(mockUser);
        
        global.fetch.mockImplementationOnce(() => 
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ board: mockBoards }),
            })
        );

        await renderWithRouter(<DashboardPage />);

        // Megvárjuk, amíg a Loading eltűnik és a név megjelenik
        expect(await screen.findByText(/TesztElek/i)).toBeInTheDocument();

        expect(await screen.findByText('Projekt Alpha')).toBeInTheDocument();
        expect(screen.getByText('Projekt Beta')).toBeInTheDocument();
    });

    test('Átirányít, ha nincs bejelentkezve', async () => {
        Storage.prototype.getItem = jest.fn(() => null);
        await renderWithRouter(<DashboardPage />);
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

test('Új tábla létrehozása (API hívás és navigáció)', async () => {
        setupLocalStorage(mockUser);
        
        // 1. Fetch: Betöltés (üres)
        // 2. Fetch: Létrehozás
        global.fetch
            .mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ board: [] }) })) 
            .mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ board: { _id: '999', title: 'Új Szuper Projekt' } }) }));

        await renderWithRouter(<DashboardPage />);

        // JAVÍTÁS: A "Dashboard" helyett keressük a felhasználónevet vagy az "Új tábla" szöveget
        // Ez biztosítja, hogy az oldal betöltődött, mielőtt kattintunk
        await screen.findByText(/TesztElek/i); 

        window.prompt.mockReturnValue('Új Szuper Projekt');

        // Itt már biztosan ott van a gomb
        const newBoardBtn = screen.getByText('Új tábla');
        
        await act(async () => {
            fireEvent.click(newBoardBtn);
        });

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/board/999');
        });
    });

    test('Tábla törlése', async () => {
        setupLocalStorage(mockUser);
        
        global.fetch
            .mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ board: mockBoards }) }))
            .mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ message: 'Deleted' }) }));

        await renderWithRouter(<DashboardPage />);

        const deleteButtons = await screen.findAllByText('Tábla törlése');
        window.confirm.mockReturnValue(true);

        await act(async () => {
            fireEvent.click(deleteButtons[0]);
        });

        await waitFor(() => {
            expect(screen.queryByText('Projekt Alpha')).not.toBeInTheDocument();
        });
    });

    test('Tábla átnevezése', async () => {
        setupLocalStorage(mockUser);

        global.fetch
            .mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ board: mockBoards }) }))
            .mockImplementationOnce(() => Promise.resolve({ 
                ok: true, 
                json: () => Promise.resolve({ board: { _id: '1', title: 'Projekt Omega', createdAt: new Date().toISOString() } }) 
            }));

        await renderWithRouter(<DashboardPage />);

        const renameButtons = await screen.findAllByText('Tábla nevének módosítása');
        window.prompt.mockReturnValue('Projekt Omega');

        await act(async () => {
            fireEvent.click(renameButtons[0]);
        });

        expect(await screen.findByText('Projekt Omega')).toBeInTheDocument();
    });

    describe('Napszakhoz kötött köszönés ellenőrzése', () => {
        beforeAll(() => { jest.useFakeTimers(); });
        afterAll(() => { jest.useRealTimers(); });

        test('Hajnal (04:00)', async () => {
            setupLocalStorage(mockUser);
            jest.setSystemTime(new Date('2024-01-01T04:00:00'));
            await renderWithRouter(<DashboardPage />);
            expect(await screen.findByText(/Még fent vagy\? Kitartás/i)).toBeInTheDocument();
        });

        test('Reggel (09:00)', async () => {
            setupLocalStorage(mockUser);
            jest.setSystemTime(new Date('2024-01-01T09:00:00'));
            await renderWithRouter(<DashboardPage />);
            expect(await screen.findByText(/Jó reggelt/i)).toBeInTheDocument();
        });

        test('Napközben (14:00)', async () => {
            setupLocalStorage(mockUser);
            jest.setSystemTime(new Date('2024-01-01T14:00:00'));
            await renderWithRouter(<DashboardPage />);
            expect(await screen.findByText(/Szép napot/i)).toBeInTheDocument();
        });

        test('Este (20:00)', async () => {
            setupLocalStorage(mockUser);
            jest.setSystemTime(new Date('2024-01-01T20:00:00'));
            await renderWithRouter(<DashboardPage />);
            expect(await screen.findByText(/Kellemes estét/i)).toBeInTheDocument();
        });
    });
});