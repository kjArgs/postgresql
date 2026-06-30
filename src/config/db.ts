import pg from "pg";
import dotenv from "dotenv";
import { Kysely, PostgresDialect } from "kysely";
import { Database } from "./types";

dotenv.config();

const { Pool } = pg;

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
    }),
  }),
});
