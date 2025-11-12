"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messageController_1 = require("../controllers/messageController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/:room', auth_1.protect, messageController_1.getMessageHistory);
exports.default = router;
//# sourceMappingURL=messageRoutes.js.map