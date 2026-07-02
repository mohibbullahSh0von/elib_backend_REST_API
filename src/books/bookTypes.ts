import { User } from '../users/userTypes.js';

export interface Book {
  _id: string;
  title: string;
  author: User;
  genre: string;
  publisher: string;
  coverImage: string;
  file: String;
}
