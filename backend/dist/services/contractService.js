"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContractStatus = exports.getContractById = exports.createContract = void 0;
const createContract = async (jobId, freelancerId, terms) => {
    return { id: 1, jobId, freelancerId, terms, status: 'pending' };
};
exports.createContract = createContract;
const getContractById = async (contractId) => {
    return { id: contractId, jobId: 1, freelancerId: 1, terms: 'Sample terms', status: 'pending' };
};
exports.getContractById = getContractById;
const updateContractStatus = async (contractId, status) => {
    return { id: contractId, jobId: 1, freelancerId: 1, terms: 'Sample terms', status };
};
exports.updateContractStatus = updateContractStatus;
//# sourceMappingURL=contractService.js.map