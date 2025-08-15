import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import getDatabase from '../database/connection';
import { ApiResponse } from '../types';

export const createApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { job_id, proposal, proposed_price, estimated_duration, portfolio_links } = req.body;

    if (!userId) {
      res.status(401).json({ success: false, error: 'Authentication required' });
      return;
    }
    if (!job_id || !proposal) {
      res.status(400).json({ success: false, error: 'job_id e proposal são obrigatórios' });
      return;
    }

    const db = await getDatabase();

    // Verifica se já existe candidatura para esse job e user
    const existing = await db.get('SELECT id FROM applications WHERE job_id = ? AND user_id = ?', [job_id, userId]);
    if (existing) {
      res.status(409).json({ success: false, error: 'Você já se candidatou para esta vaga.' });
      return;
    }

    const applicationId = uuidv4();
    await db.run(
      `INSERT INTO applications (id, job_id, user_id, proposal, proposed_price, estimated_duration, portfolio_links, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      [
        applicationId,
        job_id,
        userId,
        proposal,
        proposed_price || null,
        estimated_duration || null,
        portfolio_links ? JSON.stringify(portfolio_links) : null,
        'pending'
      ]
    );

    const application = await db.get('SELECT * FROM applications WHERE id = ?', [applicationId]);

    const response: ApiResponse = {
      success: true,
      data: application,
      message: 'Candidatura enviada com sucesso!'
    };
    res.status(201).json(response);
  } catch (error) {
    console.error('Create application error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
