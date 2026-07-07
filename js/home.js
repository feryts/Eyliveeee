/* ===========================================
        EY LIVE V2
        HOME SYSTEM
=========================================== */

const roomList = document.getElementById("roomList");
const vipList = document.getElementById("vipList");

const rooms = [

{
id:1001,
name:"Türkiye Lounge",
host:"EyLive",
online:245,
emoji:"🎙"
},

{
id:1002,
name:"Gece Sohbeti",
host:"Ahmet",
online:132,
emoji:"🌙"
},

{
id:1003,
name:"Müzik Odası",
host:"DJ Emre",
online:98,
emoji:"🎵"
},

{
id:1004,
name:"VIP Club",
host:"Queen",
online:64,
emoji:"👑"
}

];

const vipUsers=[

{
name:"EyLive",
level:15,
avatar:"../assets/avatar/default.svg"
},

{
name:"Elif",
level:12,
avatar:"../assets/avatar/default.svg"
},

{
name:"Ahmet",
level:10,
avatar:"../assets/avatar/default.svg"
},

{
name:"Merve",
level:9,
avatar:"../assets/avatar/default.svg"
}

];

function renderRooms(){

roomList.innerHTML="";

rooms.forEach(room=>{

roomList.innerHTML+=`

<div class="roomCard">

<div class="roomImage">

${room.emoji}

</div>

<div class="roomInfo">

<h4>${room.name}</h4>

<p>

👤 ${room.host}

</p>

<p>

👥 ${room.online} Online

</p>

<div class="onlineBadge">

Katıl

</div>

</div>

</div>

`;

});

}

function renderVip(){

vipList.innerHTML="";

vipUsers.forEach(user=>{

vipList.innerHTML+=`

<div class="vipCard">

<img src="${user.avatar}">

<h4>${user.name}</h4>

<p>

VIP ${user.level}

</p>

<div class="onlineBadge">

Online

</div>

</div>

`;

});

}

function loadWallet(){

let data=JSON.parse(

localStorage.getItem("eylive_user")

);

if(!data){

return;

}

document.getElementById("coinText").innerHTML=data.coin;

document.getElementById("diamondText").innerHTML=data.diamond;

}

renderRooms();

renderVip();

loadWallet();

document.querySelectorAll(".roomCard").forEach((card,index)=>{

card.onclick=()=>{

localStorage.setItem(

"selectedRoom",

JSON.stringify(rooms[index])

);

location.href="room.html";

}

});

console.log("HOME READY");
