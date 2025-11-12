import { Request, Response } from 'express';
import * as serviceService from '../services/serviceService';

/**
 * @desc    Create a service
 * @route   POST /api/services
 * @access  Private
 */
export const createService = async (req: Request, res: Response) => {
  try {
    const service = await serviceService.createService(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create service' });
  }
};

/**
 * @desc    Get all services
 * @route   GET /api/services
 * @access  Public
 */
export const getServices = async (_req: Request, res: Response) => {
  try {
    const services = await serviceService.getServices();
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to get services' });
  }
};

/**
 * @desc    Get a service by ID
 * @route   GET /api/services/:id
 * @access  Public
 */
export const getServiceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const service = await serviceService.getServiceById(Number(id));
    if (service) {
      res.json({ success: true, data: service });
    } else {
      res.status(404).json({ success: false, error: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to get service' });
  }
};