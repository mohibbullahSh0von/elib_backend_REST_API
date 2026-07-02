import createHttpError from 'http-errors';
import bookModel from './bookModel.js';
import { Request, Response, NextFunction } from 'express';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, gener, author, coverImage, publisher, file } = req.body;

  // Basic  validation
  if (!title || !gener || !author || !coverImage || !publisher || !file) {
    const error = createHttpError(400, 'All fields are required');
    return next(error);
  }

  // Database call

  const book = await bookModel.findOne({ title, author });
  if (book) {
    const error = createHttpError(400, 'The book is already listed');
    return next(error);
  }

  const newBook = await bookModel.create({
    title,
    gener,
    author,
    coverImage,
    publisher,
    file,
  });

  res.status(200).json({
    message: 'The book has been listed to DB',
    details: newBook,
  });
};

export { createBook };
