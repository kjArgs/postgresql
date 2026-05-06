import pool from "@/config/db";

export const UserTable = async () => {
  const query = `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
  await pool.query(query);

  await pool.query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS password TEXT
  `);
};
