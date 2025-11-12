import { Request, Response } from 'express';
import * as calendarService from '../services/calendarService';

/**
 * @desc    Create a calendar event
 * @route   POST /api/calendar/events
 * @access  Private
 */
export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = await calendarService.createCalendarEvent(req.body);
    res.status(201).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create calendar event' });
  }
};

/**
 * @desc    Get calendar events for a user
 * @route   GET /api/calendar/events
 * @access  Private
 */
export const getEvents = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const events = await calendarService.getCalendarEvents(req.user.id);
    res.json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to get calendar events' });
  }
};