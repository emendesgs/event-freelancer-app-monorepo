"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicJobs = void 0;
const getPublicJobs = async (_req, res) => {
    try {
        res.json({ success: true, data: [{ id: 1, title: 'Public Job', description: 'This is a public job.', budget: 100, created_at: new Date() }] });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to retrieve public jobs' });
    }
};
exports.getPublicJobs = getPublicJobs;
//# sourceMappingURL=publicController.js.map