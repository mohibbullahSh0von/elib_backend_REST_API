import express from 'express';

const app = express();

// routes...
app.get('/', (req, res, next) => {
  res.json({ message: 'Welcome to elib api for ebook store' });
});

export default app;
