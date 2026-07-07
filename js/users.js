/* ==========================================
        EY LIVE USERS SYSTEM
========================================== */

const users = [];

for (let i = 1; i <= 100; i++) {

    users.push({

        id: "EY" + String(100000 + i),

        username: "User" + i,

        vip: Math.floor(Math.random() * 8),

        level: Math.floor(Math.random() * 80) + 1,

        coin: Math.floor(Math.random() * 100000),

        diamond: Math.floor(Math.random() * 5000),

        online: Math.random() > 0.5,

        verified: false,

        streamer: false,

        banned: false,

        muted: false

    });

}

const table = document.getElementById("userList");
const modal = document.getElementById("userModal");
const selected = document.getElementById("selectedUser");

let currentUser = null;

function renderUsers(list = users) {

    table.innerHTML = "";

    list.forEach(user => {

        table.innerHTML += `

<tr>

<td>${user.id}</td>

<td>${user.username}</td>

<td>VIP ${user.vip}</td>

<td>${user.level}</td>

<td>${user.coin}</td>

<td>

<span class="${user.online ? "statusOnline" : "statusOffline"}">

${user.online ? "Online" : "Offline"}

</span>

</td>

<td>

<button class="manageBtn"

onclick="openUser('${user.id}')">

Yönet

</button>

</td>

</tr>

`;

    });

}

renderUsers();

function openUser(id){

currentUser=users.find(x=>x.id===id);

selected.innerHTML=`

<b>${currentUser.username}</b><br>

${currentUser.id}<br><br>

VIP ${currentUser.vip}<br>

Level ${currentUser.level}<br>

🪙 ${currentUser.coin}<br>

💎 ${currentUser.diamond}

`;

modal.style.display="flex";

}

document.getElementById("closeModal").onclick=()=>{

modal.style.display="none";

}

document.getElementById("coinBtn").onclick=()=>{

currentUser.coin+=1000;

alert("+1000 Coin Verildi");

renderUsers();

}

document.getElementById("diamondBtn").onclick=()=>{

currentUser.diamond+=100;

alert("+100 Diamond");

}

document.getElementById("vipBtn").onclick=()=>{

currentUser.vip++;

alert("VIP Yükseltildi");

}

document.getElementById("levelBtn").onclick=()=>{

currentUser.level++;

alert("Level Arttı");

}

document.getElementById("verifyBtn").onclick=()=>{

currentUser.verified=true;

alert("Doğrulandı ✔");

}

document.getElementById("streamerBtn").onclick=()=>{

currentUser.streamer=true;

alert("Yayıncı Yapıldı");

}

document.getElementById("muteBtn").onclick=()=>{

currentUser.muted=!currentUser.muted;

alert(currentUser.muted?"Susturuldu":"Susturma Kaldırıldı");

}

document.getElementById("banBtn").onclick=()=>{

currentUser.banned=!currentUser.banned;

alert(currentUser.banned?"Banlandı":"Ban Kaldırıldı");

}

document.getElementById("searchUser").onkeyup=function(){

const value=this.value.toLowerCase();

renderUsers(

users.filter(x=>

x.username.toLowerCase().includes(value)||

x.id.toLowerCase().includes(value)

)

);

}

console.log("EY LIVE USERS READY");
