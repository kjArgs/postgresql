import { AppError } from "@/utils/error.util";
import { Request, Response } from "express";
import { AddResidentServices } from "./residents.services";

export const AddResidents = async (req: Request, res: Response) => {
  try {
    const {
      resident_barangay,
      resident_municipality,
      resident_province,
      birthdate,
    } = req.body;

    //validate inputs
    if (
      !resident_barangay ||
      !resident_municipality ||
      !resident_province ||
      !birthdate
    )
      throw new AppError("All fields are required", 400, "empty fields");

    //create payload
    const payload = {
      resident_barangay,
      resident_municipality,
      resident_province,
      birthdate,
    };
    //add data to the database
    const addData = await AddResidentServices(payload);

    //verify adding resident
    if (!addData)
      throw new AppError("Failed to add resident", 409, "invalid inputs");
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Error adding resident", 500, "Server Error");
  }
};

export const GetResidents = async (req: Request, res: Response) => {
  try {
    const {
      resident_barangay,
      resident_municipality,
      resident_province,
      birthdate,
    } = req.params;
    //initialize query
    const query: Record<string, unknown> = {};

    //find data depending on the query
    

  } catch {}
};
