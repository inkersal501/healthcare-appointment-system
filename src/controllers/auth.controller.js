import { authService } from "../services/index.js";
 
export const registerAdmin = async (req, res) => {
    try {
        const data = await authService.registerAdmin(req.body);
        res.status(201).json({
            success: true,
            message: "Admin registered successfully",
            data,
        });
    } catch (error) {
        console.error("Error registering admin:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to register admin",
            error: error.message,
        });
    }
};
 
export const registerDoctor = async (req, res) => {
    try {
        const data = await authService.registerDoctor(req.body);
        res.status(201).json({
            success: true,
            message: "Doctor registered successfully",
            data,
        });
    } catch (error) {
        console.error("Error registering doctor:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to register doctor",
            error: error.message,
        });
    }
}; 

export const registerPatient = async (req, res) => {
    try {
        const data = await authService.registerPatient(req.body);
        res.status(201).json({
            success: true,
            message: "Patient registered successfully",
            data,
        });
    } catch (error) {
        console.error("Error registering patient:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to register patient",
            error: error.message,
        });
    }
};

export const login = async (req, res) => {
    try {   
        const login = await authService.login(req.body);
    } catch (error) {
        console.error("Error login:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to login.",
            error: error.message,
        });
    }
};
