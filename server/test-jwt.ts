// server/test-jwt.ts
import jwt, { SignOptions } from 'jsonwebtoken';

const testJWT = () => {
  try {
    const payload = { userId: '123', role: 'user' };
    const secret = 'test-secret';
    const options: SignOptions = { expiresIn: '7d' };
    
    const token = jwt.sign(payload, secret, options);
    console.log('✅ JWT test passed:', token);
    
    const decoded = jwt.verify(token, secret);
    console.log('✅ JWT verify passed:', decoded);
  } catch (error: any) {
    console.error('❌ JWT test failed:', error.message);
  }
};

testJWT();