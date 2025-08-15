import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import getDatabase from '../database/connection';

export interface JwtPayload {
  userId: string;
  email: string;
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ success: false, error: 'Access token required' });
      return;
    }

    const decoded = jwt.verify(token, process.env['JWT_SECRET'] || 'fallback_secret') as JwtPayload;
    
    // Fetch user from database
    const db = await getDatabase();
    const user = await db.get(
      'SELECT id, email, full_name, phone, bio, profile_image_url, location, skills, rating, total_reviews, is_verified, created_at, updated_at FROM users WHERE id = ?',
      [decoded.userId]
    );

    if (!user) {
      res.status(401).json({ success: false, error: 'Invalid token' });
      return;
    }
    (req as any).user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(403).json({ success: false, error: 'Invalid token' });
      return;
    }
    
    console.error('Auth middleware error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const optionalAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      next();
      return;
    }

    const decoded = jwt.verify(token, process.env['JWT_SECRET'] || 'fallback_secret') as JwtPayload;
    
    const db = await getDatabase();
    const user = await db.get(
      'SELECT id, email, full_name, phone, bio, profile_image_url, location, skills, rating, total_reviews, is_verified, created_at, updated_at FROM users WHERE id = ?',
      [decoded.userId]
    );

    if (user) {
      (req as any).user = user;
    }
    
    next();
  } catch (error) {
    // If token is invalid, just continue without user
    next();
  }
};
