/* ===========================================
        EY LIVE V2
        PROFILE PAGE LOGIC
=========================================== */

const ProfilePage = {

	user: null,

	init() {

		this.user = Storage.load("eylive_user");

		if (!this.user) {

			location.href = "login.html";
			return;

		}

		this.render();
		this.events();

	},

	render() {

		const u = this.user;

		document.getElementById("pfAvatar").src = u.avatar || "../assets/avatar/default.svg";
		document.getElementById("pfName").innerHTML = `${u.username} ${u.verified ? "<span title='Onaylı'>✅</span>" : ""}`;
		document.getElementById("pfIdText").textContent = u.id;
		document.getElementById("pfVipBadge").textContent = `👑 VIP ${u.vip || 0}`;
		document.getElementById("pfLevel").textContent = u.level || 1;
		document.getElementById("pfFollowers").textContent = u.followers || 0;
		document.getElementById("pfFollowing").textContent = u.following || 0;
		document.getElementById("pfCoin").textContent = (u.coin || 0).toLocaleString("tr-TR");
		document.getElementById("pfDiamond").textContent = (u.diamond || 0).toLocaleString("tr-TR");

	},

	events() {

		const doLogout = () => {

			if (confirm("Çıkış yapmak istediğine emin misin?")) {

				Auth.logout();

			}

		};

		document.getElementById("pfLogoutBtn").onclick = doLogout;
		document.getElementById("pfLogoutItem").onclick = doLogout;

	}

};

document.addEventListener("DOMContentLoaded", () => {

	ProfilePage.init();

});
