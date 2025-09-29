import pool from "../config/pg.js";
import bcrypt from "bcryptjs";

const checkUser = async (email) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1 LIMIT 1",[email]);
    return result.rows[0] || null; 
  } catch (err) {
    console.error("Error checking user:", err.message);
    throw err;
  }
};

const createUser = async (name, email, password, role) => {
    
    if(!await checkUser(email)) { 
    
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); 
        const yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (name, email, password, role, createdat) 
            VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role`,
            [name, email, hashedPassword, role, today]
        );

        return result.rows[0];
    }else { 
        throw new Error("Email already exists.");
    }
};

export const registerAdmin = async ({ name, email, password }) => {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        const user = await createUser(name, email, password, "admin");

        await client.query("COMMIT");
        return user;
    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
};
 
export const registerDoctor = async ({ name,  email,  password,  specialization,  availability, fee }) => {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        const user = await createUser(name, email, password, "doctor");

        await client.query(
        `INSERT INTO doctors (userId, specialization, availability, fee) VALUES ($1, $2, $3, $4)`,
        [user.id, specialization, availability, fee]
        );

        await client.query("COMMIT");
        return user;
    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
};
 
export const registerPatient = async ({name, email, password, dob, gender, contact, address}) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const user = await createUser(name, email, password, "patient");

    await client.query(
      `INSERT INTO patients (userId, dob, gender, contact, address) 
       VALUES ($1, $2, $3, $4, $5)`,
      [user.id, dob, gender, contact, address]
    );

    await client.query("COMMIT");
    return user;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const login = async ({email, password}) => {
    try {
        const user = await checkUser(email); 
        if(!user)
            throw new Error("User not found.");
        return user;
    } catch (error) {
        throw new Error("Cannot find user.");
    }
};