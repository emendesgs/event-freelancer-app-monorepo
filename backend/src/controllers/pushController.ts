import { Request, Response } from 'express';
import { sendNotification } from '../services/pushService';

let subscriptions: any = []; // In-memory storage for subscriptions

/**
 * @desc    Subscribe to push notifications
 * @route   POST /api/push/subscribe
 * @access  Public
 */
export const subscribe = (req: Request, res: Response) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({ success: true, message: 'Subscribed successfully' });
};

/**
 * @desc    Send a push notification
 * @route   POST /api/push/send
 * @access  Private
 */
export const send = (req: Request, res: Response) => {
  const { title, body } = req.body;
  const payload = JSON.stringify({ title, body });

  Promise.all(
    subscriptions.map((sub: any) => sendNotification(sub, payload))
  ).then(() => {
    res.status(200).json({ success: true, message: 'Push notifications sent' });
  }).catch(err => {
    console.error('Error sending notifications', err);
    res.sendStatus(500);
  });
};