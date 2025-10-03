import dotenv from "dotenv";
dotenv.config(); 
const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');  
const day = String(today.getDate()).padStart(2, '0');
export const todayDate = `${year}-${month}-${day}`;

export const {
  APP_PORT,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRATION,
  JWT_REFRESH_EXPIRATION,
  MONGODB_URI,
  POSTGRESQL_USER,
  POSTGRESQL_PASSWORD,
  POSTGRESQL_DATABASE,
  POSTGRESQL_HOST,
  POSTGRESQL_PORT,
  NODE_ENV, 
} = process.env; 
 