"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFinancialAnalytics = exports.getUserAnalytics = exports.getJobAnalytics = void 0;
const getJobAnalytics = async () => {
    return { totalJobs: 10, jobsByStatus: [{ status: 'open', count: 5 }, { status: 'closed', count: 5 }] };
};
exports.getJobAnalytics = getJobAnalytics;
const getUserAnalytics = async () => {
    return { totalUsers: 20, usersByRole: [{ role: 'freelancer', count: 15 }, { role: 'organizer', count: 5 }] };
};
exports.getUserAnalytics = getUserAnalytics;
const getFinancialAnalytics = async () => {
    return { totalRevenue: 5000 };
};
exports.getFinancialAnalytics = getFinancialAnalytics;
//# sourceMappingURL=analyticsService.js.map