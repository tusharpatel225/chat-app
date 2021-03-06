const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage, generateLocation} = require('./utils/utils.js');
const port = process.env.PORT || 2000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(path.join(__dirname, "../public")));
io.on('connection', (socket) => {
  console.log("New client Connected");
  socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app"));
  socket.broadcast.emit('newMessage', generateMessage("Admin", "New user connected"));
  socket.on('disconnect', () => {
    console.log("client disconnected");
  });
  socket.on('createMessage', (msg, callback) => {
    console.log('Message : ',msg);
    io.emit('newMessage', generateMessage(msg.from, msg.text));
    callback("Created");
  });
    socket.on('createLocation', (data, callback) => {
    console.log('New Location : ', data);
    io.emit('newLocation', generateLocation(data.from, data.lat, data.lon));
    callback("Location created");
  });

});

server.listen(port, () => {
  console.log("server start at ",port);
});
