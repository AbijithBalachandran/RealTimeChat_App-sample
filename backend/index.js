const express = require('express');
const app  = express();
const {createServer} = require('node:http')
const {Server} = require('socket.io');

const server = createServer(app);

const io  = new Server(server,{
    cors:{
        origin:"*"
    }
});

const cors = require('cors');

app.use(cors());

app.get('/',(req,res)=>{
    res.send('Hello world')
})


io.on('connection',(socket)=>{
    console.log('a user connected');
    socket.on("join",(data)=>{
        console.log('join',data);
    });
    socket.on('chat',(data)=>{
        console.log("chat",data);
        io.emit('chat-received',data)
    })
})


server.listen(3000,()=>{
    console.log('http://localhost:3000');
});