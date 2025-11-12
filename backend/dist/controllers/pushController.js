"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = exports.subscribe = void 0;
const pushService_1 = require("../services/pushService");
let subscriptions = [];
const subscribe = (req, res) => {
    const subscription = req.body;
    subscriptions.push(subscription);
    res.status(201).json({ success: true, message: 'Subscribed successfully' });
};
exports.subscribe = subscribe;
const send = (req, res) => {
    const { title, body } = req.body;
    const payload = JSON.stringify({ title, body });
    Promise.all(subscriptions.map((sub) => (0, pushService_1.sendNotification)(sub, payload))).then(() => {
        res.status(200).json({ success: true, message: 'Push notifications sent' });
    }).catch(err => {
        console.error('Error sending notifications', err);
        res.sendStatus(500);
    });
};
exports.send = send;
//# sourceMappingURL=pushController.js.map