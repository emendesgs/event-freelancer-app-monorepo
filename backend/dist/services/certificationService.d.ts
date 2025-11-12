export interface ICertification {
    id?: number;
    freelancer_id: number;
    name: string;
    issuer: string;
    date_issued: Date;
}
export declare const addCertification: (certification: ICertification) => Promise<any>;
export declare const getCertificationsByFreelancer: (freelancerId: number) => Promise<any[]>;
//# sourceMappingURL=certificationService.d.ts.map