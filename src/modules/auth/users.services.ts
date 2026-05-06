import pool from "@/config/db";
import { UserType } from "./users.type";

export const CreateUserServices = async (
  payload: Omit<UserType, "id" | "created_at">,
) => {
  const { name, email, password } = payload;

  const query = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  //add the values
  const values = [name, email, password];

  //run query
  const result = await pool.query(query, values);
  
  return result.rows[0];
};
