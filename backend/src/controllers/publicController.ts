import { Request, Response } from 'express';
import getDatabase from '../database/connection';
import { ApiResponse, Category } from '../types';


/**
 * @desc    Get all public jobs
 * @route   GET /api/public/jobs
 * @access  Public
 */
export const getPublicJobs = async (_req: Request, res: Response) => {
  try {
    // const jobs = await db.all('SELECT id, title, description, budget, created_at FROM jobs WHERE status = \'open\'');
    // res.json({ success: true, data: jobs });
    res.json({ success: true, data: [{ id: 1, title: 'Public Job', description: 'This is a public job.', budget: 100, created_at: new Date() }] }); // Placeholder
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to retrieve public jobs' });
  }
};

export const getPublicCategories = async (_req: Request, res: Response) => {
  try {
    const db = await getDatabase();
    const categories = await db.all('SELECT * FROM categories ORDER BY name ASC');
    
    const response: ApiResponse<Category[]> = {
      success: true,
      data: categories,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to retrieve categories' });
  }
};