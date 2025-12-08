import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfilePage from '../pages/ProfilePage';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

// 1. Mockoljuk az Axios-t
jest.mock('axios');

// 2. Mockoljuk a useNavigate hook-ot
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('ProfilePage Component', () => {
    const setupLocalStorage = (user) => {
        Storage.prototype.getItem = jest.fn((key) => {
            if (key === 'user') return JSON.stringify(user);
            if (key === 'token') return 'fake-token';
            return null;
        });
        Storage.prototype.setItem = jest.fn();
    };

    beforeEach(() => {
        jest.clearAllMocks();
        window.alert = jest.fn();
    });

    test('Helyesen rendereli a felhasználói adatokat betöltéskor', async () => {
        const mockUser = { username: 'TesztElek', profilePictureUrl: 'test.jpg' };
        setupLocalStorage(mockUser);

        render(
            <BrowserRouter>
                <ProfilePage />
            </BrowserRouter>
        );

        const usernameInput = screen.getByLabelText(/Felhasználónév/i);
        expect(usernameInput.value).toBe('TesztElek');
        
        const profileImg = document.querySelector('.profile-avatar-preview');
        expect(profileImg).toBeInTheDocument();
    });

    test('Átirányít a főoldalra (/), ha nincs token vagy user adat', () => {
        Storage.prototype.getItem = jest.fn(() => null);

        render(
            <BrowserRouter>
                <ProfilePage />
            </BrowserRouter>
        );

        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    test('Sikeres felhasználónév módosításkor meghívja az API-t', async () => {
        const mockUser = { username: 'RegiNev' };
        setupLocalStorage(mockUser);
        
        axios.put.mockResolvedValue({ 
            data: { user: { ...mockUser, username: 'UjNev' } } 
        });

        render(
            <BrowserRouter>
                <ProfilePage />
            </BrowserRouter>
        );

        const usernameInput = screen.getByLabelText(/Felhasználónév/i);
        const submitButton = screen.getByText(/Név mentése/i);

        fireEvent.change(usernameInput, { target: { value: 'UjNev' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(axios.put).toHaveBeenCalledWith(
                'http://localhost:5500/api/users/profile',
                { username: 'UjNev' },
                expect.any(Object)
            );
        });

        expect(window.alert).toHaveBeenCalledWith('Sikeres névváltás!');
    });

    test('Jelszócsere hiba: Nem egyező jelszavak', async () => {
        setupLocalStorage({ username: 'User' });

        render(
            <BrowserRouter>
                <ProfilePage />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText(/Új jelszó$/i), { target: { value: 'Jelszo123!' } });
        fireEvent.change(screen.getByLabelText(/Új jelszó megerősítése/i), { target: { value: 'MasikJelszo' } });

        const passwordButton = screen.getByText(/Jelszó cseréje/i);
        fireEvent.click(passwordButton);

        expect(window.alert).toHaveBeenCalledWith('Az új jelszavak nem egyeznek!');
        expect(axios.put).not.toHaveBeenCalled();
    });

    test('Jelszócsere hiba: Gyenge jelszó (regex validáció)', async () => {
        setupLocalStorage({ username: 'User' });

        render(
            <BrowserRouter>
                <ProfilePage />
            </BrowserRouter>
        );

        const weakPass = 'gyengejelszo';
        
        fireEvent.change(screen.getByLabelText(/Új jelszó$/i), { target: { value: weakPass } });
        fireEvent.change(screen.getByLabelText(/Új jelszó megerősítése/i), { target: { value: weakPass } });

        fireEvent.click(screen.getByText(/Jelszó cseréje/i));

        expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('nem felel meg a követelményeknek'));
        expect(axios.put).not.toHaveBeenCalled();
    });

    test('Jelszó láthatóság kapcsoló (szem ikon) működése', () => {
        setupLocalStorage({ username: 'User' });
        render(
            <BrowserRouter>
                <ProfilePage />
            </BrowserRouter>
        );

        const passwordInput = screen.getByLabelText(/Jelenlegi jelszó/i);
        expect(passwordInput).toHaveAttribute('type', 'password');
        const toggleIcon = passwordInput.parentElement.querySelector('.password-toggle-icon.lightMode');
        fireEvent.click(toggleIcon);
        expect(passwordInput).toHaveAttribute('type', 'text');
        fireEvent.click(toggleIcon);
        expect(passwordInput).toHaveAttribute('type', 'password');
    });
});