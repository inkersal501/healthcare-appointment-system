import pool from "../config/pg.js";

export const getDoctors = async () => {
    try {
        const result = await pool.query(`SELECT u.id, u.name, u.email, d.specialization, d.availability
            FROM users u 
            JOIN doctors d ON u.id = d.userId 
            WHERE u.role = 'doctor'`);
        return result.rows;        
    } catch (error) {
        throw new Error("Failed to find doctors.");
    }
};

export const updateAvailability = async (userId, availability) => {
    try {
        await pool.query(`UPDATE doctors SET availability=$1 WHERE userId=$2`, [availability, userId]);
    } catch (error) {
        throw new Error("Failed to update doctor's availability.");
    }
};