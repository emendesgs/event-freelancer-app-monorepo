export declare const getJobAnalytics: () => Promise<{
    totalJobs: number;
    jobsByStatus: {
        status: string;
        count: number;
    }[];
}>;
export declare const getUserAnalytics: () => Promise<{
    totalUsers: number;
    usersByRole: {
        role: string;
        count: number;
    }[];
}>;
export declare const getFinancialAnalytics: () => Promise<{
    totalRevenue: number;
}>;
//# sourceMappingURL=analyticsService.d.ts.map