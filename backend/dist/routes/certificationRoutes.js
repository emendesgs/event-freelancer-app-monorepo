"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const certificationController_1 = require("../controllers/certificationController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.route('/').post(auth_1.protect, certificationController_1.addCertification);
router.route('/freelancer/:id').get(auth_1.protect, certificationController_1.getCertifications);
exports.default = router;
//# sourceMappingURL=certificationRoutes.js.map