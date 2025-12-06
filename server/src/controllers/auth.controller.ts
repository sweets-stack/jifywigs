// server/src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { User } from '../schemas/User';
import { OAuth2Client } from 'google-auth-library';
import { UserRole } from '@jifywigs/shared';

// Helper function to generate JWT token with correct typing
const generateToken = (userId: string, role: UserRole): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  const payload = { userId, role };
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  
  // Cast to any to bypass TypeScript's strict type checking
  const options: any = {
    expiresIn: expiresIn
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

// Register user
// server/src/controllers/auth.controller.ts - register function
export const register = async (req: Request, res: Response) => {
  try {
    console.log('🔐 Register attempt:', req.body);
    
    // ✅ Extract role from request body, default to CUSTOMER
    const { name, email, password, phone, role = UserRole.CUSTOMER } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and password are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    // Validate role if provided
    if (role && !Object.values(UserRole).includes(role as UserRole)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role specified',
        validRoles: Object.values(UserRole)
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email already exists' 
      });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 8 characters long' 
      });
    }

    // Create new user with the specified role
    const user = new User({
      name,
      email,
      password: password, // ✅ Plain text - pre-save will hash it
      phone: phone || '',
      role: role, // ✅ Use the role from request body
      loginMethod: 'email',
      isActive: true,
    });

    await user.save(); // Pre-save hook will hash the password
    console.log('✅ User created:', user.email, 'with role:', user.role);

    // Generate JWT token using helper function
    const token = generateToken(user._id.toString(), user.role);

    // Remove password from response
    const userObj = user.toObject();
    const { password: _, ...userWithoutPassword } = userObj;

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: userWithoutPassword,
    });
  } catch (error: any) {
    console.error('❌ Registration error details:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Registration failed. Please try again.',
      ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    console.log('🔐 Login attempt:', req.body.email);
    
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Check if user is active
    if (user.isActive === false) {
      console.log('❌ Account deactivated:', email);
      return res.status(403).json({ 
        success: false, 
        message: 'Account is deactivated. Please contact support.' 
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log('❌ Invalid password for:', email);
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Generate JWT token using helper function
    const token = generateToken(user._id.toString(), user.role);

    // Remove password from response
    const userObj = user.toObject();
    const { password: _, ...userWithoutPassword } = userObj;

    console.log('✅ Login successful for:', email);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: userWithoutPassword,
    });
  } catch (error: any) {
    console.error('❌ Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Login failed. Please try again.',
      ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
  }
};

// Google authentication
export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;

    if (!process.env.GOOGLE_CLIENT_ID) {
      console.error('❌ GOOGLE_CLIENT_ID not configured');
      return res.status(500).json({ 
        success: false, 
        message: 'Google authentication not configured' 
      });
    }

    const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid Google token' 
      });
    }

    const { email, name, picture } = payload;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email not provided by Google' 
      });
    }

    // Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name: name || email.split('@')[0],
        email,
        password: await bcrypt.hash(Math.random().toString(36), 10),
        role: UserRole.CUSTOMER,
        profilePicture: picture,
        isGoogleAuth: true,
        loginMethod: 'google',
        isActive: true,
      });
      await user.save();
      console.log('✅ Google user created:', email);
    } else {
      console.log('✅ Google user found:', email);
    }

    // Check if user is active
    if (user.isActive === false) {
      return res.status(403).json({ 
        success: false, 
        message: 'Account is deactivated' 
      });
    }

    // Generate JWT token using helper function
    const token = generateToken(user._id.toString(), user.role);

    // Remove password from response
    const userObj = user.toObject();
    const { password: _, ...userWithoutPassword } = userObj;

    res.json({
      success: true,
      message: 'Google authentication successful',
      token,
      user: userWithoutPassword,
    });
  } catch (error: any) {
    console.error('❌ Google auth error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Google authentication failed',
      ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
  }
};

// Forgot password
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if user exists for security
      return res.json({ 
        success: true, 
        message: 'If an account exists, a reset link has been sent to your email.' 
      });
    }

    // Check if JWT_SECRET is set
    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET is not set in environment variables');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error'
      });
    }

    // Generate reset token (valid for 1 hour)
    const resetToken = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET + user.password,
      { expiresIn: '1h' } as any // Use as any to bypass type checking
    );

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3005'}/reset-password?token=${resetToken}`;

    console.log('📧 Password reset URL (dev only):', resetUrl);

    res.json({
      success: true,
      message: 'Password reset link has been sent to your email',
      ...(process.env.NODE_ENV === 'development' && { resetUrl }),
    });
  } catch (error: any) {
    console.error('❌ Forgot password error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process password reset request',
      ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
  }
};

// Reset password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Token and password are required' 
      });
    }

    if (password.length < 8) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 8 characters long' 
      });
    }

    // Find user by decoding token
    const allUsers = await User.find({});
    let targetUser = null;
    
    for (const user of allUsers) {
      try {
        const decoded = jwt.verify(
          token, 
          process.env.JWT_SECRET! + user.password
        ) as { userId: string };
        
        if (decoded) {
          targetUser = user;
          break;
        }
      } catch (err) {
        // Continue checking other users
      }
    }

    if (!targetUser) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid or expired reset token' 
      });
    }

    // Update password
    targetUser.password = await bcrypt.hash(password, 12);
    await targetUser.save();

    console.log('✅ Password reset for user:', targetUser.email);

    res.json({
      success: true,
      message: 'Password reset successful. You can now login with your new password.',
    });
  } catch (error: any) {
    console.error('❌ Reset password error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to reset password',
      ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
  }
};

// Get current user
export const getMe = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authenticated' 
      });
    }

    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Remove password from response
    const userObj = user.toObject();
    const { password: _, ...userWithoutPassword } = userObj;

    res.json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error: any) {
    console.error('❌ Get me error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get user profile',
      ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
  }
};

// Logout
export const logout = async (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error: any) {
    console.error('❌ Logout error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Logout failed',
      ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
  }
};