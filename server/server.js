import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import {connectDB} from "./lib/db.js";
import userRouter from "./Routes/userRoutes.js";
import messageRouter from "./Routes/messageRoutes.js";
import {Server} from "socket.io"; 

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize socket.io server 
export const io = new Server(server,{
    cors:{origin:"*"}
})


//Store online Users
export const userSocketMap = {};// {userId : socketId}

// Socket.io connection Handler 
io.on("connection",(socket)=>{
    const userId = socket.handshake.query.userId;
    console.log("user connected",userId);
    if(userId) userSocketMap[userId] = socket.id;
    

    //Emit online users to all connected clients 
    io.emit("getOnlineusers",Object.keys(userSocketMap));


    socket.on("diconnect",()=>{
        console.log("User Disconnected ",userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
        
    })

})


// middleware setup 
app.use(express.json({limit:"4mb"}));
app.use(cors());


// Routes setup
app.use("/api/status",(req,res)=>res.send("server is live "));
app.use("/api/auth",userRouter);

app.use("/api/messages",messageRouter);


// connect to Mongodb

await connectDB();

const PORT = process.env.PORT||5000;
server.listen(PORT,()=>console.log("server is running on port:"+PORT))