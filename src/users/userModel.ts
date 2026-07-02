import mongoose from 'mongoose';
import { User } from './userTypes.js';

const userSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

//Users saved as plural in mongodb database

export default mongoose.model<User>('User', userSchema);
