import pool from "@/config/db";
import { ResidentDetailType } from "./residents.type";

export const AddResidentServices = async (
  payload: Omit<ResidentDetailType, "resident_id">,
) => {
  const {
    resident_barangay,
    resident_municipality,
    resident_province,
    birthdate,
  } = payload;

  const query = `INSERT INTO residents(resident_barangay,
        resident_municipality,
        resident_province,
        birthdate,) VALUES ($1, $2, $3, $3, $4) RETURNING * `;

  //add residents values
  const values = [
    "resident_barangay",
    "resident_municipality",
    "resident_province",
    "birthdate",
  ];

  //run query
  const result = await pool.query(query, values);

  return result.rows[0];
};

const GetDataServices = async (
  filter: Partial<Omit<ResidentDetailType, "resident_id">>,
) => {
  let query = `SELECT * FROM residents WHERE 1=1`;
  const value: any[] = [];
  let paramCount = 1;

  
};
