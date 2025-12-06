require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 5500;
const MONGO_URI = process.env.MONGO_URI; 

const app = express();

app.use(cors()); 
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const boardRoutes = require('./routes/boardRoutes');
app.use('/api/boards', boardRoutes);

const columnRoutes = require('./routes/columnRoutes');
app.use('/api/columns', columnRoutes);

const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);


if (!MONGO_URI) {
    console.error('Fatal Error: MONGO_URI is not set in .env file.');
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Succesfully connected to MongoDB.');

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

    })
    .catch((err) => {
        console.error('Database connection error: ', err);
        process.exit(1);
    });
