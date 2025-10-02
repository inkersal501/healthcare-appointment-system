import pool from "../config/pg.js";
import { medicalhistoryModel, prescriptionsModel } from "../models/index.js";

export const getPatient = async (id) => {
    try {
        const patient = await pool.query(`SELECT * FROM patients WHERE userId=$1`, [id]);
        const patientProfile = patient.rows[0];
        const medicalHistory = await medicalhistoryModel.find({patientId: id}).sort({ createdAt: -1 });
        return {patientProfile, medicalHistory};
    } catch (error) {   
        throw new Error("Failed to get patient details");
    }
};
