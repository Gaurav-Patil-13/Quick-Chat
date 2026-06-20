import mongoose from "mongoose";

// Disable mongoose buffering (VERY IMPORTANT)
mongoose.set("bufferCommands", false);

// function to connect to the mongodb database

export const connectDB = async () =>{
    try {
        
        await mongoose.connect(
            `${process.env.MONGODB_URI}/chat-box`,
            {
                serverSelectionTimeoutMS: 5000, // fail fast
                socketTimeoutMS: 45000,
            }
        );

    } catch (error) {   
        console.error("MongoDB connection failed:", error.message);
    }
}


// Connection event listeners (REGISTER ONCE)
mongoose.connection.on("disconnected", ()=> {
  console.warn("MongoDB disconnected");
});

mongoose.connection.on('connected', ()=> console.log('Database Connected'));

mongoose.connection.on("error", (err)=>{
  console.error("MongoDB error:", err.message);
});
mongoose.connection.on("reconnected", ()=>{
  console.log("MongoDB reconnected");
});
