import express from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import userRouter from './users/userRouter.js';
import bookRouter from './books/bookRouter.js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const app = express();

// middleware
app.use(express.json());

// routes...
app.get('/', (req, res, next) => {
  res.json({
    message: 'Welcome to elib api for ebook store',
  });
});

// I WAS TESTING AND LEARNING ABOUT THE DIFFERENCES
// filePathProcess: process.cwd(),
// filePath: import.meta.url,
// fileUrltoPath: fileURLToPath(import.meta.url),
// pathResolver: path.resolve(fileURLToPath(import.meta.url), '../public/uploads'),
// pathResolverProcess: path.resolve(process.cwd(), '../public/uploads'),

// user-router
app.use('/api/users', userRouter);

// book-router
app.use('/api/books', bookRouter);

// global error handler
app.use(globalErrorHandler);

export default app;
