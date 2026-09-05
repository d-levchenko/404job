import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import './models/index.js';
import dns from 'node:dns';
import swaggerUI from 'swagger-ui-express';

import { errors } from 'celebrate';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import authRouter from './routes/authRoutes.js';
import usersRouter from './routes/usersRoutes.js';

import vacancyRouter from './routes/vacanciesRoutes.js';
import optionsRouter from './routes/optionsRoutes.js';
import { swaggerSpec } from './docs/swagger.js';

dns.setServers(['1.1.1.1', '8.8.8.8']);

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(express.json());
app.use(logger);
app.use(cookieParser());

// routes
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/vacancies', vacancyRouter);
app.use('/api/options', optionsRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
