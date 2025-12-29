import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Signup a new user

export const signup = async (req, res) => {
  // Destructure required fields from request body
  const { fullName, email, password, bio } = req.body;

  try {
    // Step 1: Validate input fields
    // If any field is missing, return error
    if (!fullName || !email || !password || !bio) {
      return res.json({
        success: false,
        message: "Missing Details",
      });
    }

    // Step 2: Check if user already exists with same email
    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        success: false,
        message: "Account already exists",
      });
    }

    // Step 3: Generate salt for password hashing
    const salt = await bcrypt.genSalt(10);

    // Step 4: Hash the user's password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Step 5: Create new user in database
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword, // store hashed password
      bio,
    });

    // Step 6: Generate JWT token using user ID
    const token = generateToken(newUser._id);

    // Step 7: Send success response to client
    res.json({
      success: true,
      userData: newUser,
      token,
      message: "Account created Successfully",
    });
  } catch (error) {
    //  Step 8: Handle unexpected errors
    console.log(error.message);

    // Send error response to client
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//  login a user

export const login = async (req, res) => {
  try {
    // Step 1: Extract email and password from request body
    const { email, password } = req.body;

    if (!email || !password) {
    return res.json({
        success: false,
        message: "Missing credentials",
    });
    }


    // Step 2: Find user in database by email
    const userData = await User.findOne({ email });

    // Step 3: If user not found, return error
    if (!userData) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Step 4: Compare entered password with stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, userData.password);

    // Step 5: If password does not match, return error
    if (!isPasswordCorrect) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Step 6: Generate JWT token for authenticated user
    const token = generateToken(userData._id);

    // Step 7: Send success response with user data and token
    res.json({
      success: true,
      userData,
      token,
      message: "Login Successfully",
    });
  } catch (error) {
    //  Step 8: Handle unexpected errors
    console.log(error.message);

    res.json({
      success: false,
      message: error.message,
    });
  }
};



// controller to check if user is autheticated

export const checkAuth = (req, res) => {
  res.json({ success: true, user: req.user });
};


// controller to update user profile details

export const updateProfile = async (req, res) => {
  try {

    // Extract updated profile details from request body
    const { profilePic, bio, fullName } = req.body;

    // Get logged-in user's ID from request (set by auth middleware) 
    const userId = req.user._id;

    // Variable to store updated user data
    let updatedUser;

    // If no new profile picture is provided
    if (!profilePic) {

      // Update only bio and fullName in database  
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { bio, fullName },
        { new: true }  // return updated document
      );
    } 
    else {

      // Upload new profile picture to Cloudinary  
      const upload = await cloudinary.uploader.upload(profilePic);

      // Update profile picture URL along with bio and fullName
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { 
            profilePic: upload.secure_url, // store Cloudinary image URL
            bio, 
            fullName 
        },
        { new: true } // return updated document
      );
    }
    
    // Send success response with updated user data
    res.json({
        success: true, 
        user: updatedUser
    });
  } catch (error) {

    // Log error for debugging
    console.log(error.message);

    // Send error response to client
    res.json({
        success: false, 
        message: error.message
    });
  }
};
