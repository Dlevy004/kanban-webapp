import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';
import KanbanLogo from '../assets/kanban-logo-wout-bg.png';

const DashboardPage = () => {
    const [user, setUser] = useState(null);
    const [boards, setBoards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        if (!token || !userData) {
            navigate('/');
            return;
        }
        setUser(JSON.parse(userData));

        const fetchBoards = async () => {
            try {
                const response = await fetch('http://localhost:5500/api/boards', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Nem sikerült betölteni a táblákat');
                }

                const data = await response.json();
                // A backend struktúrától függően lehet, hogy data.board vagy simán data jön vissza.
                // A korábbi boardService kódod alapján: { message: '...', board: [...] } volt a válasz a handleReadAllBoards-nál.
                // De ellenőrizzük: ha tömböt kapsz, akkor setBoards(data), ha objektumot, akkor setBoards(data.board)

                // A controllered ezt küldi: res.status(200).json({ message: '...', board: board })
                // Tehát a táblák listája a 'data.board' mezőben lesz!
                setBoards(data.board || []);

            } catch (error) {
                console.error("Hiba a táblák betöltésekor:", error);
            }
        };

        fetchBoards(); // Meghívjuk a lekérést
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        navigate('/auth');
    };

    const handleProfile = () => {
        navigate('/profile');
    };

    const handleNewBoard = async () => {
        const title = window.prompt("Add meg az új tábla nevét:", "Új Projekt");

        if (!title) return;

        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            const response = await fetch('http://localhost:5500/api/boards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title: title })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Hiba történt a létrehozáskor');
            }

            if (data.board && data.board._id) {
                navigate(`/board/${data.board._id}`);
            } else {
                console.error("Nem jött ID a választól:", data);
            }

        } catch (error) {
            console.error("API Error:", error);
            alert(error.message);
        }
    };

    const handleBoardClick = (boardId) => {
        navigate(`/board/${boardId}`);
    };

    const handleDeleteBoard = async (e, boardId) => {
        e.stopPropagation();

        if (!window.confirm("Biztosan törölni szeretnéd ezt a táblát? A művelet nem vonható vissza!")) {
            return;
        }

        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            const response = await fetch(`http://localhost:5500/api/boards/${boardId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Sikertelen törlés');
            }

            setBoards((prevBoards) => prevBoards.filter(board => board._id !== boardId));

        } catch (error) {
            console.error("Hiba a törléskor:", error);
            alert("Nem sikerült törölni a táblát.");
        }
    };

    const handleRenameBoard = async (e, boardId) => {
        e.stopPropagation();

        const boardToRename = boards.find(b => b._id === boardId);
        const oldTitle = boardToRename ? boardToRename.title : '';

        const newTitle = window.prompt("Mi legyen a tábla új neve?", oldTitle);

        if (!newTitle || newTitle === oldTitle) {
            return;
        }

        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            const response = await fetch(`http://localhost:5500/api/boards/${boardId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title: newTitle })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Sikertelen név módosítás');
            }

            const updatedBoard = await response.json();

            setBoards((prevBoards) => 
                prevBoards.map(board => 
                    board._id === boardId ? updatedBoard.board : board
                )
            );

        } catch (error) {
            console.error("Hiba átnevezéskor:", error);
            alert("Nem sikerült átnevezni a táblát.");
        }
    };

    if (!user) return <div style={{ padding: '20px', color: '#666' }}>Loading...</div>;

    return (
        <div className="dashboard-page-wrapper">
            <div className="dashboard-centered-content">

                <nav className="dashboard-navbar">
                    <div className="dashboard-logo">
                        <img src={KanbanLogo} alt="Kanban App Logo" className="kanban-logo-img" />
                    </div>
                    <div className="dashboard-user-info">
                        <button
                            className="dashboard-profile-btn"
                            onClick={handleProfile}
                        >
                            Profil
                        </button>
                        <button
                            className="dashboard-logout-btn"
                            onClick={handleLogout}
                        >
                            Kijelentkezés
                        </button>
                    </div>
                </nav>

                <div className="dashboard-main-container">
                    <main className="dashboard-main-content">
                        <div className="dashboard-welcome-section">
                            <h1 className="dashboard-title">Szia {user.username}!</h1>
                            <p className="dashboard-subtitle">Projektjeit itt találja:</p>
                        </div>

                        <div className="dashboard-boards-grid">
                            <div
                                className="dashboard-new-board-card"
                                onClick={handleNewBoard}
                            >
                                <span className="new-board-icon">+</span>
                                <span className="new-board-text">Új tábla</span>
                            </div>

                            {boards.map((board) => (
                                <div
                                    key={board._id}
                                    className="dashboard-board-card"
                                    onClick={() => handleBoardClick(board._id)}
                                >
                                    <div>
                                        <h3 style={{ margin: 0, color: '#333' }}>{board.title}</h3>
                                        <small style={{ color: '#666', marginTop: '10px' }}>
                                            {new Date(board.createdAt).toLocaleDateString()}
                                        </small>
                                    </div>
                                    <div className="dashboard-buttons">
                                        <button
                                            className="delete-board-btn"
                                            onClick={(e) => handleDeleteBoard(e, board._id)}
                                        >
                                            Tábla törlése
                                        </button>
                                        <button
                                            className="rename-board-btn"
                                            onClick={(e) => handleRenameBoard(e, board._id)}
                                        >
                                            Tábla nenévek módosítása
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>

            </div>
        </div>
    );
};

export default DashboardPage;