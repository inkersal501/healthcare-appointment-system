import { NODE_ENV } from "../config/index.js"; 
import { authService, tokenService } from "../services/index.js";

export const authenticate = async (req, res, next) => {
    try {
        let token = req.cookies.accessToken;
    
        let decoded = tokenService.verifyAccessToken(token);
        let user;
        
        if (!decoded) { 
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) 
                return res.status(401).json({ message: "No token found." });

            const refreshDecoded = tokenService.verifyRefreshToken(refreshToken);
            if (!refreshDecoded) 
                return res.status(401).json({ message: "Invalid or expired refresh token." });
        
            user = await authService.checkUser(refreshDecoded.email);
            if (!user) 
                return res.status(404).json({ message: "User not found" });

            const newAccessToken = tokenService.generateAccessToken(user);

            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 24 * 60 * 1000,
            });
            decoded = { id: user._id };
        }
        if(!user){
            user = await authService.checkUser(refreshDecoded.email);
            if(!user)
                return res.status(404).json({ message: "User not found" });
        }
        
        req.user = user;
        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }

        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

