var c = document.getElementById("chat");
var user = document.getElementById("u");
user.style.visibility = "hidden";
var socket = io();
var ol = document.getElementById('msgList');
if(sessionStorage.getItem("userName")=== null)
{
        user.style.visibility = "visible";
        c.style.visibility = "hidden";
}
socket.on('connect', () => {
  console.log("Connected to Server");
});
socket.on('disconnect', () => {
  console.log("disconnected from Server");
});
socket.on('newMessage', (msg) => {
  var li = document.createElement('li');
    var time = moment(msg.createdAt).format("hh:mm a");
  var text = document.createTextNode(`${msg.from} ${time} : ${msg.text}`);
  li.appendChild(text);
  ol.appendChild(li);
});
socket.on('newLocation', (msg) => {
    var time = moment(msg.createdAt).format("hh:mm a");
  var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = msg.mapURL;
    a.target = "_blank";
    a.appendChild(document.createTextNode("My location"));
      li.appendChild(document.createTextNode(`${msg.from} ${time} : `));
  li.appendChild(a);
  ol.appendChild(li);
});
function msgSend()
{
  var msg = document.getElementById('txtMsg');
    if(msg.value.length==0)
    {
        msg.focus();
        return false;
    }
    socket.emit('createMessage', {from : sessionStorage.getItem('userName'), text : msg.value}, (data) => {
      msg.value="";
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
            btn.value = "sending location...";
           socket.emit('createLocation', {
               from : sessionStorage.getItem('userName'),
               lat : position.coords.latitude,
               lon : position.coords.longitude
           }
        , (data) => {
            console.log("From server : ",data); 
            btn.value="Send Location";
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
function setUser()
{
  var u = document.getElementById('userName');
    if(u.value.length==0)
    {
        u.focus();
        return false;
    }
    sessionStorage.setItem("userName", u.value);
    c.style.visibility = "visible";
    user.style.visibility = "hidden";
}

