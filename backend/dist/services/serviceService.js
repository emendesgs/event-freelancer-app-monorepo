"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServiceById = exports.getServices = exports.createService = void 0;
const connection_1 = require("../database/connection");
const createService = async (service) => {
    const { freelancer_id, title, description, price } = service;
    const result = await (0, connection_1.query)('INSERT INTO services (freelancer_id, title, description, price) VALUES ($1, $2, $3, $4) RETURNING *', [freelancer_id, title, description, price]);
    return result[0];
};
exports.createService = createService;
const getServices = async () => {
    const result = await (0, connection_1.query)('SELECT * FROM services');
    return result;
};
exports.getServices = getServices;
const getServiceById = async (id) => {
    const result = await (0, connection_1.query)('SELECT * FROM services WHERE id = $1', [id]);
    return result[0];
};
exports.getServiceById = getServiceById;
//# sourceMappingURL=serviceService.js.map