"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageHistory = void 0;
const getMessageHistory = async (req, res) => {
    const { room } = req.params;
    try {
        res.json({ success: true, messages: [{ id: 1, room, message: 'Hello!', sender: 'user1', timestamp: new Date() }] });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to retrieve messages' });
    }
};
exports.getMessageHistory = getMessageHistory;
//# sourceMappingURL=messageController.js.map