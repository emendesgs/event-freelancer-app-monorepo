import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { User, UserCreate, UserUpdate, ApiResponse, JwtPayload } from '../types';
import getDatabase from '../database/connection';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData: UserCreate = req.body;

    // Validation
    if (!userData.email || !userData.password || !userData.full_name) {
      res.status(400).json({
        success: false,
        error: 'Email, password and full name are required'
      });
      return;
    }

    const db = await getDatabase();

    // Check if user already exists
    const existingUser = await db.get(
      'SELECT id FROM users WHERE email = ?',
      [userData.email]
    );

    if (existingUser) {
      res.status(409).json({
        success: false,
        error: 'User with this email already exists'
      });
      return;
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(userData.password, saltRounds);

    // Create user
    const userId = uuidv4();
    await db.run(
      `INSERT INTO users (id, email, password_hash, full_name, phone, bio, location, skills, rating, total_reviews, is_verified, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      [
        userId,
        userData.email,
        passwordHash,
        userData.full_name,
        userData.phone || null,
        userData.bio || null,
        userData.location || null,
        userData.skills ? JSON.stringify(userData.skills) : null,
        0, // rating
        0, // total_reviews
        0 // is_verified
      ]
    );

    // Get the created user
    const user = await db.get(
      'SELECT id, email, full_name, phone, bio, profile_image_url, location, skills, rating, total_reviews, is_verified, created_at, updated_at FROM users WHERE id = ?',
      [userId]
    );

    // Generate JWT token
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email
    };

    const token = jwt.sign(
      payload,
      process.env['JWT_SECRET'] || 'fallback_secret'
    );

    const response: ApiResponse<{ user: User; token: string }> = {
      success: true,
      data: { user, token },
      message: 'User registered successfully'
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
      return;
    }

    const db = await getDatabase();

    // Find user
    const user = await db.get(
      'SELECT id, email, password_hash, full_name, phone, bio, profile_image_url, location, skills, rating, total_reviews, is_verified, created_at, updated_at FROM users WHERE email = ?',
      [email]
    );

    if (!user) {
      res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
      return;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash || '');
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
      return;
    }

    // Generate JWT token
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email
    };

    const token = jwt.sign(
      payload,
      process.env['JWT_SECRET'] || 'fallback_secret'
    );

    // Remove password_hash from response
    const { password_hash, ...userWithoutPassword } = user;

    const response: ApiResponse<{ user: Omit<User, 'password_hash'>; token: string }> = {
      success: true,
      data: { user: userWithoutPassword, token },
      message: 'Login successful'
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
      return;
    }

    const db = await getDatabase();

    const user = await db.get(
      'SELECT id, email, full_name, phone, bio, profile_image_url, location, skills, rating, total_reviews, is_verified, created_at, updated_at FROM users WHERE id = ?',
      [userId]
    );

    if (!user) {
      res.status(404).json({
        success: false,
        error: 'User not found'
      });
      return;
    }

    const response: ApiResponse<User> = {
      success: true,
      data: user,
      message: 'Profile retrieved successfully'
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const updateData: UserUpdate = req.body;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
      return;
    }

    const db = await getDatabase();

    // Build update query dynamically
    const updateFields: string[] = [];
    const updateValues: any[] = [];

    if (updateData.full_name !== undefined) {
      updateFields.push(`full_name = ?`);
      updateValues.push(updateData.full_name);
    }

    if (updateData.phone !== undefined) {
      updateFields.push(`phone = ?`);
      updateValues.push(updateData.phone);
    }

    if (updateData.bio !== undefined) {
      updateFields.push(`bio = ?`);
      updateValues.push(updateData.bio);
    }

    if (updateData.location !== undefined) {
      updateFields.push(`location = ?`);
      updateValues.push(updateData.location);
    }

    if (updateData.skills !== undefined) {
      updateFields.push(`skills = ?`);
      updateValues.push(JSON.stringify(updateData.skills));
    }

    if (updateFields.length === 0) {
      res.status(400).json({
        success: false,
        error: 'No fields to update'
      });
      return;
    }

    updateFields.push(`updated_at = datetime('now')`);
    updateValues.push(userId);

    const query = `
      UPDATE users 
      SET ${updateFields.join(', ')}
      WHERE id = ?
    `;

    await db.run(query, updateValues);

    // Get updated user
    const updatedUser = await db.get(
      'SELECT id, email, full_name, phone, bio, profile_image_url, location, skills, rating, total_reviews, is_verified, created_at, updated_at FROM users WHERE id = ?',
      [userId]
    );

    const response: ApiResponse<User> = {
      success: true,
      data: updatedUser,
      message: 'Profile updated successfully'
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};
