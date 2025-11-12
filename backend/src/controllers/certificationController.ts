import { Request, Response } from 'express';
import * as certificationService from '../services/certificationService';

/**
 * @desc    Add a certification for a freelancer
 * @route   POST /api/certifications
 * @access  Private
 */
export const addCertification = async (req: Request, res: Response) => {
  try {
    const certification = await certificationService.addCertification(req.body);
    res.status(201).json({ success: true, data: certification });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to add certification' });
  }
};

/**
 * @desc    Get certifications for a freelancer
 * @route   GET /api/certifications/freelancer/:id
 * @access  Private
 */
export const getCertifications = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const certifications = await certificationService.getCertificationsByFreelancer(Number(id));
    res.json({ success: true, data: certifications });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to get certifications' });
  }
};