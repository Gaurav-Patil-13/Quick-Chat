import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";

// ProfilePage allows users to update their profile image, name, and bio
const ProfilePage = () => {

  // Stores selected profile image file (used for preview before saving)
  const [selectedImg, setSelectedImg] = useState();

  // Stores user's display name
  const [name, setName] = useState("Martin Johnson");

  // Stores user's short profile bio
  const [bio, setBio] = useState("Hi Everyone, I am using QuickChat");

  // Used for navigating back after profile update
  const navigate = useNavigate();

  // Handles profile form submission
  const handleSubmit = async (event)=>{
    event.preventDefault();

    // After saving profile details, redirect user to home page
    navigate('/');
  }

  return (
    // Main page container centered both vertically and horizontally 
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">

      {/* Profile card container */}
      <div
        className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 
        flex items-center justify-between max-sm:flex-col-reverse rounded-lg "
      >
        {/* Profile edit form */} 
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-10 flex-1 ">
          
          <h3 className="text-lg">Profile details</h3>

          {/* Profile image upload with preview */}
          <label
            htmlFor="avatar"
            className="flex items-center gap-3 cursor-pointer"
          >
            {/* file input for image selection which is hidden */}
            <input
              
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />

            {/* Image preview (selected image or default avatar) */}
            <img
              src={
                selectedImg
                  ? URL.createObjectURL(selectedImg)
                  : assets.avatar_icon
              }
              alt=""
              className={`w-12 h-12 ${selectedImg && "rounded-full"}`}
            />
            Upload profile image
          </label>

          {/*name Input for updating user name  */}
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Your Name"
            required
          />
          {/* Textarea for updating user bio */}
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            className="p-2 resize-none border border-gray-500 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Write profile bio"
            rows={4}
          ></textarea>

          {/* Save button to submit profile updates */}
          <button 
           type="submit"
           className="bg-gradient-to-r from-purplr-400 to-violet-600 
            text-white p-2 rounded-full text-lg cursor-pointer"
          >
            Save
          </button>

        </form>

        {/* Right-side branding / logo */}      
        <img 
         src={assets.logo_icon} 
         alt=""
         className="max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10" 
        />

      </div>
    </div>
  );
};

export default ProfilePage;
