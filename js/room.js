/* ==========================================
   EY LIVE V2
   ROOM ENGINE 1.0
========================================== */

const ROOM = {
    id: 1001,
    name: "Türkiye Lounge",
    online: 245,
    host: "EyLive"
};

const roomTitle = document.getElementById("roomTitle");
const roomId = document.getElementById("roomId");
const onlineCount = document.getElementById("onlineCount");
const chatList = document.getElementById("chatList");

if (roomTitle) roomTitle.textContent = ROOM.name;
if (roomId) roomId.textContent = "ID " + ROOM.id;
if (onlineCount) onlineCount.textContent = ROOM.online + " Online";

const messages = [
    {
        user: "Sistem",
        text: "🎉 Odaya hoş geldiniz."
    },
    {
        user: "EyLive",
        text: "❤️ Herkese iyi eğlenceler."
    }
];

function renderChat() {

    if (!chatList) return;

    chatList.innerHTML = "";

    messages.forEach(item => {

        chatList.innerHTML += `
        <div class="chatItem">
            <b>${item.user}</b>
            ${item.text}
        </div>
        `;

    });

    chatList.scrollTop = chatList.scrollHeight;

}

renderChat();

function systemMessage(text){

    messages.push({
        user:"Sistem",
        text:text
    });

    renderChat();

}

document.getElementById("backBtn").onclick = () => {

    history.back();

};

document.getElementById("heartBtn").onclick = () => {

    createHeart();

};

document.getElementById("emojiBtn").onclick = () => {

    messages.push({

        user:"Sen",

        text:"😀😀😀"

    });

    renderChat();

};

document.getElementById("giftBtn").onclick = () => {

    if(typeof openGiftPanel==="function"){

        openGiftPanel();

    }

};

document.getElementById("profileBtn").onclick = () => {

    if(typeof openProfile==="function"){

        openProfile();

    }

};

document.getElementById("micBtn").onclick = () => {

    systemMessage("🎤 Mikrofon isteği gönderildi.");

};

function createHeart(){

    const heart=document.createElement("div");

    heart.innerHTML="❤️";

    heart.style.position="fixed";

    heart.style.bottom="90px";

    heart.style.left=(Math.random()*70+15)+"%";

    heart.style.fontSize="32px";

    heart.style.zIndex="9999";

    heart.style.transition="2s";

    document.body.appendChild(heart);

    setTimeout(()=>{

        heart.style.transform="translateY(-300px) scale(2)";

        heart.style.opacity="0";

    },50);

    setTimeout(()=>{

        heart.remove();

    },2100);

}

setInterval(()=>{

    ROOM.online += Math.floor(Math.random()*3)-1;

    if(ROOM.online<1){

        ROOM.online=1;

    }

    onlineCount.textContent=ROOM.online+" Online";

},8000);

console.log("EY LIVE ROOM READY");
