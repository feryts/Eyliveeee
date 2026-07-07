/* ==========================================
   EY LIVE V2
   WALLET ENGINE
========================================== */

const Wallet = {

    user: null,

    history: [],

    init() {

        this.loadUser();
        this.loadHistory();
        this.render();
        this.events();

    },

    loadUser() {

        this.user = Storage.load("eylive_user");

        if (!this.user) {

            this.user = {

                id: "EY100001",
                username: "Misafir",
                coin: 1000,
                diamond: 100,
                level: 1,
                vip: 0

            };

            Storage.save("eylive_user", this.user);

        }

    },

    loadHistory() {

        this.history = Storage.load("wallet_history") || [];

    },

    saveHistory(text) {

        this.history.unshift({

            date: new Date().toLocaleString("tr-TR"),

            text: text

        });

        Storage.save("wallet_history", this.history);

    },

    render() {

        document.getElementById("coinBalance").innerHTML = this.user.coin;

        document.getElementById("diamondBalance").innerHTML = this.user.diamond;

        const list = document.getElementById("historyList");

        list.innerHTML = "";

        if (this.history.length === 0) {

            list.innerHTML = `
            <div class="historyItem">
                Henüz işlem bulunmuyor.
            </div>
            `;

            return;

        }

        this.history.forEach(item => {

            list.innerHTML += `

            <div class="historyItem">

                <strong>${item.text}</strong>

                <br>

                <small>${item.date}</small>

            </div>

            `;

        });

    },

    buyCoin() {

        this.user.coin += 1000;

        Storage.save("eylive_user", this.user);

        this.saveHistory("1000 Coin satın alındı.");

        this.render();

        alert("1000 Coin hesabınıza eklendi.");

    },

    sendCoin() {

        if (this.user.coin < 100) {

            alert("Yetersiz Coin");

            return;

        }

        this.user.coin -= 100;

        Storage.save("eylive_user", this.user);

        this.saveHistory("100 Coin gönderildi.");

        this.render();

        alert("100 Coin gönderildi.");

    },

    events() {

        document.getElementById("buyCoin").onclick = () => {

            this.buyCoin();

        };

        document.getElementById("sendCoin").onclick = () => {

            this.sendCoin();

        };

        document.getElementById("historyBtn").onclick = () => {

            alert("Toplam İşlem: " + this.history.length);

        };

    }

};

document.addEventListener("DOMContentLoaded", () => {

    Wallet.init();

});
