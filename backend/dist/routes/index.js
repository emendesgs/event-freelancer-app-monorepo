"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const jobRoutes_1 = __importDefault(require("./jobRoutes"));
const applicationRoutes_1 = __importDefault(require("./applicationRoutes"));
const paymentRoutes_1 = __importDefault(require("./paymentRoutes"));
const messageRoutes_1 = __importDefault(require("./messageRoutes"));
const pushRoutes_1 = __importDefault(require("./pushRoutes"));
const contractRoutes_1 = __importDefault(require("./contractRoutes"));
const analyticsRoutes_1 = __importDefault(require("./analyticsRoutes"));
const calendarRoutes_1 = __importDefault(require("./calendarRoutes"));
const publicRoutes_1 = __importDefault(require("./publicRoutes"));
const matchingRoutes_1 = __importDefault(require("./matchingRoutes"));
const certificationRoutes_1 = __importDefault(require("./certificationRoutes"));
const serviceRoutes_1 = __importDefault(require("./serviceRoutes"));
const socialRoutes_1 = __importDefault(require("./socialRoutes"));
const router = (0, express_1.Router)();
router.get('/health', (_req, res) => {
    res.json({
        success: true,
        message: 'Event Freelancer API is running',
        timestamp: new Date().toISOString()
    });
});
router.use('/auth', authRoutes_1.default);
router.use('/jobs', jobRoutes_1.default);
router.use('/applications', applicationRoutes_1.default);
router.use('/payments', paymentRoutes_1.default);
router.use('/messages', messageRoutes_1.default);
router.use('/push', pushRoutes_1.default);
router.use('/contracts', contractRoutes_1.default);
router.use('/analytics', analyticsRoutes_1.default);
router.use('/calendar', calendarRoutes_1.default);
router.use('/public', publicRoutes_1.default);
router.use('/matching', matchingRoutes_1.default);
router.use('/certifications', certificationRoutes_1.default);
router.use('/services', serviceRoutes_1.default);
router.use('/socials', socialRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map