import { Request, Response } from 'express';
import * as socialService from '../services/socialService';

/**
 * @desc    Add a social media link
 * @route   POST /api/socials
 * @access  Private
 */
export const addSocialLink = async (req: Request, res: Response) => {
  try {
    const socialLink = await socialService.addSocialLink(req.body);
    res.status(201).json({ success: true, data: socialLink });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to add social link' });
  }
};

/**
 * @desc    Get social media links for a user
 * @route   GET /api/socials/user/:id
 * @access  Private
 */
export const getSocialLinks = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const socialLinks = await socialService.getSocialLinksByUser(Number(id));
    res.json({ success: true, data: socialLinks });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to get social links' });
  }
};

/**
 * @desc    Delete a social media link
 * @route   DELETE /api/socials/:id
 * @access  Private
 */
export const deleteSocialLink = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await socialService.deleteSocialLink(Number(id));
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete social link' });
  }
};