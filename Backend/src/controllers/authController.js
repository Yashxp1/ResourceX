import { generateToken } from '../lib/token.js';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(401)
        .json({ success: false, message: 'Fill all the details' });
    }

    if (password.length < 6) {
      return res.status(401).json({
        success: false,
        message: 'Your password must have more than 6 characters',
      });
    }

    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: 'User already exists ' });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        message: 'SUCCESS',
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid user data' });
    }
  } catch (error) {
    console.log('Error in signup controller', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid credentials' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: 'SUCCESS',
    });
  } catch (error) {
    console.log('Error in login controller', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log('Error in logout controller', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};
