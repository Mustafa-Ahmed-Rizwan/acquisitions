// src/app.js
import logger from '#config/logger.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from '#routes/auth.routes.js';
import securityMiddleware from '#middleware/security.middleware.js';


const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan('combined', { stream: { write: msg => logger.info(msg.trim()) } })
);
app.use(cookieParser());
app.use(securityMiddleware);

app.get('/', (req, res) => {
  logger.info('Hello from Acquisitions!');
  res.status(200).send('Hello From Acquisitions!');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString(), uptime: process.uptime() });
});
app.get('/api',(req, res) => {
  res.status(200).json({ message: 'Acquisitation Api is running!' });
  
});

app.use('/api/auth', authRoutes);

export default app;
