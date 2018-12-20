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
socket.on('newLocation', (msg) => {
  var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = msg.mapURL;
    a.target = "_blank";
    a.appendChild(document.createTextNode("My location"));
      li.appendChild(document.createTextNode(msg.from+" : "));
  li.appendChild(a);
  ol.appendChild(li);
});
function msgSend()
{
  var msg = document.getElementById('txtMsg').value;
    if(msg.length==0)
        return false;
  socket.emit('createMessage', {from : "Tushar", text : msg}, (data) => {
    console.log("From server : ",data);
  });
    return false;
}
function sendLocation()
{
    var btn = document.getElementById("btnLoc");
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition((position) => {
            btn.disabled = true;
           socket.emit('createLocation', {
               from : "Tushar",
               lat : position.coords.latitude,
               lon : position.coords.longitude
           }
        , (data) => {
            console.log("From server : ",data); 
            btn.disabled = false;
           });
        }, () => {
            return alert("Can not fetch location");    
        });
    }
    else
    {
        return alert("Geo location is not available");
    }

}

