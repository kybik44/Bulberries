import bodyParser from 'body-parser';
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

// Db Connection
import connectDB from './utils/db';

// Routes
import { authenticate } from './middleware/authenticate';
import { authenticateSeller } from './middleware/authenticateSeller';
import { authorize } from './middleware/authorize';
import { errorHandler } from './middleware/errorHandler';
import auth from './routes/auth';
import client from './routes/client';
import seller from './routes/seller';

const app = express();

// PORT
const PORT = 5000;

// middleware
app.use(
    cors({
        origin: '*',
        credentials: true,
    })
);
app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
// Routes
app.use('/api/auth', authorize, auth);
app.use('/api/client', authenticate, client);
app.use('/api/seller', authenticate, authenticateSeller, seller);

// Error handler
app.use(errorHandler);

// Server listening on port 5000
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Listening on Port ${PORT}`);
        });
    })
    .catch(console.log);
