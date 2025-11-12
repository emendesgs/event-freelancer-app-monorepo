"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contractController_1 = require("../controllers/contractController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/', auth_1.protect, contractController_1.create);
router.get('/:id', auth_1.protect, contractController_1.getById);
router.put('/:id/status', auth_1.protect, contractController_1.updateStatus);
exports.default = router;
//# sourceMappingURL=contractRoutes.js.map