/* ==========================================
        EY LIVE VIP SYSTEM
========================================== */

let vipLogs=JSON.parse(localStorage.getItem("ey_vip_logs"))||[];

const vipLogList=document.getElementById("vipLogList");

function saveVipLogs(){

localStorage.setItem("ey_vip_logs",JSON.stringify(vipLogs));

}

function renderVipLogs(){

vipLogList.innerHTML="";

vipLogs.forEach(log=>{

vipLogList.innerHTML+=`

<div class="vipLog">

<b>${log.date}</b><br>

${log.text}

</div>

`;

});

}

function addVipLog(text){

vipLogs.unshift({

date:new Date().toLocaleString("tr-TR"),

text

});

if(vipLogs.length>100){

vipLogs.pop();

}

saveVipLogs();

renderVipLogs();

}

renderVipLogs();

document.getElementById("giveVip").onclick=()=>{

const id=document.getElementById("vipUser").value;

const level=document.getElementById("vipLevel").value;

const day=document.getElementById("vipDays").value;

if(!id){

alert("Kullanıcı ID Gir");

return;

}

addVipLog(`👑 ${id} kullanıcısına VIP ${level} (${day} Gün) verildi.`);

alert("VIP Başarıyla Verildi");

}

document.getElementById("extendVip").onclick=()=>{

const id=document.getElementById("vipUser").value;

const day=document.getElementById("vipDays").value;

addVipLog(`📅 ${id} VIP süresi ${day} gün uzatıldı.`);

alert("VIP Süresi Uzatıldı");

}

document.getElementById("removeVip").onclick=()=>{

const id=document.getElementById("vipUser").value;

addVipLog(`❌ ${id} kullanıcısının VIP'i kaldırıldı.`);

alert("VIP Kaldırıldı");

}

document.getElementById("vipHistory").onclick=()=>{

renderVipLogs();

alert("VIP işlem geçmişi güncellendi.");

}

console.log("VIP PANEL READY");
