/* ==========================================
        EY LIVE ROOM MANAGER v1.0
========================================== */

const rooms=[];

for(let i=1;i<=50;i++){

rooms.push({

id:1000+i,

name:"EY Room "+i,

host:"Host"+i,

users:Math.floor(Math.random()*24)+1,

locked:false,

closed:false

});

}

const roomList=document.getElementById("roomList");
const roomModal=document.getElementById("roomModal");
const roomInfo=document.getElementById("roomInfo");

let selectedRoom=null;

function renderRooms(list=rooms){

roomList.innerHTML="";

list.forEach(room=>{

roomList.innerHTML+=`

<tr>

<td>${room.id}</td>

<td>${room.name}</td>

<td>${room.host}</td>

<td>${room.users}</td>

<td>

<span class="${room.locked?"roomStatusLocked":"roomStatusOpen"}">

${room.locked?"Kilitli":"Açık"}

</span>

</td>

<td>

<button class="manageRoom"

onclick="openRoom(${room.id})">

Yönet

</button>

</td>

</tr>

`;

});

}

renderRooms();

function openRoom(id){

selectedRoom=rooms.find(x=>x.id===id);

roomInfo.innerHTML=`

<b>${selectedRoom.name}</b><br>

Host : ${selectedRoom.host}<br>

Kullanıcı : ${selectedRoom.users}

`;

roomModal.style.display="flex";

}

document.getElementById("closeModal").onclick=()=>{

roomModal.style.display="none";

}

document.getElementById("lockRoom").onclick=()=>{

selectedRoom.locked=!selectedRoom.locked;

renderRooms();

alert(selectedRoom.locked?

"Oda Kilitlendi 🔒":

"Oda Açıldı ✅");

}

document.getElementById("closeRoom").onclick=()=>{

selectedRoom.closed=true;

alert("Oda Kapatıldı");

roomModal.style.display="none";

}

document.getElementById("deleteRoom").onclick=()=>{

const index=rooms.findIndex(x=>x.id===selectedRoom.id);

rooms.splice(index,1);

renderRooms();

roomModal.style.display="none";

alert("Oda Silindi");

}

document.getElementById("announceRoom").onclick=()=>{

const text=prompt("Duyuru Yaz");

if(text){

alert("Duyuru Gönderildi:\n\n"+text);

}

}

document.getElementById("searchRoom").onkeyup=function(){

const value=this.value.toLowerCase();

renderRooms(

rooms.filter(room=>

room.name.toLowerCase().includes(value)||

room.host.toLowerCase().includes(value)||

String(room.id).includes(value)

)

);

};

console.log("ROOM MANAGER READY");
