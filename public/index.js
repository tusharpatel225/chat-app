var socket = io();
socket.on('connect', () => {
  console.log("Connected to Server");
});
socket.on('disconnect', () => {
  console.log("disconnected from Server");
});
socket.on('newMessage', (msg) => {
    console.log("New Message : ",msg);
});
