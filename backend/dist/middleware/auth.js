"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuth = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connection_1 = __importDefault(require("../database/connection"));
const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({ success: false, error: 'Access token required' });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env['JWT_SECRET'] || 'fallback_secret');
        const db = await (0, connection_1.default)();
        const user = await db.get('SELECT id, email, full_name, phone, bio, profile_image_url, location, skills, rating, total_reviews, is_verified, created_at, updated_at FROM users WHERE id = ?', [decoded.userId]);
        if (!user) {
            res.status(401).json({ success: false, error: 'Invalid token' });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            res.status(403).json({ success: false, error: 'Invalid token' });
            return;
        }
        console.error('Auth middleware error:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
exports.protect = protect;
const optionalAuth = async (req, _res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            next();
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env['JWT_SECRET'] || 'fallback_secret');
        const db = await (0, connection_1.default)();
        const user = await db.get('SELECT id, email, full_name, phone, bio, profile_image_url, location, skills, rating, total_reviews, is_verified, created_at, updated_at FROM users WHERE id = ?', [decoded.userId]);
        if (user) {
            req.user = user;
        }
        next();
    }
    catch (error) {
        next();
    }
};
exports.optionalAuth = optionalAuth;
//# sourceMappingURL=auth.js.map