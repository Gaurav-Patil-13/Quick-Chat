import React, { useContext, useEffect, useRef, useState } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMessageTime } from '../Lib/utils';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import { IoMdArrowRoundBack } from "react-icons/io";
import toast from "react-hot-toast"

const ChatContainer = ({}) => {

  const chatBodyRef = useRef(null);
  const scrollEnd = useRef();
  
  const {messages, selectedUser, setSelectedUser, sendMessage, getMessages, setShowProfile} = useContext(ChatContext)
  const { authUser, onlineUsers} = useContext(AuthContext)
  
  const [input , setInput] = useState('')
  
  
  // handle sending Message
  const handleSendMessage = async (e)=>{
    e.preventDefault();
    if(input.trim() === "") return null;
    await sendMessage({text: input.trim()});
    setInput("")
  }
  
  // handle Sending an image
  const handleSendImage = async (e)=>{
    const file = e.target.files[0];
    if(!file || !file.type.startsWith("image/")){
      toast.error("Select an image file")
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = async ()=>{
      await sendMessage({image: reader.result})
      e.target.value = ""
    }
    
    reader.readAsDataURL(file)
  }
  
  useEffect (()=>{
    if(selectedUser){
      getMessages(selectedUser._id)
    }
  },[selectedUser])

  
  // useEffect(()=>{
  //   if(scrollEnd.current && messages){
  //     scrollEnd.current.scrollIntoView({behavior : "smooth"})
  //     }
  // },[messages])

  useEffect(() => {
  if(chatBodyRef.current){
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  }
  }, [messages]);


  
  return selectedUser ?(
    // if you clicked on any person 
    <div className='h-full min-h-0 flex flex-col backdrop-blur-lg'>

    {/*---------- header  ------------*/}
       {/* image and icon of person at top of chat box */}
       <div
         onClick={() => setShowProfile(true)}
         className='person_icon flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
          <img src={selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-8 rounded-full' />

          {/* name of person at top of chat box */}
          <p className='name flex-1 text-lg text-white flex items-center gap-2'>
           {selectedUser.fullName}
           {onlineUsers?.includes(selectedUser._id) &&<span className='green_dot w-2 h-2 rounded-full bg-green-500'></span>}
          </p>
          

          {/* help icon */} 
          <button
              onClick={(e)=>{
                e.stopPropagation(); 
                setShowProfile(false); 
                setSelectedUser(null)
              }}
              className=" md:hidden
                          bg-[#8185B2]/10 text-white text-2xl px-3 py-1 rounded-lg"
              >
          <IoMdArrowRoundBack />
          </button>
          <img 
          onClick={(e) => e.stopPropagation()}
          src={assets.help_icon} alt="" className='max-md:hidden max-w-5' />
       </div>

    {/*-------------- chat area----------------- */}
       <div  ref={chatBodyRef} className='flex-1 min-h-0 overflow-y-auto p-3 pb-6'>

          {messages?.map((msg, index)=>(
            // showing image 
            <div key={index} className={`image flex items-end gap-2 justify-end 
              ${msg.senderId !== authUser._id && 'flex-row-reverse'}`}>
              {msg.image 
              ? (<img src={msg.image} alt="" className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8' />)
              : (// showing text
               <p className={`text p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white
                ${msg.senderId === authUser._id ? 'rounded-br-none' : 'rounded-bl-none'}`}>
                {msg.text}
               </p>) 
              } 

              {/* time at which you send or recieved message */}
              <div className='time text-center text-xs'>
                  <img 
                    src={
                      msg.senderId === authUser._id 
                      ? authUser?.profilePic || assets.avatar_icon 
                      : selectedUser?.profilePic || assets.avatar_icon
                    } 
                    alt="" 
                    className='w-7 rounded-full' 
                  />
                  <p className='text-gray-500'>{formatMessageTime(msg.createdAt)}</p>
              </div>
              
            </div>
          ))}

          <div ref={scrollEnd}></div>

       </div> 

    {/* ---------------- bottom area (writing message area)----------------- */}
        <div className='shrink-0 flex items-center gap-3 p-3 border-t border-white/10'>
            <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>
              {/* writing text area */}
              <input 
                onChange={(e)=>setInput(e.target.value)}
                value={input}
                onKeyDown={(e)=> {if(e.key === "Enter") { handleSendMessage(e) }}}
                type="text" 
                placeholder='Send a Message' 
                className='flex-1 send text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400' 
              />
              {/* uploading image area  */}
              <input 
                onChange={handleSendImage}
                type="file" 
                id='image' 
                accept = 'image/png, image/jpeg' 
                hidden
              />
              <label htmlFor="image">
                <img 
                  src={assets.gallery_icon} 
                  alt="" 
                  className='w-5 mr-2 cursor-pointer' />
              </label>
            </div>

            {/* sending message area */}
            <img
              onClick={handleSendMessage} 
              src={assets.send_button} 
              alt="" 
              className='w-7 cursor-pointer' 
            />
        </div>

    </div>

  ) 
   // if you doesn't clicked on any person (by default  )
  : (
    <div className='flex flex-col h-full min-h-0 flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
        <img src={assets.logo_icon} alt="" className='max-w-16' />
        <p className='text-lg font-medium text-white'>Chat anytime, anywhere</p>
    </div>
  )
}

export default ChatContainer