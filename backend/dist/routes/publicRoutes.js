"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publicController_1 = require("../controllers/publicController");
const router = (0, express_1.Router)();
router.get('/jobs', publicController_1.getPublicJobs);
exports.default = router;
//# sourceMappingURL=publicRoutes.js.map