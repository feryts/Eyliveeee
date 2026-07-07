/* ===================================
      EY LIVE V2
      Gift Engine v1.0
=================================== */

let giftData=[];

async function loadGifts(){

    try{

        const res=await fetch("../data/gifts.json");

        giftData=await res.json();

        console.log("Gift Loaded",giftData);

    }catch(e){

        console.error(e);

    }

}

loadGifts();

function openGiftPanel(){

    if(document.getElementById("giftPanel")) return;

    const panel=document.createElement("div");

    panel.id="giftPanel";

    panel.className="giftPanel";

    panel.innerHTML=`

    <div class="giftHeader">

        <h3>🎁 Hediye Mağazası</h3>

        <button id="closeGift">✕</button>

    </div>

    <div id="giftList" class="giftList"></div>

    `;

    document.body.appendChild(panel);

    const list=document.getElementById("giftList");

    giftData.forEach(g=>{

        list.innerHTML+=`

        <div class="giftItem"

        onclick="sendGift(${g.id})">

            <div class="giftEmoji">${g.emoji}</div>

            <div class="giftName">${g.name}</div>

            <div class="giftCoin">🪙 ${g.coin}</div>

        </div>

        `;

    });

    document.getElementById("closeGift").onclick=()=>{

        panel.remove();

    };

}

function sendGift(id){

    const gift=giftData.find(x=>x.id===id);

    if(!gift) return;

    const user=JSON.parse(localStorage.getItem("eylive_user"));

    if(user.coin<gift.coin){

        alert("Yetersiz Coin");

        return;

    }

    user.coin-=gift.coin;

    localStorage.setItem("eylive_user",JSON.stringify(user));

    const coinEl = document.getElementById("coinText");
    if (coinEl) coinEl.innerHTML = user.coin;

    alert(`🎁 ${gift.name} gönderildi`);

}
