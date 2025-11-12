"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const socialController_1 = require("../controllers/socialController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.route('/').post(auth_1.protect, socialController_1.addSocialLink);
router.route('/user/:id').get(auth_1.protect, socialController_1.getSocialLinks);
router.route('/:id').delete(auth_1.protect, socialController_1.deleteSocialLink);
exports.default = router;
//# sourceMappingURL=socialRoutes.js.map