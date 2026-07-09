import app from "./app";
import { db } from "../src/config/db";
import { sql } from "kysely";
import { createRoutes } from "./routes";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sql`select 1`.execute(db);

    console.log("Database connected");

    createRoutes(app);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
