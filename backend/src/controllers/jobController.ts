import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { JobCreate, JobUpdate, Job, ApiResponse, SearchFilters } from '../types';
import getDatabase from '../database/connection';

export const createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const jobData: JobCreate = req.body;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
      return;
    }

    // Validation
    if (!jobData.title || !jobData.description || !jobData.category_id) {
      res.status(400).json({
        success: false,
        error: 'Title, description and category_id are required'
      });
      return;
    }

    const db = await getDatabase();

    // Create job
    const jobId = uuidv4();
    await db.run(
      `INSERT INTO jobs (id, user_id, category_id, title, description, event_date, event_time, location, budget_min, budget_max, budget_type, requirements)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        jobId,
        userId,
        jobData.category_id,
        jobData.title,
        jobData.description,
        jobData.event_date || null,
        jobData.event_time || null,
        jobData.location || null,
        jobData.budget_min || null,
        jobData.budget_max || null,
        jobData.budget_type || 'fixed',
        jobData.requirements ? JSON.stringify(jobData.requirements) : null
      ]
    );

    // Get the created job
    const job = await db.get(
      `SELECT j.*, 
              u.full_name as user_name, u.profile_image_url as user_image, u.rating as user_rating,
              c.name as category_name, c.icon as category_icon, c.color as category_color
       FROM jobs j
       JOIN users u ON j.user_id = u.id
       JOIN categories c ON j.category_id = c.id
       WHERE j.id = ?`,
      [jobId]
    );

    const response: ApiResponse<Job> = {
      success: true,
      data: job,
      message: 'Job created successfully'
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      page = 1,
      limit = 10,
      sort_by = 'created_at',
      sort_order = 'desc',
      category_id,
      location,
      budget_min,
      budget_max,
      status,
      date_from,
      date_to
    } = req.query;

    const offset = (Number(page) - 1) * Number(limit);
    const filters: SearchFilters = {
      category_id: category_id as string,
      location: location as string,
      budget_min: budget_min ? Number(budget_min) : undefined,
      budget_max: budget_max ? Number(budget_max) : undefined,
      status: status as string,
      date_from: date_from ? new Date(date_from as string) : undefined,
      date_to: date_to ? new Date(date_to as string) : undefined
    };

    const db = await getDatabase();

    // Build WHERE clause
    let whereClause = 'WHERE j.status = \'open\'';
    const queryParams: any[] = [];

    if (filters.category_id) {
      whereClause += ` AND j.category_id = ?`;
      queryParams.push(filters.category_id);
    }

    if (filters.location) {
      whereClause += ` AND LOWER(j.location) LIKE LOWER(?)`;
      queryParams.push(`%${filters.location}%`);
    }

    if (filters.budget_min !== undefined) {
      whereClause += ` AND j.budget_max >= ?`;
      queryParams.push(filters.budget_min);
    }

    if (filters.budget_max !== undefined) {
      whereClause += ` AND j.budget_min <= ?`;
      queryParams.push(filters.budget_max);
    }

    if (filters.date_from) {
      whereClause += ` AND j.event_date >= ?`;
      queryParams.push(filters.date_from.toISOString().split('T')[0]);
    }

    if (filters.date_to) {
      whereClause += ` AND j.event_date <= ?`;
      queryParams.push(filters.date_to.toISOString().split('T')[0]);
    }

    // Count total jobs
    const countResult = await db.get(
      `SELECT COUNT(*) as count FROM jobs j ${whereClause}`,
      queryParams
    );
    const total = countResult.count;

    // Get jobs with user and category info
    const jobsResult = await db.all(
      `SELECT j.*, 
              u.full_name as user_name, u.profile_image_url as user_image, u.rating as user_rating,
              c.name as category_name, c.icon as category_icon, c.color as category_color
       FROM jobs j
       JOIN users u ON j.user_id = u.id
       JOIN categories c ON j.category_id = c.id
       ${whereClause}
       ORDER BY j.${sort_by} ${(sort_order as string).toUpperCase()}
       LIMIT ? OFFSET ?`,
      [...queryParams, Number(limit), offset]
    );

    const jobs = jobsResult;

    const response: ApiResponse<Job[]> = {
      success: true,
      data: jobs,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        total_pages: Math.ceil(total / Number(limit))
      }
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getJobById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const db = await getDatabase();

    // Increment view count
    await db.run(
      'UPDATE jobs SET views_count = views_count + 1 WHERE id = ?',
      [id]
    );

    // Get job with user and category info
    const job = await db.get(
      `SELECT j.*, 
              u.full_name as user_name, u.profile_image_url as user_image, u.rating as user_rating, u.bio as user_bio,
              c.name as category_name, c.icon as category_icon, c.color as category_color
       FROM jobs j
       JOIN users u ON j.user_id = u.id
       JOIN categories c ON j.category_id = c.id
       WHERE j.id = ?`,
      [id]
    );

    if (!job) {
      res.status(404).json({
        success: false,
        error: 'Job not found'
      });
      return;
    }

    const response: ApiResponse<Job> = {
      success: true,
      data: job
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Get job by id error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const updateJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { id } = req.params;
    const updateData: JobUpdate = req.body;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
      return;
    }

    const db = await getDatabase();

    // Check if job exists and belongs to user
    const existingJob = await db.get(
      'SELECT id FROM jobs WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (!existingJob) {
      res.status(404).json({
        success: false,
        error: 'Job not found or access denied'
      });
      return;
    }

    // Build update query
    const updateFields: string[] = [];
    const queryParams: any[] = [];

    if (updateData.title !== undefined) {
      updateFields.push(`title = ?`);
      queryParams.push(updateData.title);
    }

    if (updateData.description !== undefined) {
      updateFields.push(`description = ?`);
      queryParams.push(updateData.description);
    }

    if (updateData.category_id !== undefined) {
      updateFields.push(`category_id = ?`);
      queryParams.push(updateData.category_id);
    }

    if (updateData.event_date !== undefined) {
      updateFields.push(`event_date = ?`);
      queryParams.push(updateData.event_date);
    }

    if (updateData.event_time !== undefined) {
      updateFields.push(`event_time = ?`);
      queryParams.push(updateData.event_time);
    }

    if (updateData.location !== undefined) {
      updateFields.push(`location = ?`);
      queryParams.push(updateData.location);
    }

    if (updateData.budget_min !== undefined) {
      updateFields.push(`budget_min = ?`);
      queryParams.push(updateData.budget_min);
    }

    if (updateData.budget_max !== undefined) {
      updateFields.push(`budget_max = ?`);
      queryParams.push(updateData.budget_max);
    }

    if (updateData.budget_type !== undefined) {
      updateFields.push(`budget_type = ?`);
      queryParams.push(updateData.budget_type);
    }

    if (updateData.requirements !== undefined) {
      updateFields.push(`requirements = ?`);
      queryParams.push(JSON.stringify(updateData.requirements));
    }

    if (updateData.status !== undefined) {
      updateFields.push(`status = ?`);
      queryParams.push(updateData.status);
    }

    if (updateFields.length === 0) {
      res.status(400).json({
        success: false,
        error: 'No fields to update'
      });
      return;
    }

    // Add updated_at and job id to params
    updateFields.push(`updated_at = datetime('now')`);
    queryParams.push(id);

    // Update job
    await db.run(
      `UPDATE jobs SET ${updateFields.join(', ')} WHERE id = ?`,
      queryParams
    );

    // Get updated job
    const job = await db.get('SELECT * FROM jobs WHERE id = ?', [id]);

    const response: ApiResponse<Job> = {
      success: true,
      data: job,
      message: 'Job updated successfully'
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const deleteJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
      return;
    }

    const db = await getDatabase();

    // Check if job exists and belongs to user
    const existingJob = await db.get(
      'SELECT id FROM jobs WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (!existingJob) {
      res.status(404).json({
        success: false,
        error: 'Job not found or access denied'
      });
      return;
    }

    // Delete job
    await db.run('DELETE FROM jobs WHERE id = ?', [id]);

    const response: ApiResponse = {
      success: true,
      message: 'Job deleted successfully'
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getMyJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { page = 1, limit = 10 } = req.query;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
      return;
    }

    const db = await getDatabase();
    const offset = (Number(page) - 1) * Number(limit);

    // Count total jobs
    const countResult = await db.get(
      'SELECT COUNT(*) as count FROM jobs WHERE user_id = ?',
      [userId]
    );
    const total = countResult.count;

    // Get user's jobs
    const jobs = await db.all(
      `SELECT j.*, c.name as category_name, c.icon as category_icon, c.color as category_color
       FROM jobs j
       JOIN categories c ON j.category_id = c.id
       WHERE j.user_id = ?
       ORDER BY j.created_at DESC
       LIMIT ? OFFSET ?`,
      [userId, Number(limit), offset]
    );

    const response: ApiResponse<Job[]> = {
      success: true,
      data: jobs,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        total_pages: Math.ceil(total / Number(limit))
      }
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Get my jobs error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};