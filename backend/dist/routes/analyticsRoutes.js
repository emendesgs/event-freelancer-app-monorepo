"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analyticsController_1 = require("../controllers/analyticsController");
const auth_1 = require("../middleware/auth");
const admin_1 = require("../middleware/admin");
const router = (0, express_1.Router)();
router.get('/', auth_1.protect, admin_1.admin, analyticsController_1.getAnalytics);
exports.default = router;
//# sourceMappingURL=analyticsRoutes.js.map