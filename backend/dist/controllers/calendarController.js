"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvents = exports.createEvent = void 0;
const calendarService = __importStar(require("../services/calendarService"));
const createEvent = async (req, res) => {
    try {
        const event = await calendarService.createCalendarEvent(req.body);
        res.status(201).json({ success: true, data: event });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to create calendar event' });
    }
};
exports.createEvent = createEvent;
const getEvents = async (req, res) => {
    try {
        const events = await calendarService.getCalendarEvents(req.user.id);
        res.json({ success: true, data: events });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to get calendar events' });
    }
};
exports.getEvents = getEvents;
//# sourceMappingURL=calendarController.js.map