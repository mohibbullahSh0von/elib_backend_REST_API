import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import userModel from './userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { User } from './userTypes.js';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  // Validation

  if (!name || !email || !password) {
    const error = createHttpError(400, 'All fields are required');
    return next(error);
  }

  //Database call

  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const error = createHttpError(400, 'User already exist with this email');

      return next(error);
    }
  } catch (error) {
    return next(createHttpError(500, 'Error while getting user'));
  }

  /// password --> hash
  let newUser: User;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    return next(createHttpError(500, 'error while creating user'));
  }

  try {
    /// Token generation JWT token
    const token = jwt.sign(
      {
        sub: newUser._id,
      },
      config.jwtSecret as string,
      { expiresIn: '7d', algorithm: 'HS256' },
    );
    // response
    res.json({ accessToken: token });
  } catch (error) {
    return next(createHttpError(500, 'Error while signing the jwt token'));
  }
};

export { createUser };
