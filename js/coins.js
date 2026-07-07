/* ==========================================
        EY LIVE COIN MANAGER v1.0
========================================== */

let logs = JSON.parse(localStorage.getItem("ey_logs")) || [];

const historyList = document.getElementById("historyList");

function saveLogs() {
    localStorage.setItem("ey_logs", JSON.stringify(logs));
}

function addLog(text) {

    logs.unshift({
        time: new Date().toLocaleString("tr-TR"),
        text
    });

    if (logs.length > 100) logs.pop();

    saveLogs();
    renderLogs();
}

function renderLogs() {

    historyList.innerHTML = "";

    logs.forEach(log => {

        historyList.innerHTML += `

<div class="logItem">

<b>${log.time}</b><br>

${log.text}

</div>

`;

    });

}

renderLogs();

function getInputs() {

    return {

        id: document.getElementById("userId").value.trim(),

        amount: Number(document.getElementById("coinAmount").value)

    };

}

document.getElementById("addCoin").onclick = () => {

    const data = getInputs();

    if (!data.id || !data.amount) {

        alert("Kullanıcı ID ve Coin miktarı gir.");

        return;

    }

    addLog(`🪙 ${data.id} kullanıcısına +${data.amount} Coin verildi.`);

    alert("Coin başarıyla eklendi.");

};

document.getElementById("removeCoin").onclick = () => {

    const data = getInputs();

    if (!data.id || !data.amount) {

        alert("Bilgileri doldur.");

        return;

    }

    addLog(`➖ ${data.id} kullanıcısından ${data.amount} Coin silindi.`);

    alert("Coin silindi.");

};

document.getElementById("addDiamond").onclick = () => {

    const data = getInputs();

    addLog(`💎 ${data.id} kullanıcısına Diamond verildi.`);

    alert("Diamond eklendi.");

};

document.getElementById("addVip").onclick = () => {

    const data = getInputs();

    addLog(`👑 ${data.id} VIP yükseltildi.`);

    alert("VIP verildi.");

};

document.getElementById("addLevel").onclick = () => {

    const data = getInputs();

    addLog(`⭐ ${data.id} Level yükseltildi.`);

    alert("Level artırıldı.");

};

document.getElementById("historyBtn").onclick = () => {

    renderLogs();

    alert("İşlem geçmişi güncellendi.");

};

console.log("EY LIVE COIN PANEL READY");
