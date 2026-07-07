/* ===========================================
        EY LIVE V2
        AUTH PAGE LOGIC (login / register / guest)
=========================================== */

const AuthPage = {

	ACCOUNTS_KEY: "eylive_accounts",

	loadAccounts() {

		return Storage.load(this.ACCOUNTS_KEY) || [];

	},

	saveAccounts(list) {

		Storage.save(this.ACCOUNTS_KEY, list);

	},

	nextId(list) {

		return "EY" + (100000 + list.length + 1);

	},

	makeUser({ id, username, phone, role, avatar }) {

		return {
			id,
			username,
			phone: phone || "",
			avatar: avatar || "../assets/avatar/default.svg",
			coin: role === "guest" ? 500 : 1000,
			diamond: role === "guest" ? 0 : 100,
			level: 1,
			vip: 0,
			verified: false,
			role: role || "user",
			gender: "unknown",
			country: "TR",
			online: true,
			followers: 0
		};

	},

	goHome() {

		location.href = "home.html";

	},

	initLogin() {

		const form = document.getElementById("loginForm");
		const errorBox = document.getElementById("loginError");
		const guestBtn = document.getElementById("guestBtn");

		if (Auth.check()) {

			this.goHome();
			return;

		}

		if (form) {

			form.addEventListener("submit", (e) => {

				e.preventDefault();
				errorBox.textContent = "";

				const idVal = document.getElementById("loginId").value.trim();
				const passVal = document.getElementById("loginPass").value;

				if (!idVal || !passVal) {

					errorBox.textContent = "Lütfen tüm alanları doldurun.";
					return;

				}

				const accounts = this.loadAccounts();

				const match = accounts.find(a =>
					(a.username.toLowerCase() === idVal.toLowerCase() || a.phone === idVal) &&
					a.password === passVal
				);

				if (!match) {

					errorBox.textContent = "Kullanıcı adı/telefon veya şifre hatalı.";
					return;

				}

				const sessionUser = { ...match };
				delete sessionUser.password;

				Auth.login(sessionUser);
				this.goHome();

			});

		}

		if (guestBtn) {

			guestBtn.onclick = () => {

				const accounts = this.loadAccounts();
				const id = this.nextId(accounts);
				const guest = this.makeUser({
					id,
					username: "Misafir" + Math.floor(1000 + Math.random() * 9000),
					role: "guest"
				});

				Auth.login(guest);
				this.goHome();

			};

		}

	},

	initRegister() {

		const form = document.getElementById("registerForm");
		const errorBox = document.getElementById("regError");

		if (Auth.check()) {

			this.goHome();
			return;

		}

		if (!form) return;

		form.addEventListener("submit", (e) => {

			e.preventDefault();
			errorBox.textContent = "";

			const username = document.getElementById("regUsername").value.trim();
			const phone = document.getElementById("regPhone").value.trim();
			const pass = document.getElementById("regPass").value;
			const pass2 = document.getElementById("regPass2").value;

			if (!username || !phone || !pass || !pass2) {

				errorBox.textContent = "Lütfen tüm alanları doldurun.";
				return;

			}

			if (pass.length < 6) {

				errorBox.textContent = "Şifre en az 6 karakter olmalı.";
				return;

			}

			if (pass !== pass2) {

				errorBox.textContent = "Şifreler eşleşmiyor.";
				return;

			}

			const accounts = this.loadAccounts();

			const exists = accounts.find(a =>
				a.username.toLowerCase() === username.toLowerCase() || a.phone === phone
			);

			if (exists) {

				errorBox.textContent = "Bu kullanıcı adı veya telefon zaten kayıtlı.";
				return;

			}

			const id = this.nextId(accounts);
			const newUser = this.makeUser({ id, username, phone, role: "user" });
			const accountRecord = { ...newUser, password: pass };

			accounts.push(accountRecord);
			this.saveAccounts(accounts);

			const sessionUser = { ...newUser };
			Auth.login(sessionUser);
			this.goHome();

		});

	}

};

document.addEventListener("DOMContentLoaded", () => {

	if (document.getElementById("loginForm") || document.getElementById("guestBtn")) {

		AuthPage.initLogin();

	}

	if (document.getElementById("registerForm")) {

		AuthPage.initRegister();

	}

});
