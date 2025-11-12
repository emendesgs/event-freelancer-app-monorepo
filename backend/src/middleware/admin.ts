import { Request, Response, NextFunction } from 'express';

export const admin = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ success: false, error: 'Not authorized as an admin' });
  }
};