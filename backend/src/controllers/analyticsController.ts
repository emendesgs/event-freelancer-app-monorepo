import { Request, Response } from 'express';
import * as analyticsService from '../services/analyticsService';

/**
 * @desc    Get all analytics
 * @route   GET /api/analytics
 * @access  Private (Admin)
 */
export const getAnalytics = async (_req: Request, res: Response) => {
  try {
    const [jobAnalytics, userAnalytics, financialAnalytics] = await Promise.all([
      analyticsService.getJobAnalytics(),
      analyticsService.getUserAnalytics(),
      analyticsService.getFinancialAnalytics(),
    ]);

    res.json({ 
      success: true, 
      data: { 
        jobs: jobAnalytics, 
        users: userAnalytics, 
        financials: financialAnalytics 
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to retrieve analytics' });
  }
};