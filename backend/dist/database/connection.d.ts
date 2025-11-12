import { Database } from 'sqlite';
declare const getDatabase: () => Promise<Database>;
export default getDatabase;
export declare const query: (sql: string, params?: any[]) => Promise<any[]>;
//# sourceMappingURL=connection.d.ts.map