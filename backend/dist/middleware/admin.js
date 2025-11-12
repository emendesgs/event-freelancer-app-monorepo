"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = void 0;
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    }
    else {
        res.status(401).json({ success: false, error: 'Not authorized as an admin' });
    }
};
exports.admin = admin;
//# sourceMappingURL=admin.js.map