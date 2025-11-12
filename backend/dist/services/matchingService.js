"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findJobMatchesForFreelancer = exports.findMatchesForJob = void 0;
const findMatchesForJob = async (jobId) => {
    console.log(`Finding matches for job ${jobId}`);
    return [{ freelancerId: 1, score: 0.9 }, { freelancerId: 2, score: 0.8 }];
};
exports.findMatchesForJob = findMatchesForJob;
const findJobMatchesForFreelancer = async (freelancerId) => {
    console.log(`Finding job matches for freelancer ${freelancerId}`);
    return [{ jobId: 1, score: 0.95 }, { jobId: 2, score: 0.88 }];
};
exports.findJobMatchesForFreelancer = findJobMatchesForFreelancer;
//# sourceMappingURL=matchingService.js.map