/* ===========================================
   EY LIVE V2 CORE
   app.js
=========================================== */

const APP = {
    name: "EY LIVE",
    version: "2.0.0",
    build: "002",
    theme: "dark",
    online: true
};

const DEFAULT_USER = {
    id: "",
    username: "",
    avatar: "assets/avatar/default.svg",
    coin: 0,
    diamond: 0,
    level: 1,
    vip: 0,
    verified: false,
    role: "guest",
    language: "tr",
    theme: "dark"
};

class EyLive {

    constructor() {
        this.user = this.loadUser();
        this.init();
    }

    init() {
        console.log(APP.name, APP.version, APP.build);

        this.install();
        this.network();
        this.theme();
        this.loader();
    }

    loader() {

        const bar = document.querySelector(".bar");

        if (!bar) return;

        setTimeout(() => {

            const loggedIn = window.Auth && Auth.check();
            const nextPage = loggedIn ? "./pages/home.html" : "./pages/login.html";

            window.location.replace(nextPage);

        }, 1600);

    }

    loadUser() {

        const data = localStorage.getItem("eylive_user");

        if (data) {
            return JSON.parse(data);
        }

        return null;

    }

    saveUser() {

        localStorage.setItem(
            "eylive_user",
            JSON.stringify(this.user)
        );

    }

    network() {

        window.addEventListener("offline", () => {

            alert("İnternet bağlantısı kesildi.");

        });

    }

    theme() {

        document.body.dataset.theme = this.user ? this.user.theme : "dark";

    }

    install() {

        window.addEventListener("beforeinstallprompt", e => {

            e.preventDefault();
            window.installPrompt = e;

        });

    }

}

const ey = new EyLive();

window.ey = ey;
