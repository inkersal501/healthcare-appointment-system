import { authService, tokenService } from "../services/index.js"; 
import { NODE_ENV } from "../config/index.js";

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
        const loginUser = await authService.login(req.body);
        const { id, email, name} = loginUser;
        const accessToken = await tokenService.generateAccessToken({ id, email});
        const refreshToken = await tokenService.generateRefreshToken({ id, email});
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: NODE_ENV === "production",
            sameSite: NODE_ENV === "production"?"none": "lax",
            maxAge: 24 * 60 * 1000, // 24 mins
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: NODE_ENV === "production",
            sameSite: NODE_ENV === "production"?"none": "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        }); 
        res.json({success: true, message : "Login successfull.", user: { id, email, name}});
    } catch (error) {
        console.error("Error login:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to login.",
            error: error.message,
        });
    }
};

export const refresh = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) {
            res.status(501).json({
                success: false,
                message: "Refresh Token not found.",
                error: error.message,
            });
        }
        const verifyToken = await tokenService.verifyRefreshToken(refreshToken);
        if(!verifyToken) {
            res.status(403).json({
                success: false,
                message: "Refresh Token is not valid.",
                error: error.message,
            });
        }   
        const {id, email} = verifyToken;
        const accessToken = await tokenService.generateAccessToken({id, email});
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: NODE_ENV === "production",
            sameSite: NODE_ENV === "production"?"none": "lax",
            maxAge: 24 * 60 * 1000, // 24 mins
        });
        res.json({success: true, message : "Access token refreshed"});
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to generate access token.",
            error: error.message,
        });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.json({ message: "Logout successfully." });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to logout.",
            error: error.message,
        });
    }
};

