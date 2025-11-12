import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let db: Database | null = null;

const getDatabase = async (): Promise<Database> => {
  if (db) {
    return db;
  }

  const dbPath = path.resolve(__dirname, '..', '..', 'prisma', 'dev.db');
  
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  console.log('Connected to SQLite database:', dbPath);
  return db;
};

export default getDatabase;

export const query = async (sql: string, params: any[] = []) => {
  const db = await getDatabase();
  return db.all(sql, params);
};