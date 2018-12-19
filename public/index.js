var socket = io();
var ol = document.getElementById('msgList');
socket.on('connect', () => {
  console.log("Connected to Server");
});
socket.on('disconnect', () => {
  console.log("disconnected from Server");
});
socket.on('newMessage', (msg) => {
  var li = document.createElement('li');
  var text = document.createTextNode(msg.from+" : "+msg.text);
  li.appendChild(text);
  ol.appendChild(li);
});
function msgSend()
{
  var msg = document.getElementById('txtMsg').value;
  socket.emit('createMessage', {from : "Tushar", text : msg}, (data) => {
    console.log("From server : ",data);
  });
    return false;
}
