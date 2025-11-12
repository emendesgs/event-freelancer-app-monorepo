"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const matchingController_1 = require("../controllers/matchingController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/jobs/:id', auth_1.protect, matchingController_1.getJobMatches);
router.get('/freelancers/:id', auth_1.protect, matchingController_1.getFreelancerMatches);
exports.default = router;
//# sourceMappingURL=matchingRoutes.js.map