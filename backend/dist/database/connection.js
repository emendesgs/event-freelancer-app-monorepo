"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const path_1 = __importDefault(require("path"));
let db = null;
const getDatabase = async () => {
    if (db) {
        return db;
    }
    const dbPath = path_1.default.join(__dirname, '../../..', 'event_freelancer.db');
    db = await (0, sqlite_1.open)({
        filename: dbPath,
        driver: sqlite3_1.default.Database
    });
    console.log('Connected to SQLite database:', dbPath);
    return db;
};
exports.default = getDatabase;
const query = async (sql, params = []) => {
    const db = await getDatabase();
    return db.all(sql, params);
};
exports.query = query;
//# sourceMappingURL=connection.js.map