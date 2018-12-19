const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const port = process.env.PORT || 2000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(path.join(__dirname, "../public")));
io.on('connection', (socket) => {
  console.log("New client Connected");

  socket.on('disconnect', () => {
    console.log("client disconnected");
  });
  socket.on('createMessage', (msg) => {
    console.log('Message : ',msg);
    io.emit('newMessage', {from : msg.from, text : msg.text, createdAt : new Date().getTime()});
  });

});

server.listen(port, () => {
  console.log("server start at ",port);
});
