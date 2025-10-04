import pool from "../config/pg.js";
import { todayDate } from "../config/index.js";

export const bookAppointment = async (patient, doctor) => { 
    const checkConflict1 = await pool.query(`SELECT * FROM appointments WHERE doctorId=$1 AND patientId=$2 AND date=$3 AND time=$4`, [doctor, patient, date, time]);
    if(checkConflict1.rowCount > 0) 
        throw new Error("Already appointment booked with doctor.");
    const checkConflict2 = await pool.query(`SELECT * FROM appointments WHERE doctorId=$1 AND date=$2 AND time=$3`, [doctor, date, time]);
    if(checkConflict2.rowCount > 0) 
        throw new Error("Doctor has other appointments on the selected time.");

    const client = await pool.connect();        
    try {
        await client.query("BEGIN");
        const result = await client.query(`INSERT INTO appointments (patientId, doctorId, date, time, status, paymentId) 
            Values ($1, $2, $3, $4, $5, $6)`, [patient, doctor, date, time, "booked", ""]);
        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        throw new Error("Error booking appointment. Please try again.");
    } finally {
        client.release();
    }
};

export const getAppointments = async (doctorId) => {    
    try {
        const result = await pool.query(`SELECT a.id, a.time, a.status, u.name, u.email,
            py.amount, py.mode, py.status as payment_status
            FROM appointments a
            JOIN patients p ON p.userId = a.patientId 
            JOIN users u ON u.id = a.patientId
            JOIN payments py ON py.id= a.paymentId
            WHERE u.role='patient' AND a.doctorId=$1 AND a.date = $2 AND a.status!='cancelled'`, [doctorId, todayDate]);
        return result.rows;
    } catch (error) {
        throw new Error("Error getting appointments. Please try again.");
    }
};

export const getAppointmentById = async (appointmentId) => {
    try {
        const result = await pool.query(`SELECT a.id, a.time, a.status, u.name, u.email,
            py.amount, py.mode, py.status as payment_status
            FROM appointments a
            JOIN patients p ON p.userId = a.patientId 
            JOIN users u ON u.id = a.patientId
            JOIN payments py ON py.id= a.paymentId
            WHERE u.role='patient' AND a.id=$1`, [appointmentId]);
        return result.rows[0];
    } catch (error) {
        throw new Error("Error getting appointment. Please try again.");
    }
};

export const cancelAppointment = async (appointmentId) => {
    try {
        await pool.query(`UPDATE appointments SET status='cancelled' WHERE id=$1`, [appointmentId]);
        return;
    } catch (error) {
        throw new Error("Error cancelling appointment.");
    }
};