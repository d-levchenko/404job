import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import dns from 'node:dns';

import { connectMongoDB } from './db/connectMongoDB.js';

dns.setServers(['1.1.1.1', '8.8.8.8']);

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes

// 404

// 500

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
