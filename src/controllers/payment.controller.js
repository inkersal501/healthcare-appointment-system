import { paymentService } from "../services/index.js";

export const createPayment = async (req, res) => {
    try {
        await paymentService.createPayment(req.body);
        res.json({
            success: true,
            message : "Payment created successfully." 
        });
    } catch (error) {   
        res.status(500).json({
            success: false,
            message : error.message
        });
    }
};

export const getPayment = async (req, res) => {
    try {
        const data = await paymentService.getPatient(req.params.id);
        res.json({
            success: true,
            message: "Payment details fetched succesfully",
            data 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message : error.message
        });
    }
};