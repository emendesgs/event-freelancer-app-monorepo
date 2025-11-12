"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCertificationsByFreelancer = exports.addCertification = void 0;
const connection_1 = require("../database/connection");
const addCertification = async (certification) => {
    const { freelancer_id, name, issuer, date_issued } = certification;
    const result = await (0, connection_1.query)('INSERT INTO certifications (freelancer_id, name, issuer, date_issued) VALUES ($1, $2, $3, $4) RETURNING *', [freelancer_id, name, issuer, date_issued]);
    return result[0];
};
exports.addCertification = addCertification;
const getCertificationsByFreelancer = async (freelancerId) => {
    const result = await (0, connection_1.query)('SELECT * FROM certifications WHERE freelancer_id = $1', [freelancerId]);
    return result;
};
exports.getCertificationsByFreelancer = getCertificationsByFreelancer;
//# sourceMappingURL=certificationService.js.map