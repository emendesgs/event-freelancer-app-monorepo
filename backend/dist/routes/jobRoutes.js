"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jobController_1 = require("../controllers/jobController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/', auth_1.optionalAuth, jobController_1.getJobs);
router.get('/:id', auth_1.optionalAuth, jobController_1.getJobById);
router.post('/', auth_1.protect, jobController_1.createJob);
router.get('/user/me', auth_1.protect, jobController_1.getMyJobs);
router.put('/:id', auth_1.protect, jobController_1.updateJob);
router.delete('/:id', auth_1.protect, jobController_1.deleteJob);
exports.default = router;
//# sourceMappingURL=jobRoutes.js.map