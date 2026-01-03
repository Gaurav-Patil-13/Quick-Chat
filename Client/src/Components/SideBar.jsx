import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

// Sidebar component that shows user list, search, and menu actions
const SideBar = () => {

  const {getUsers, users, selectedUser, setSelectedUser, unSeenMessages, setUnSeenMessages} = useContext(ChatContext)

  const {logout, onlineUsers} = useContext(AuthContext)

  const [input, setInput ] =useState(false);

  // Used for programmatic navigation (Profile page, etc.)
  const navigate = useNavigate();

  const filteredUsers = input && users ? users.filter((user)=> user.fullName.toLowerCase().includes(input.toLowerCase())) : users || [];

  useEffect(()=>{
    getUsers();
  }, [])
  
  return (
    // Sidebar container (hidden on small screens when a user is selected)
    <div
      className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white 
      ${selectedUser ? "max-md:hidden" : ""}`}
    >
      <div className="pb-5">
        {/*  Top section containing logo and menu icon(3 dots) */}
        <div className="flex justify-between items-center">
          {/* Application logo */}
          <img src={assets.logo} alt="logo" className="max-w-40" />

          {/* Menu icon with hover-based dropdown */}
          <div className="relative py-2 group">
            <img
              src={assets.menu_icon}
              alt="Menu"
              className="max-h-5 cursor-pointer"
            />

            {/* Dropdown menu (shown on hover) */}
            <div
              className="absolute top-full right-0 z-20 w-32 p-5 bg-[#282142] 
                       border border-gray-600 text-gray-100 rounded-md 
                       hidden group-hover:block"
            >
              {/* Navigate to profile edit page */}
              <p
                onClick={() => navigate("/Profile")}
                className="cursor-pointer text-sm"
              >
                Edit Profile
              </p>

              <hr className="my-2 border-t border-gray-500" />

              {/* Logout action */}
              <p onClick={()=>logout()} className="cursor-pointer text-sm">Logout</p>
            </div>
          </div>
        </div>

        {/* Search bar for filtering users */}
        <div className="bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5">
          <img src={assets.search_icon} alt="Search" className="w-3" />
          <input
            onChange={(e) => setInput(e.target.value) }
            type="text"
            className="bg-transperent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1"
            placeholder="Search User..."
          />
        </div>

        {/* Search bar for filtering users */}
        <div className="flex flex-col">
          {filteredUsers.map((user, index) => (
            // Single user row (click selects the user)
            <div
              onClick={() => {
                setSelectedUser(user);
                setUnSeenMessages(prev => {
                  if (!prev?.[user._id]) return prev; // nothing to clear

                  const updated = { ...prev };
                  delete updated[user._id]; // or set to 0
                  return updated;
                });
              }}
              key={index}
              className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm 
                      ${selectedUser?._id === user._id && "bg-[#282142]/50"}`}
            >
               {/* Single user row (click selects the user)   */}
              <img
                src={user?.profilePic || assets.avatar_icon}
                alt="profile photo"
                className="w-[35px] aspect-[1/1] rounded-full"
              />

              {/* User name and online/offline status */}
              <div className="flex flex-col leading-5">
                <p>{user.fullName}</p>

                {/*  online/offline status */}
                {
                  onlineUsers?.includes(user._id)
                  ? ( <span className="text-green-400 text-xs">Online</span>) 
                  : ( <span className="text-neutral-400 text-xs">Offline</span>)
                }
              </div>

              {/* Unread message  */}
              {unSeenMessages?.[user._id]>0 && (
                <p className="absolute top-4 right-4 h-5 w-5 text-xs flex justify-center items-center rounded-full  bg-violet-500/50">
                  {unSeenMessages[user._id] || 0 }
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
