import mongoose, {Schema, Types, model} from "mongoose";

const PrescriptionsSchema = new Schema({
    patientId: { type: Number, required: [true, "Patient Id is required."] },
    doctorId: { type: Number, required: [true, "Doctor Id is required."] },
    medicines: [{
        name: { type: String, required: true },
        dosage: { type: String, required: true }, 
        duration: { type: String, required: true }, 
    }],
}, {timestamps: true});

const Prescriptions = model("Prescriptions", PrescriptionsSchema, "prescriptions");
export default Prescriptions;