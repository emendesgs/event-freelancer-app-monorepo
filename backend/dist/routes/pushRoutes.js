"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pushController_1 = require("../controllers/pushController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/subscribe', pushController_1.subscribe);
router.post('/send', auth_1.protect, pushController_1.send);
exports.default = router;
//# sourceMappingURL=pushRoutes.js.map