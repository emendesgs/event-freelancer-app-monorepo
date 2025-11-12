"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = void 0;
const web_push_1 = __importDefault(require("web-push"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const vapidKeys = {
    publicKey: process.env.VAPID_PUBLIC_KEY || '',
    privateKey: process.env.VAPID_PRIVATE_KEY || '',
};
web_push_1.default.setVapidDetails('mailto:your-email@example.com', vapidKeys.publicKey, vapidKeys.privateKey);
const sendNotification = async (subscription, payload) => {
    try {
        await web_push_1.default.sendNotification(subscription, payload);
        console.log('Push notification sent successfully.');
    }
    catch (error) {
        console.error('Error sending push notification:', error);
    }
};
exports.sendNotification = sendNotification;
//# sourceMappingURL=pushService.js.map