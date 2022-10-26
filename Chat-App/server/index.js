require('dotenv').config() ;
const express = require('express') ;
const mongoose = require('mongoose') ;
const cors = require('cors') ;
const userRoute = require('./routes/userRoute') ;
const messagesRoute = require('./routes/messagesRoute') ;
const socket = require('socket.io') ;
const app = express() ;

app.use(express.json()) ;
app.use(cors()) ;


mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,
    useUnifiedTopology:true}).then(()=>{
    console.log("COnnected to DB ")
}).catch(err=>console.log(err)) ;

app.use('/api/auth',userRoute) ;
app.use('/api/messages',messagesRoute) ;










const server = app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT} ...`)
}) ;

//setup socket io
const io = socket(server,{
     cors:{
        origin:"http://localhost:3000" ,
        credentials:true ,
     } ,
}) ;

global.onlineUsers = new Map() ;// store all online users inside the Map

//to connect to io
io.on('connection',(socket)=>{
    global.chatSocket = socket ;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id) ;
    }) ;
    socket.on('send-msg',(data)=>{
      const sendUserSocket = onlineUsers.get(data.to) ;
      if(sendUserSocket){
        socket.to(sendUserSocket).emit("msg-recieve",data.message) ;
      }
    })
})
