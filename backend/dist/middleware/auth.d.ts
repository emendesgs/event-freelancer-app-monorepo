import { Request, Response, NextFunction } from 'express';
export interface JwtPayload {
    userId: string;
    email: string;
}
export declare const protect: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const optionalAuth: (req: Request, _res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.d.ts.map