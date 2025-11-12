import { Request, Response } from 'express';
import * as matchingService from '../services/matchingService';

/**
 * @desc    Find matches for a job
 * @route   GET /api/matching/jobs/:id
 * @access  Private
 */
export const getJobMatches = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const matches = await matchingService.findMatchesForJob(Number(id));
    res.json({ success: true, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to find matches for job' });
  }
};

/**
 * @desc    Find job matches for a freelancer
 * @route   GET /api/matching/freelancers/:id
 * @access  Private
 */
export const getFreelancerMatches = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const matches = await matchingService.findJobMatchesForFreelancer(Number(id));
    res.json({ success: true, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to find matches for freelancer' });
  }
};