import express from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler.js';

const app = express();

// routes...
app.get('/', (req, res, next) => {
  res.json({ message: 'Welcome to elib api for ebook store' });
});

// global error handler
app.use(globalErrorHandler);

export default app;
