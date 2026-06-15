import pool from "@/config/db";

export const ResidentsTable = async () => {
  const query = `CREATE TABLE IF NOT EXISTS residents (
    resident_id SERIAL PRIMARY KEY,
    resident_barangay TEXT NOT NULL,
    resident_municipality TEXT NOT NULL,
    resident_province TEXT NOT NULL,
    resident_birtdate DATE NOT NULL)`;
  await pool.query(query);
};
