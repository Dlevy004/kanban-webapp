export const mockBoardData = {
    _id: "board-1",
    title: "Kanban Projekt Board",
    owner: "user-1",
    columns: [
        {
            _id: "column-1",
            title: "Column neve",
            board: "board-1",
            order: 0,
            tasks: [
                { 
                    _id: "task-1", 
                    title: "Első feladat (Task)", 
                    order: 0, 
                    column: "column-1"
                },
                { 
                    _id: "task-2", 
                    title: "Második feladat", 
                    order: 1, 
                    column: "column-1" 
                },
            ]
        },
        {
            _id: "column-2",
            title: "Folyamatban",
            board: "board-1",
            order: 1,
            tasks: []
        },
    ]
};