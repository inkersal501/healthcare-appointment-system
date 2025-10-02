import { doctorService } from "../services/index.js";

export const getDoctors = async (req, res) => {
    try {
        const doctors = await doctorService.getDoctors();
        res.json({
            success: true,
            message : "Doctors fetched successfully.",
            data : doctors
        });
    } catch (error) {
        res.json({
            success: false,
            message : error.message
        });
    }
};

export const updateAvailability = async (req, res) => {
    try {
        await doctorService.updateAvailability(req.user.id, req.body.availability);
        res.json({
            success: true,
            message : "Doctor's availability updated successfully."
        });
    } catch (error) {
        res.json({
            success: false,
            message : error.message
        });
    }
};

