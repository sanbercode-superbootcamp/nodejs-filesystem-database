import { Database } from "sqlite3";

// Create database
const db = new Database('./database.db');

// Create table
const sql = `CREATE TABLE IF NOT EXISTS students(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  classroom TEXT
)`;
db.run(sql, (err) => {
  if (err) () => { throw err };
  console.log('Table students successfully created');
});

db.close();