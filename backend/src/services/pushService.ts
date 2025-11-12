import webpush from 'web-push';
import dotenv from 'dotenv';

dotenv.config();

const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY || '',
  privateKey: process.env.VAPID_PRIVATE_KEY || '',
};

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export const sendNotification = async (subscription: webpush.PushSubscription, payload: string) => {
  try {
    await webpush.sendNotification(subscription, payload);
    console.log('Push notification sent successfully.');
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
};