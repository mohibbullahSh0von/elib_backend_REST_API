import express, { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';
import { config } from './config/config.js';
const app = express();

// routes...
app.get('/', (req, res, next) => {
  res.json({ message: 'Welcome to elib api for ebook store' });
});

// global error handler

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    message: err.message,
    errorStack: config.env === 'development' ? err.stack : '',
  });
});

export default app;
