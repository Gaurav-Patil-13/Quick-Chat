import Message from "../models/message.js";
import User from "../models/User.js";


// get all users except the logged in user
export const getUserForSideBar = async (req, res)=>{
    try {
        const userId = req.user._id;
        const filterdUsers = await User.find({_id : {$ne:userId}}).select("-password");

        // count number of messages not seen 
        const unSeenMesages = {}
        const promises = filterdUsers.map(async (user)=>{
            const messages = await Message.find({senderId: user._id, receiverId: userId, seen: false})
            if(messages.length >0){
                unSeenMesages[user._id] = messages.length;
            }
        })
        await Promise.all(promises);
        res.json({
            success: true,
            users: filterdUsers,
            unSeenMesages
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        })
    }
} 


// get all message for selected user
export const getMessage = async(req, res)=>{
    try {

        const {id: selectedUserId} = req.params;
        const myId = req.user._id;

        const message = await Message.find({
            $or:[
                {senderId: myId, receiverId: selectedUserId},
                {senderId: selectedUserId, receiverId: myId},
            ]
        })
        
        await Message.updateMany({senderId: selectedUserId, receiverId: myId},
            {seen:true}
        );

        res.json({success:true, message});

    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        })
    }
}