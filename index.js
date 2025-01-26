const express = require('express');
const socket = require('socket.io');
const app= express();
//
// app.get('/',(req, res)=> {
//
// });
const server=app.listen(4000,()=>{
  console.log('port 4000');
});
app.use(express.static('public'));
const io=socket(server);


io.on('connection',(socket)=>{ //when conn is established...
  console.log('socket connecton', socket.id);//svaki korisnik koji udje na stranicu

//after btn click emit
//chat is object from chat.js with message and handle
    socket.on('chat',(data)=>{
      io.sockets.emit('chat',data); //ubacuje u cet i prosledjuje svim prisutnima
    });

    socket.on('typing',(data)=>{
      socket.broadcast.emit('typing', data); //sending to everyone except the writter
    });
});
