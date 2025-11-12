"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyJobs = exports.deleteJob = exports.updateJob = exports.getJobById = exports.getJobs = exports.createJob = void 0;
const uuid_1 = require("uuid");
const connection_1 = __importDefault(require("../database/connection"));
const createJob = async (req, res) => {
    try {
        const userId = req.user?.id;
        const jobData = req.body;
        if (!userId) {
            res.status(401).json({
                success: false,
                error: 'Authentication required'
            });
            return;
        }
        if (!jobData.title || !jobData.description || !jobData.category_id) {
            res.status(400).json({
                success: false,
                error: 'Title, description and category_id are required'
            });
            return;
        }
        const db = await (0, connection_1.default)();
        const jobId = (0, uuid_1.v4)();
        await db.run(`INSERT INTO jobs (id, user_id, category_id, title, description, event_date, event_time, location, budget_min, budget_max, budget_type, requirements)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            jobId,
            userId,
            jobData.category_id,
            jobData.title,
            jobData.description,
            jobData.event_date || null,
            jobData.event_time || null,
            jobData.location || null,
            jobData.budget_min || null,
            jobData.budget_max || null,
            jobData.budget_type || 'fixed',
            jobData.requirements ? JSON.stringify(jobData.requirements) : null
        ]);
        const job = await db.get('SELECT * FROM jobs WHERE id = ?', [jobId]);
        const response = {
            success: true,
            data: job,
            message: 'Job created successfully'
        };
        res.status(201).json(response);
    }
    catch (error) {
        console.error('Create job error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};
exports.createJob = createJob;
const getJobs = async (req, res) => {
    try {
        const { page = 1, limit = 10, sort_by = 'created_at', sort_order = 'desc', category_id, location, budget_min, budget_max, status, date_from, date_to } = req.query;
        const offset = (Number(page) - 1) * Number(limit);
        const filters = {
            category_id: category_id,
            location: location,
            budget_min: budget_min ? Number(budget_min) : undefined,
            budget_max: budget_max ? Number(budget_max) : undefined,
            status: status,
            date_from: date_from ? new Date(date_from) : undefined,
            date_to: date_to ? new Date(date_to) : undefined
        };
        const db = await (0, connection_1.default)();
        let whereClause = 'WHERE j.status = \'open\'';
        const queryParams = [];
        if (filters.category_id) {
            whereClause += ` AND j.category_id = ?`;
            queryParams.push(filters.category_id);
        }
        if (filters.location) {
            whereClause += ` AND LOWER(j.location) LIKE LOWER(?)`;
            queryParams.push(`%${filters.location}%`);
        }
        if (filters.budget_min !== undefined) {
            whereClause += ` AND j.budget_max >= ?`;
            queryParams.push(filters.budget_min);
        }
        if (filters.budget_max !== undefined) {
            whereClause += ` AND j.budget_min <= ?`;
            queryParams.push(filters.budget_max);
        }
        if (filters.date_from) {
            whereClause += ` AND j.event_date >= ?`;
            queryParams.push(filters.date_from.toISOString().split('T')[0]);
        }
        if (filters.date_to) {
            whereClause += ` AND j.event_date <= ?`;
            queryParams.push(filters.date_to.toISOString().split('T')[0]);
        }
        const countResult = await db.get(`SELECT COUNT(*) as count FROM jobs j ${whereClause}`, queryParams);
        const total = countResult.count;
        const jobsResult = await db.all(`SELECT j.*, 
              u.full_name as user_name, u.profile_image_url as user_image, u.rating as user_rating,
              c.name as category_name, c.icon as category_icon, c.color as category_color
       FROM jobs j
       JOIN users u ON j.user_id = u.id
       JOIN categories c ON j.category_id = c.id
       ${whereClause}
       ORDER BY j.${sort_by} ${sort_order.toUpperCase()}
       LIMIT ? OFFSET ?`, [...queryParams, Number(limit), offset]);
        const jobs = jobsResult;
        const response = {
            success: true,
            data: jobs,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                total_pages: Math.ceil(total / Number(limit))
            }
        };
        res.status(200).json(response);
    }
    catch (error) {
        console.error('Get jobs error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};
exports.getJobs = getJobs;
const getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const db = await (0, connection_1.default)();
        await db.run('UPDATE jobs SET views_count = views_count + 1 WHERE id = ?', [id]);
        const job = await db.get(`SELECT j.*, 
              u.full_name as user_name, u.profile_image_url as user_image, u.rating as user_rating, u.bio as user_bio,
              c.name as category_name, c.icon as category_icon, c.color as category_color
       FROM jobs j
       JOIN users u ON j.user_id = u.id
       JOIN categories c ON j.category_id = c.id
       WHERE j.id = ?`, [id]);
        if (!job) {
            res.status(404).json({
                success: false,
                error: 'Job not found'
            });
            return;
        }
        const response = {
            success: true,
            data: job
        };
        res.status(200).json(response);
    }
    catch (error) {
        console.error('Get job by id error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};
exports.getJobById = getJobById;
const updateJob = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;
        const updateData = req.body;
        if (!userId) {
            res.status(401).json({
                success: false,
                error: 'Authentication required'
            });
            return;
        }
        const db = await (0, connection_1.default)();
        const existingJob = await db.get('SELECT id FROM jobs WHERE id = ? AND user_id = ?', [id, userId]);
        if (!existingJob) {
            res.status(404).json({
                success: false,
                error: 'Job not found or access denied'
            });
            return;
        }
        const updateFields = [];
        const queryParams = [];
        if (updateData.title !== undefined) {
            updateFields.push(`title = ?`);
            queryParams.push(updateData.title);
        }
        if (updateData.description !== undefined) {
            updateFields.push(`description = ?`);
            queryParams.push(updateData.description);
        }
        if (updateData.category_id !== undefined) {
            updateFields.push(`category_id = ?`);
            queryParams.push(updateData.category_id);
        }
        if (updateData.event_date !== undefined) {
            updateFields.push(`event_date = ?`);
            queryParams.push(updateData.event_date);
        }
        if (updateData.event_time !== undefined) {
            updateFields.push(`event_time = ?`);
            queryParams.push(updateData.event_time);
        }
        if (updateData.location !== undefined) {
            updateFields.push(`location = ?`);
            queryParams.push(updateData.location);
        }
        if (updateData.budget_min !== undefined) {
            updateFields.push(`budget_min = ?`);
            queryParams.push(updateData.budget_min);
        }
        if (updateData.budget_max !== undefined) {
            updateFields.push(`budget_max = ?`);
            queryParams.push(updateData.budget_max);
        }
        if (updateData.budget_type !== undefined) {
            updateFields.push(`budget_type = ?`);
            queryParams.push(updateData.budget_type);
        }
        if (updateData.requirements !== undefined) {
            updateFields.push(`requirements = ?`);
            queryParams.push(JSON.stringify(updateData.requirements));
        }
        if (updateData.status !== undefined) {
            updateFields.push(`status = ?`);
            queryParams.push(updateData.status);
        }
        if (updateFields.length === 0) {
            res.status(400).json({
                success: false,
                error: 'No fields to update'
            });
            return;
        }
        updateFields.push(`updated_at = datetime('now')`);
        queryParams.push(id);
        await db.run(`UPDATE jobs SET ${updateFields.join(', ')} WHERE id = ?`, queryParams);
        const job = await db.get('SELECT * FROM jobs WHERE id = ?', [id]);
        const response = {
            success: true,
            data: job,
            message: 'Job updated successfully'
        };
        res.status(200).json(response);
    }
    catch (error) {
        console.error('Update job error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};
exports.updateJob = updateJob;
const deleteJob = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;
        if (!userId) {
            res.status(401).json({
                success: false,
                error: 'Authentication required'
            });
            return;
        }
        const db = await (0, connection_1.default)();
        const existingJob = await db.get('SELECT id FROM jobs WHERE id = ? AND user_id = ?', [id, userId]);
        if (!existingJob) {
            res.status(404).json({
                success: false,
                error: 'Job not found or access denied'
            });
            return;
        }
        await db.run('DELETE FROM jobs WHERE id = ?', [id]);
        const response = {
            success: true,
            message: 'Job deleted successfully'
        };
        res.status(200).json(response);
    }
    catch (error) {
        console.error('Delete job error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};
exports.deleteJob = deleteJob;
const getMyJobs = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { page = 1, limit = 10 } = req.query;
        if (!userId) {
            res.status(401).json({
                success: false,
                error: 'Authentication required'
            });
            return;
        }
        const db = await (0, connection_1.default)();
        const offset = (Number(page) - 1) * Number(limit);
        const countResult = await db.get('SELECT COUNT(*) as count FROM jobs WHERE user_id = ?', [userId]);
        const total = countResult.count;
        const jobs = await db.all(`SELECT j.*, c.name as category_name, c.icon as category_icon, c.color as category_color
       FROM jobs j
       JOIN categories c ON j.category_id = c.id
       WHERE j.user_id = ?
       ORDER BY j.created_at DESC
       LIMIT ? OFFSET ?`, [userId, Number(limit), offset]);
        const response = {
            success: true,
            data: jobs,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                total_pages: Math.ceil(total / Number(limit))
            }
        };
        res.status(200).json(response);
    }
    catch (error) {
        console.error('Get my jobs error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};
exports.getMyJobs = getMyJobs;
//# sourceMappingURL=jobController.js.map