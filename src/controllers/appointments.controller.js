import { appointmentService } from "../services/index.js";
 
export const bookAppointment = async (req, res) => {  
    try {
        await appointmentService.bookAppointment(req.user.id, req.body.doctor);
        res.json({
            success: true,
            message : "Appointment booked successfully."
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message : error.message
        });
    }
};

export const getAppointments = async (req, res) => {
    try {
        const appointments = await getAppointments(req.user.id);
        res.json({
            success: true,
            message : "Appointments fetched successfully.",
            data: appointments
        })
    } catch (error) {
         res.status(500).json({
            success: false,
            message : error.message
        });
    }
}
export const getAppointmentById = async (req, res) => {
    try {
        const appointment = await getAppointmentById(req.params.id);
        res.json({
            success: true,
            message : "Appointments fetched successfully.",
            data: appointment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message : error.message
        });
    }
};

export const cancelAppointment = async (req, res) => {
    try {
        await cancelAppointment(req.params.id);
        res.json({
            success: true,
            message : "Appointments cancelled." 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message : error.message
        });
    }
};