/* ==========================================
   EY LIVE V2
   ADMIN PANEL
========================================== */

const Admin={

users:[],
rooms:[],
gifts:[],
vip:[],

async init(){

console.log("Admin Panel Başlatılıyor...");

await this.loadData();

this.updateDashboard();

},

async loadData(){

try{

this.users=await API.loadUsers() || [];

this.rooms=await API.loadRooms() || [];

this.gifts=await API.loadGifts() || [];

this.vip=await API.loadVip() || [];

}catch(e){

console.error(e);

}

},

updateDashboard(){

const totalUsers=document.getElementById("totalUsers");

const totalRooms=document.getElementById("totalRooms");

const totalGifts=document.getElementById("totalGifts");

if(totalUsers){

totalUsers.innerHTML=this.users.length;

}

if(totalRooms){

totalRooms.innerHTML=this.rooms.length;

}

if(totalGifts){

totalGifts.innerHTML=this.gifts.length;

}

},

searchUser(id){

return this.users.find(u=>u.id===id);

},

searchRoom(id){

return this.rooms.find(r=>r.id===id);

},

reload(){

location.reload();

}

};

window.addEventListener("DOMContentLoaded",()=>{

Admin.init();

});
