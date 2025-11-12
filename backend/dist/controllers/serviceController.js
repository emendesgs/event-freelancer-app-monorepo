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
exports.getServiceById = exports.getServices = exports.createService = void 0;
const serviceService = __importStar(require("../services/serviceService"));
const createService = async (req, res) => {
    try {
        const service = await serviceService.createService(req.body);
        res.status(201).json({ success: true, data: service });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to create service' });
    }
};
exports.createService = createService;
const getServices = async (_req, res) => {
    try {
        const services = await serviceService.getServices();
        res.json({ success: true, data: services });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to get services' });
    }
};
exports.getServices = getServices;
const getServiceById = async (req, res) => {
    const { id } = req.params;
    try {
        const service = await serviceService.getServiceById(Number(id));
        if (service) {
            res.json({ success: true, data: service });
        }
        else {
            res.status(404).json({ success: false, error: 'Service not found' });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to get service' });
    }
};
exports.getServiceById = getServiceById;
//# sourceMappingURL=serviceController.js.map