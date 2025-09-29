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
  max: 20, // max number of clients in the pool
  idleTimeoutMillis: 30000, // close idle clients after 30s
  connectionTimeoutMillis: 2000, // return error if connection takes > 2s
});
 
pool.on("connect", () => {
  console.log("Connected to PostgreSQL");
});
 
pool.on("error", (err) => {
  console.error("Unexpected Postgres error", err);
  process.exit(-1);  
});
 
export const pgConnection = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("PostgreSQL Connected & Ready at:", res.rows[0].now);
  } catch (err) {
    console.error("PostgreSQL Connection Failed:", err.message);
    throw err;
  }
};

export default pool;
