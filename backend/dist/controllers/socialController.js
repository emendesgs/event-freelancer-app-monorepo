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
exports.deleteSocialLink = exports.getSocialLinks = exports.addSocialLink = void 0;
const socialService = __importStar(require("../services/socialService"));
const addSocialLink = async (req, res) => {
    try {
        const socialLink = await socialService.addSocialLink(req.body);
        res.status(201).json({ success: true, data: socialLink });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to add social link' });
    }
};
exports.addSocialLink = addSocialLink;
const getSocialLinks = async (req, res) => {
    const { id } = req.params;
    try {
        const socialLinks = await socialService.getSocialLinksByUser(Number(id));
        res.json({ success: true, data: socialLinks });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to get social links' });
    }
};
exports.getSocialLinks = getSocialLinks;
const deleteSocialLink = async (req, res) => {
    const { id } = req.params;
    try {
        await socialService.deleteSocialLink(Number(id));
        res.json({ success: true, data: {} });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to delete social link' });
    }
};
exports.deleteSocialLink = deleteSocialLink;
//# sourceMappingURL=socialController.js.map