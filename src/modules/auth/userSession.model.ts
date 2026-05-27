import pool from "@/config/db";

export const UserSessionTable = async () => {
  const query = `CREATE TABLE IF NOT EXISTS userSession(
    session_id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(user_id),
    token TEXT NOT NULL,
    expiresAt TIMESTAMP
    )
    `;
  await pool.query(query);
};
