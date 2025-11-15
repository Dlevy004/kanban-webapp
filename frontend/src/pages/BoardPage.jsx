import React, { useState } from 'react';
import { mockBoardData } from '../mockData';
import Column from '../components/Column';
import './BoardPage.css';

function BoardPage() {
    const [boardData, setBoardData] = useState(mockBoardData);

    return (
        <main className="board-page-main">

            {boardData.columns.map((column) => (
                <Column key={column._id} columnData={column} />
            ))}

            <div className="new-column-button">
                + Create new column
            </div>
        </main>
    );
}

export default BoardPage;