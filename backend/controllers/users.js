import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import 'dotenv/config';
import User from '../models/users.js';
import { StatusCodes } from 'http-status-codes';

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Invalid credentials' });
  const isPasswordCorrect = await bcryptjs.compare(password, user.password);
  if (!isPasswordCorrect)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Invalid credentials' });
  const token = jwt.sign(
    {
      email,
      name: user.name,
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    }
  );
  res.status(StatusCodes.OK).json({
    email,
    name: user.name,
    id: user._id,
    token,
  });
};

export const signUp = async (req, res) => {
  const { name, email, password, password2 } = req.body;
  if (password !== password2)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Passwords do not match!' });
  const user = await User.findOne({ email });
  if (user)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'User already exist' });
  const salt = await bcryptjs.genSalt(10);
  const hashPassword = await bcryptjs.hash(password, salt);
  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
  });
  const token = jwt.sign(
    {
      name,
      email,
      id: newUser._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    }
  );
  res.status(StatusCodes.OK).json({
    email,
    name,
    id: newUser._id,
    token,
  });
};
