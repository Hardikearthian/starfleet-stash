import Database from 'better-sqlite3';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);
const databasePath = path.join(currentDirectory, 'expenses.db');

const database = new Database(databasePath);

database.exec(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL CHECK (amount > 0),
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    note TEXT DEFAULT '',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

const expenseColumns = database
  .prepare('PRAGMA table_info(expenses)')
  .all();

const hasUserIdColumn = expenseColumns.some(
  (column) => column.name === 'user_id',
);

if (!hasUserIdColumn) {
  database.exec(`
    ALTER TABLE expenses
    ADD COLUMN user_id TEXT
  `);
}
export default database;