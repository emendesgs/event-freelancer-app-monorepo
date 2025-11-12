"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApplication = void 0;
const uuid_1 = require("uuid");
const connection_1 = __importDefault(require("../database/connection"));
const createApplication = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { job_id, proposal, proposed_price, estimated_duration, portfolio_links } = req.body;
        if (!userId) {
            res.status(401).json({ success: false, error: 'Authentication required' });
            return;
        }
        if (!job_id || !proposal) {
            res.status(400).json({ success: false, error: 'job_id e proposal são obrigatórios' });
            return;
        }
        const db = await (0, connection_1.default)();
        const existing = await db.get('SELECT id FROM applications WHERE job_id = ? AND user_id = ?', [job_id, userId]);
        if (existing) {
            res.status(409).json({ success: false, error: 'Você já se candidatou para esta vaga.' });
            return;
        }
        const applicationId = (0, uuid_1.v4)();
        await db.run(`INSERT INTO applications (id, job_id, user_id, proposal, proposed_price, estimated_duration, portfolio_links, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`, [
            applicationId,
            job_id,
            userId,
            proposal,
            proposed_price || null,
            estimated_duration || null,
            portfolio_links ? JSON.stringify(portfolio_links) : null,
            'pending'
        ]);
        const application = await db.get('SELECT * FROM applications WHERE id = ?', [applicationId]);
        const response = {
            success: true,
            data: application,
            message: 'Candidatura enviada com sucesso!'
        };
        res.status(201).json(response);
    }
    catch (error) {
        console.error('Create application error:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
exports.createApplication = createApplication;
//# sourceMappingURL=applicationController.js.map