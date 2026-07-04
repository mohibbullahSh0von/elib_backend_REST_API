import createHttpError from 'http-errors';
import bookModel from './bookModel.js';
import { Request, Response, NextFunction } from 'express';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  // const { title, genre, author, coverImage, publisher, file } = req.body;

  console.log('Files', req.files, process.cwd() + '/public/data/uploads');

  // // Basic  validation
  // if (!title || !genre || !author || !coverImage || !publisher || !file) {
  //   const error = createHttpError(400, 'All fields are required');
  //   return next(error);
  // }

  // // Database call

  // const book = await bookModel.findOne({ title, author });
  // if (book) {
  //   const error = createHttpError(400, 'The book is already listed');
  //   return next(error);
  // }

  // const newBook = await bookModel.create({
  //   title,
  //   genre,
  //   author,
  //   coverImage,
  //   publisher,
  //   file,
  // });

  res.status(200).json({
    message: 'The book has been listed to DB',
    files: req.files,
  });
};

export { createBook };
