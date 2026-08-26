import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import dns from 'node:dns';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import authRouter from './routes/authRoutes.js';

dns.setServers(['1.1.1.1', '8.8.8.8']);

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(logger);

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/auth', authRouter);
app.use(notFoundHandler);

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
