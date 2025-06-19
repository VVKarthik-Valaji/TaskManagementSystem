import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';

import userRouter from './routes/userRoute.js';
import taskRouter from './routes/taskRoute.js';

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        'https://taskmanagementsystem-2-fhi6.onrender.com' // your deployed frontend URL
    ],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// Routes
app.use("/api/user", userRouter);
app.use('/api/tasks', taskRouter);

app.get('/', (req, res) => {
    res.send('API Working');
});

app.listen(port, () => {
    // Changed from localhost to generic message for Render compatibility
    console.log(`Server started on port ${port}`);
});
