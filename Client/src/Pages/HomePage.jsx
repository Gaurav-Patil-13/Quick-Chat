import React, { useContext, useState } from 'react'
import SideBar from './../Components/SideBar';
import ChatContainer from './../Components/ChatContainer';
import RightSideBar from '../Components/RightSideBar';
import { ChatContext } from '../../context/ChatContext';

const HomePage = () => {
  
  const {selectedUser, showProfile} = useContext(ChatContext)

  return (
    <div className='border w-full h-screen sm:px-[15%] sm:py-[5%]'>


      {/* <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl 
        overflow-hidden h-[100%] grid grid-cols-1 relative 
        ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]':'md:grid-cols-2'}`}
      >
        <SideBar />
        <ChatContainer />
        <RightSideBar  />

      </div> */}




      {/* DESKTOP */}
      <div
        className={`hidden md:grid h-full min-h-0
          backdrop-blur-xl border-2 border-gray-600 rounded-2xl
          transition-all duration-300
          ${selectedUser && showProfile
              ? 'grid-cols-[1fr_1.5fr_1fr]'
              : selectedUser
              ? 'grid-cols-[1fr_3fr]'
              : 'grid-cols-2'
          }`}
      >
        <SideBar />
        <ChatContainer />
        {selectedUser && showProfile && <RightSideBar />}
      </div>

      {/* MOBILE    */} 
      <div className="md:hidden h-full">
        {!selectedUser && <SideBar />}
        {selectedUser && !showProfile && <ChatContainer />}
        {selectedUser && showProfile && <RightSideBar />}
      </div> 


    </div>
  )
}

export default HomePage