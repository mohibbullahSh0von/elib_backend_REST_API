import express from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import userRouter from './users/userRouter.js';
import bookRouter from './books/bookRouter.js';

const app = express();

// middleware
app.use(express.json());

// routes...
app.get('/', (req, res, next) => {
  res.json({ message: 'Welcome to elib api for ebook store' });
});

// user-router
app.use('/api/users', userRouter);

// book-router
app.use('/api/users', bookRouter);

// global error handler
app.use(globalErrorHandler);

export default app;
