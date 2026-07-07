/* ==========================================
   EY LIVE V2
   CHAT ENGINE
========================================== */

const Chat={

users:[],

filtered:[],

async init(){

await this.loadUsers();

this.render();

this.events();

},

async loadUsers(){

try{

this.users=await API.loadUsers() || [];

this.filtered=[...this.users];

}catch(e){

console.error(e);

}

},

render(){

const list=document.getElementById("chatList");

if(!list) return;

list.innerHTML="";

this.filtered.forEach((user,index)=>{

list.innerHTML+=`

<div class="chatCard" data-id="${user.id}">

<div class="chatAvatar">

<img src="${user.avatar}" alt="${user.username}">

${user.online?'<div class="chatOnline"></div>':''}

</div>

<div class="chatInfo">

<h3>

${user.username}

${user.verified?" ✔️":""}

</h3>

<p>

Merhaba 👋 Nasılsın?

</p>

</div>

<div class="chatTime">

18:${10+index}

<br>

<div class="unread">

${Math.floor(Math.random()*9)+1}

</div>

</div>

</div>

`;

});

this.bindCards();

},

bindCards(){

document.querySelectorAll(".chatCard").forEach(card=>{

card.onclick=()=>{

const id=card.dataset.id;

Storage.save("chat_user",id);

alert("Sohbet ekranı sonraki sürümde açılacak.");

};

});

},

events(){

const search=document.getElementById("searchInput");

if(!search) return;

search.addEventListener("input",(e)=>{

const value=e.target.value.toLowerCase();

this.filtered=this.users.filter(user=>{

return user.username.toLowerCase().includes(value);

});

this.render();

});

}

};

document.addEventListener("DOMContentLoaded",()=>{

Chat.init();

});
