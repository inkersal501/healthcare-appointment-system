import mongoose, {Schema, Types, model} from "mongoose";

const MedicalHistorySchema = new Schema({
    patientId: {type : Number, required: [true, "Patient Id is required."]},
    visits: [{
        date: { type: Date, required: true },
        doctorId: { type : Number, required: true },
        notes: { type : String, required: true },
        prescriptions: { type : Types.ObjectId, ref : "Prescriptions" },
    }]
});

const MedicalHistory = model("MedicalHistory", MedicalHistorySchema, "medical_history");
export default MedicalHistory;