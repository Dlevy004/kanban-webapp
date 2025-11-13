import React, { useState } from 'react';
import { mockBoardData } from '../mockData';
import Column from '../components/Column';
import './BoardPage.css';

function BoardPage() {
    const [boardData, setBoardData] = useState(mockBoardData);

    return (
        <div className="board-page-container">
            <nav className="board-navbar">
                <div className="board-navbar-left">
                    <a href="#">
                        <img src="/images/kanban-logo.png" className='navbar-logo'/>
                    </a>
                    <div className="board-title">{boardData.title}</div>
                </div>
                
                <button>
                    <img src="/images/account_circle_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" className='navbar-profile'/>
                </button>
            </nav>

            <main className="board-columns-wrapper">

                {boardData.columns.map((column) => (
                    <Column key={column._id} columnData={column} />
                ))}

                <div className="new-column-button">
                    + Create new column
                </div>
            </main>
        </div>
    );
}

export default BoardPage;