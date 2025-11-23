import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import songRouter from './src/routes/songRoute.js';
import albumRouter from './src/routes/albumRoutes.js';

const app = express();
const port = process.env.PORT || 8000;

// Connect DB and Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api/song', songRouter);
app.use('/api/album', albumRouter);

app.get('/', (req, res) => {
    res.send("Spotify Backend Running!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
