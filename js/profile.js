/* ===========================================
        EY LIVE V2
        PROFILE POPUP
=========================================== */

const profileData = {

    id:"EY100001",

    username:"EyLive",

    vip:15,

    level:99,

    coin:999999,

    diamond:99999,

    follow:12548,

    avatar:"../assets/avatar/default.svg"

};

function openProfile(){

    if(document.getElementById("profilePopup")) return;

    const popup=document.createElement("div");

    popup.id="profilePopup";

    popup.className="profilePopup";

    popup.innerHTML=`

    <div class="profileCard">

        <img class="profileAvatar"

        src="${profileData.avatar}">

        <h2>${profileData.username}</h2>

        <p>${profileData.id}</p>

        <div class="profileStats">

            <div>

                <h3>${profileData.vip}</h3>

                <span>VIP</span>

            </div>

            <div>

                <h3>${profileData.level}</h3>

                <span>Level</span>

            </div>

            <div>

                <h3>${profileData.follow}</h3>

                <span>Takipçi</span>

            </div>

        </div>

        <div class="walletBox">

            <div>

                🪙 ${profileData.coin}

            </div>

            <div>

                💎 ${profileData.diamond}

            </div>

        </div>

        <div class="profileButtons">

            <button>➕ Takip Et</button>

            <button>💬 Mesaj</button>

            <button>🎁 Hediye</button>

            <button>🚫 Engelle</button>

        </div>

        <button id="closeProfile">

            Kapat

        </button>

    </div>

    `;

    document.body.appendChild(popup);

    document.getElementById("closeProfile").onclick=()=>{

        popup.remove();

    }

}

document.addEventListener("click",(e)=>{

    if(e.target.id==="profileBtn"){

        openProfile();

    }

});
