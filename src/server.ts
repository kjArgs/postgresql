import app from "./app";
import dotenv from "dotenv";
import pool from "@/config/db";
import { createUSerSession, createUserTable } from "./tables";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("PostgreSQL connected");

    //create tables
    await createUserTable();
    await createUSerSession();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

startServer();
