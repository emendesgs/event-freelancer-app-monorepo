export interface IService {
    id?: number;
    freelancer_id: number;
    title: string;
    description: string;
    price: number;
}
export declare const createService: (service: IService) => Promise<any>;
export declare const getServices: () => Promise<any[]>;
export declare const getServiceById: (id: number) => Promise<any>;
//# sourceMappingURL=serviceService.d.ts.map