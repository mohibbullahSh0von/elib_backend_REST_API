import { User } from '../users/userTypes.js';

export interface Book {
  _id: string;
  title: string;
  gener: string;
  publisher: string;
  coverImage: string;
  author: User;
  file: String;
}
