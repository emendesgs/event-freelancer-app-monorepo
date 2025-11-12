export declare const createContract: (jobId: number, freelancerId: number, terms: string) => Promise<{
    id: number;
    jobId: number;
    freelancerId: number;
    terms: string;
    status: string;
}>;
export declare const getContractById: (contractId: number) => Promise<{
    id: number;
    jobId: number;
    freelancerId: number;
    terms: string;
    status: string;
}>;
export declare const updateContractStatus: (contractId: number, status: string) => Promise<{
    id: number;
    jobId: number;
    freelancerId: number;
    terms: string;
    status: string;
}>;
//# sourceMappingURL=contractService.d.ts.map