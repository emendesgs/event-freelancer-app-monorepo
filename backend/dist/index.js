"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const chat_1 = require("./chat");
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: process.env['NODE_ENV'] === 'production'
            ? ['https://yourdomain.com']
            : ['http://localhost:3000', 'http://localhost:3001'],
        credentials: true
    }
});
const PORT = process.env['PORT'] || 5000;
const limiter = (0, express_rate_limit_1.default)({
    windowMs: parseInt(process.env['RATE_LIMIT_WINDOW_MS'] || '900000'),
    max: parseInt(process.env['RATE_LIMIT_MAX_REQUESTS'] || '100'),
    message: {
        success: false,
        error: 'Too many requests from this IP, please try again later.'
    }
});
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env['NODE_ENV'] === 'production'
        ? ['https://yourdomain.com']
        : ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
}));
app.use((0, compression_1.default)());
app.use(limiter);
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.use('/api', routes_1.default);
(0, chat_1.handleChat)(io);
app.use('*', (_req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});
app.use((err, _req, res, _next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        success: false,
        error: process.env['NODE_ENV'] === 'production'
            ? 'Internal server error'
            : err.message
    });
});
httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env['NODE_ENV'] || 'development'}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📱 Mobile app ready: ${process.env.NODE_ENV === 'production' ? 'Yes' : 'No'}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map