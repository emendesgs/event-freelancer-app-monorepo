"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/create-intent', auth_1.protect, paymentController_1.createPaymentIntent);
router.post('/webhook', paymentController_1.handlePaymentWebhook);
exports.default = router;
//# sourceMappingURL=paymentRoutes.js.map