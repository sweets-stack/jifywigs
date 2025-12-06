import jwt, { SignOptions } from 'jsonwebtoken';

export const generateToken = (id: string, role: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  const options: SignOptions = {
    expiresIn: '7d'
  };

  return jwt.sign({ userId: id, role }, secret, options);
};

export const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }
  
  return jwt.verify(token, secret);
};