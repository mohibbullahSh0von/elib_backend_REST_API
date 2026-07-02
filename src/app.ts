import express from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import userRouter from './users/userRouter.js';

const app = express();

// routes...
app.get('/', (req, res, next) => {
  res.json({ message: 'Welcome to elib api for ebook store' });
});

// user-router
app.use('/api/users', userRouter);

// global error handler
app.use(globalErrorHandler);

export default app;
