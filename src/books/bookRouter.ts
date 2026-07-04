import express from 'express';
import { createBook } from './bookController.js';
import multer from 'multer';

const bookRouter = express.Router();

const tempUploadPath = process.cwd() + '/public/data/uploads';

const upload = multer({
  dest: tempUploadPath,
  limits: { fileSize: 3e7 }, // 30mb (30 * 1024 * 1024 * 1024)
});

bookRouter.post(
  '/',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'file', maxCount: 1 },
  ]),
  createBook,
);

export default bookRouter;
