"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const calendarController_1 = require("../controllers/calendarController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/events', auth_1.protect, calendarController_1.createEvent);
router.get('/events', auth_1.protect, calendarController_1.getEvents);
exports.default = router;
//# sourceMappingURL=calendarRoutes.js.map