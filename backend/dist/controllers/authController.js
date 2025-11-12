"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const connection_1 = __importDefault(require("../database/connection"));
const register = async (req, res) => {
    try {
        const userData = req.body;
        if (!userData.email || !userData.password || !userData.full_name) {
            res.status(400).json({
                success: false,
                error: 'Email, password and full name are required'
            });
            return;
        }
        const db = await (0, connection_1.default)();
        const existingUser = await db.get('SELECT id FROM users WHERE email = ?', [userData.email]);
        if (existingUser) {
            res.status(409).json({
                success: false,
                error: 'User with this email already exists'
            });
            return;
        }
        const saltRounds = 12;
        const passwordHash = await bcryptjs_1.default.hash(userData.password, saltRounds);
        const userId = (0, uuid_1.v4)();
        await db.run(`INSERT INTO users (id, email, password_hash, full_name, phone, bio, location, skills, rating, total_reviews, is_verified, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`, [
            userId,
            userData.email,
            passwordHash,
            userData.full_name,
            userData.phone || null,
            userData.bio || null,
            userData.location || null,
            userData.skills ? JSON.stringify(userData.skills) : null,
            0,
            0,
            0
        ]);
        const user = await db.get('SELECT id, email, full_name, phone, bio, profile_image_url, location, skills, rating, total_reviews, is_verified, created_at, updated_at FROM users WHERE id = ?', [userId]);
        const payload = {
            userId: user.id,
            email: user.email
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env['JWT_SECRET'] || 'fallback_secret');
        const response = {
            success: true,
            data: { user, token },
            message: 'User registered successfully'
        };
        res.status(201).json(response);
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                success: false,
                error: 'Email and password are required'
            });
            return;
        }
        const db = await (0, connection_1.default)();
        const user = await db.get('SELECT id, email, password_hash, full_name, phone, bio, profile_image_url, location, skills, rating, total_reviews, is_verified, created_at, updated_at FROM users WHERE email = ?', [email]);
        if (!user) {
            res.status(401).json({
                success: false,
                error: 'Invalid email or password'
            });
            return;
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password_hash || '');
        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                error: 'Invalid email or password'
            });
            return;
        }
        const payload = {
            userId: user.id,
            email: user.email
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env['JWT_SECRET'] || 'fallback_secret');
        const { password_hash, ...userWithoutPassword } = user;
        const response = {
            success: true,
            data: { user: userWithoutPassword, token },
            message: 'Login successful'
        };
        res.status(200).json(response);
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};
exports.login = login;
const getProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({
                success: false,
                error: 'User not authenticated'
            });
            return;
        }
        const db = await (0, connection_1.default)();
        const user = await db.get('SELECT id, email, full_name, phone, bio, profile_image_url, location, skills, rating, total_reviews, is_verified, created_at, updated_at FROM users WHERE id = ?', [userId]);
        if (!user) {
            res.status(404).json({
                success: false,
                error: 'User not found'
            });
            return;
        }
        const response = {
            success: true,
            data: user,
            message: 'Profile retrieved successfully'
        };
        res.status(200).json(response);
    }
    catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        const updateData = req.body;
        if (!userId) {
            res.status(401).json({
                success: false,
                error: 'User not authenticated'
            });
            return;
        }
        const db = await (0, connection_1.default)();
        const updateFields = [];
        const updateValues = [];
        if (updateData.full_name !== undefined) {
            updateFields.push(`full_name = ?`);
            updateValues.push(updateData.full_name);
        }
        if (updateData.phone !== undefined) {
            updateFields.push(`phone = ?`);
            updateValues.push(updateData.phone);
        }
        if (updateData.bio !== undefined) {
            updateFields.push(`bio = ?`);
            updateValues.push(updateData.bio);
        }
        if (updateData.location !== undefined) {
            updateFields.push(`location = ?`);
            updateValues.push(updateData.location);
        }
        if (updateData.skills !== undefined) {
            updateFields.push(`skills = ?`);
            updateValues.push(JSON.stringify(updateData.skills));
        }
        if (updateFields.length === 0) {
            res.status(400).json({
                success: false,
                error: 'No fields to update'
            });
            return;
        }
        updateFields.push(`updated_at = datetime('now')`);
        updateValues.push(userId);
        const query = `
      UPDATE users 
      SET ${updateFields.join(', ')}
      WHERE id = ?
    `;
        await db.run(query, updateValues);
        const updatedUser = await db.get('SELECT id, email, full_name, phone, bio, profile_image_url, location, skills, rating, total_reviews, is_verified, created_at, updated_at FROM users WHERE id = ?', [userId]);
        const response = {
            success: true,
            data: updatedUser,
            message: 'Profile updated successfully'
        };
        res.status(200).json(response);
    }
    catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};
exports.updateProfile = updateProfile;
//# sourceMappingURL=authController.js.map