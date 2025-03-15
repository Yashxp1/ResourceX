import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('jwt', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return token;
  } catch (error) {
    console.log('Failed to create a token', error);
  }
};
