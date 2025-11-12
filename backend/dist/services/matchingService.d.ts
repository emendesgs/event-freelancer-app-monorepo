export declare const findMatchesForJob: (jobId: number) => Promise<{
    freelancerId: number;
    score: number;
}[]>;
export declare const findJobMatchesForFreelancer: (freelancerId: number) => Promise<{
    jobId: number;
    score: number;
}[]>;
//# sourceMappingURL=matchingService.d.ts.map