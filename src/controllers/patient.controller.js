import { patientService } from "../services/index.js";

export const getPatient = async (req, res) => {    
    try {
        const patientDetails = await patientService.getPatient(req.params.id); 
        res.json({
            status : true,
            message: "Patient details fetched succesfully.",
            data : patientDetails
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};