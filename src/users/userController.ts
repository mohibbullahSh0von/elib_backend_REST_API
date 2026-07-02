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

  /// Token generation JWT token
  try {
    const token = jwt.sign(
      {
        sub: newUser._id,
      },
      config.jwtSecret as string,
      { expiresIn: '7d', algorithm: 'HS256' },
    );
    // response
    res.status(201).json({ accessToken: token });
  } catch (error) {
    return next(createHttpError(500, 'Error while signing the jwt token'));
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // validation NEVER TRUST CLIENT
  if (!email || !password) {
    const error = createHttpError(400, 'All the fields are required');
    return next(error);
  }

  // database call
  let user: User | null;
  try {
    user = await userModel.findOne({ email });

    if (!user) {
      const error = createHttpError(404, 'User not found');
      return next(error);
    }
  } catch (error) {
    return next(createHttpError(500, 'Database error'));
  }

  // authentication
  try {
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(createHttpError(400, 'Username or password incorrect'));
    }
  } catch (error) {
    return next(createHttpError(500, 'Authentication Failed!!!'));
  }

  // create access token

  try {
    const payload = {
      userId: user._id,
      email: user.email,
    };
    const secretKey = config.jwtSecret;

    const options = {
      expiresIn: '24h',
    };

    const token = jwt.sign(payload, secretKey as string, {
      expiresIn: '24h',
    });

    res.status(200).json({
      message: 'Successfully logged In',
      accessToken: token,
    });
  } catch (err) {
    return next(createHttpError(500, 'Failed to create the token'));
  }
};

export { createUser, loginUser };
