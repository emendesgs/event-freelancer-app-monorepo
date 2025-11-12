import { Request, Response } from 'express';
import * as contractService from '../services/contractService';

/**
 * @desc    Create a contract
 * @route   POST /api/contracts
 * @access  Private
 */
export const create = async (req: Request, res: Response) => {
  const { jobId, freelancerId, terms } = req.body;
  try {
    const contract = await contractService.createContract(jobId, freelancerId, terms);
    res.status(201).json({ success: true, data: contract });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create contract' });
  }
};

/**
 * @desc    Get a contract by ID
 * @route   GET /api/contracts/:id
 * @access  Private
 */
export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const contract = await contractService.getContractById(Number(id));
    if (contract) {
      res.json({ success: true, data: contract });
    } else {
      res.status(404).json({ success: false, error: 'Contract not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to get contract' });
  }
};

/**
 * @desc    Update a contract's status
 * @route   PUT /api/contracts/:id/status
 * @access  Private
 */
export const updateStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const contract = await contractService.updateContractStatus(Number(id), status);
    res.json({ success: true, data: contract });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update contract status' });
  }
};