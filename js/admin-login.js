const USERNAME="admin";

const PASSWORD="EyLive2025!";

document.getElementById("loginBtn").onclick=()=>{

const user=document.getElementById("username").value;

const pass=document.getElementById("password").value;

if(user===USERNAME && pass===PASSWORD){

localStorage.setItem("ey_admin","true");

location.href="index.html";

}else{

document.getElementById("error").innerHTML="Kullanıcı adı veya şifre yanlış.";

}

}
