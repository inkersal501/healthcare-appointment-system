import { Pool } from "pg";
import {
  POSTGRESQL_USER,
  POSTGRESQL_PASSWORD,
  POSTGRESQL_HOST,
  POSTGRESQL_PORT,
  POSTGRESQL_DATABASE,
} from "./index.js";

const pool = new Pool({
  host: POSTGRESQL_HOST,
  user: POSTGRESQL_USER,
  password: POSTGRESQL_PASSWORD,
  port: POSTGRESQL_PORT,
  database: POSTGRESQL_DATABASE,
});

pool.on("connect", () => {
  console.log("Connected to PostgreSQL");
});

export const pgConnection = async () => {
  await pool.query("SELECT NOW()");
  console.log("PostgreSQL Connected & Ready");
};

export default pool;
