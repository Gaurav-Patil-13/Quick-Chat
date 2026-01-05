import mongoose from "mongoose";
import User from "./../models/User.js";
import jwt from "jsonwebtoken";

// Middleware to protect private routes using JWT authentication
export const protectRoute = async (req, res, next) => {
  try {
    // 🔹 0. Check if DB is ready (VERY IMPORTANT)
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "Database temporarily unavailable. Please retry."
      });
    }

    // 🔹 1. Get token from request headers
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    // 🔹 2. Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔹 3. Fetch user from DB
    const user = await User.findById(decoded.userId).select("-password");

    // 🔹 4. If user does not exist
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // 🔹 5. Attach user to request
    req.user = user;

    // 🔹 6. Continue
    next();

  } catch (error) {
    console.error(error.message);
    return res.status(401).json({
      success: false,
      message: error.message
    });
  }
};
