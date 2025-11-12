import { Request, Response } from 'express';
import getDatabase from '../database/connection';

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const db = await getDatabase();
    const categories = await db.all('SELECT * FROM categories');
    res.json({ message: 'Categories fetched successfully', data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories' });
  }
};