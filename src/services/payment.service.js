import { todayDate } from "../config/index.js";
import pool from "../config/pg.js";

export const createPayment = async ({appointmentId, amount, mode, mode}) =>{
    const client = pool.connect();
    try {
        await client.query("BEGIN");
        const result = await client.query(`INSERT INTO payments (appointmentId, amount, mode, status, createdAt)
            VALUES($1, $2, $3, $4, $5) RETURNING id`, [appointmentId, amount, mode, mode, todayDate]);
        const paymentId = result.rows[0].id;
        await client.query(`UPDATE appointments SET paymentId=$1 WHERE id=$2`, [paymentId, appointmentId]);
        await client.query("COMMIT");
        return;
    } catch (error) {
        await client.query("ROLLBACK");
        throw new Error("Payment Creation failed.");
    } finally {
        client.release();
    }
};

export const getPayment = async (paymentId) => {
    try {
        const result = await pool.query(`SELECT * FROM payments WHERE id=$1`, [paymentId]);
        return result.rows[0];
    } catch (error) {
        throw new Error("Error getting payment details.");
    }
};
