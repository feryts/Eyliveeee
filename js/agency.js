let agencyLogs=JSON.parse(localStorage.getItem("ey_agency_logs"))||[];

const list=document.getElementById("agencyLogList");

function render(){

list.innerHTML="";

agencyLogs.forEach(item=>{

list.innerHTML+=`

<div class="log">

<b>${item.date}</b><br>

${item.text}

</div>

`;

});

}

function save(){

localStorage.setItem("ey_agency_logs",JSON.stringify(agencyLogs));

}

function add(text){

agencyLogs.unshift({

date:new Date().toLocaleString(),

text

});

save();

render();

}

render();

createAgency.onclick=()=>{

add("🏢 Yeni ajans oluşturuldu.");

alert("Ajans oluşturuldu.");

}

updateAgency.onclick=()=>{

add("✏ Ajans güncellendi.");

alert("Ajans güncellendi.");

}

closeAgency.onclick=()=>{

add("🚫 Ajans kapatıldı.");

alert("Ajans kapatıldı.");

}

agencyLogs.onclick=()=>{

render();

}
