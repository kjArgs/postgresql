import { Request, Response } from "express";
import { CreateUserServices } from "./users.services";
import bcrypt from "bcryptjs";
import pool from "@/config/db";

export const AddUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    //validate input fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "invalid input fields",
        message: "all fields are required",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create payload
    const payload = {
      name,
      email,
      password: hashedPassword,
    };

    //check if user already exist

    const checkUser = `
      SELECT email from users WHERE email = $1
    `;
    const isUserExist = await pool.query(checkUser, [email]);
    if (isUserExist.rows.length > 0)
      return res.status(409).json({
        success: false,
        error: "existing user",
        message: "user already exists",
      });

    //call the services
    const user = await CreateUserServices(payload);
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Failed creating user",
      });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "server error",
      message: "Error creating user",
    });
  }
};
