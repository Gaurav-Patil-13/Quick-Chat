import User from './../models/User.js';
import  jwt from 'jsonwebtoken';
import mongoose from "mongoose";


// Middleware to protect private routes using JWT authentication
export const protectRoute = async (req, res, next) =>{
    try {


        
        if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({
            success: false,
            message: "Database temporarily unavailable. Please retry."
        });
        }

         // 1. Get token from Authorization header 
        const token  = req.headers.token;



        

        // 2. Verify the token using the JWT secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // 3. Find the user using the ID from the decoded token
        // Exclude password field for security
        const user = await User.findById(decoded.userId).select("-password");

        // 4. If user does not exist, return an error
        if(!user) return res.json({
            success: false,
            message: "User not found"
        })
        
        // 5. Attach the user data to the request object
        req.user = user

        // 6. Allow the request to continue to the next middleware or controller
        next();
    } catch (error) {
        // 7. Handle errors such as invalid or expired token
        console.log(error.message)
        res.json({
            success: false,
            message: error.message
        }) 
    }
}