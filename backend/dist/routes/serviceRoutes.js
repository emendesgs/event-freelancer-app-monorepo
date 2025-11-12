"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serviceController_1 = require("../controllers/serviceController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.route('/').post(auth_1.protect, serviceController_1.createService).get(serviceController_1.getServices);
router.route('/:id').get(serviceController_1.getServiceById);
exports.default = router;
//# sourceMappingURL=serviceRoutes.js.map