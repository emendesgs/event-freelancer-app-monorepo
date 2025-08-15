import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let db: Database | null = null;

const getDatabase = async (): Promise<Database> => {
  if (db) {
    return db;
  }

  const dbPath = path.join(__dirname, '../../..', 'event_freelancer.db');
  
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  console.log('Connected to SQLite database:', dbPath);
  return db;
};

export default getDatabase;
