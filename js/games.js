/* ==========================================
   EY LIVE V2
   GAMES ENGINE (visual)
========================================== */

const Games = {

	user: null,
	jackpotPool: 0,
	currentGame: null,
	currentBet: 100,
	spinning: false,
	activeTimer: null,

	init() {

		this.loadUser();
		this.loadJackpot();
		this.renderCoin();
		this.events();
		console.log("Games Ready");

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

	saveUser() {

		Storage.save("eylive_user", this.user);
		this.renderCoin();

	},

	loadJackpot() {

		this.jackpotPool = Storage.load("eylive_jackpot_pool");

		if (this.jackpotPool === null || this.jackpotPool === undefined) {

			this.jackpotPool = 1250000;
			Storage.save("eylive_jackpot_pool", this.jackpotPool);

		}

	},

	saveJackpot() {

		Storage.save("eylive_jackpot_pool", this.jackpotPool);

		const mini = document.getElementById("jackpotPoolMini");
		if (mini) mini.textContent = this.fmt(this.jackpotPool);

		const full = document.getElementById("jackpotPoolValue");
		if (full) full.textContent = this.fmt(this.jackpotPool);

	},

	renderCoin() {

		const badge = document.getElementById("gameCoinBalance");
		if (badge) badge.textContent = this.fmt(this.user.coin);

		const mini = document.getElementById("jackpotPoolMini");
		if (mini) mini.textContent = this.fmt(this.jackpotPool);

	},

	fmt(n) {

		return Math.round(n).toLocaleString("tr-TR");

	},

	addHistory(text) {

		const history = Storage.load("wallet_history") || [];

		history.unshift({
			date: new Date().toLocaleString("tr-TR"),
			text: text
		});

		Storage.save("wallet_history", history);

	},

	events() {

		document.querySelectorAll(".gameCard").forEach(card => {

			card.onclick = () => {

				const game = card.dataset.game;
				if (game === "tournament") return;
				this.open(game);

			};

		});

		const closeBtn = document.getElementById("gameModalClose");
		if (closeBtn) closeBtn.onclick = () => this.close();

		const modal = document.getElementById("gameModal");
		if (modal) {

			modal.addEventListener("click", (e) => {

				if (e.target === modal) this.close();

			});

		}

	},

	open(game) {

		if (this.spinning) return;

		this.currentGame = game;
		this.currentBet = 100;

		const modal = document.getElementById("gameModal");
		const content = document.getElementById("gameModalContent");

		content.innerHTML = this.renderGame(game);
		modal.classList.add("open");

		this.wireGame(game);

	},

	close() {

		if (this.spinning) return;

		const modal = document.getElementById("gameModal");
		modal.classList.remove("open");
		document.getElementById("gameModalContent").innerHTML = "";
		if (this.activeTimer) clearInterval(this.activeTimer);
		this.currentGame = null;

	},

	betChipsHtml(options) {

		return `
		<div class="betChips" id="betChips">
			${options.map(v => `
			<button class="betChip ${v === this.currentBet ? "active" : ""}" data-bet="${v}">
				<span class="betChipInner">${v}</span>
			</button>
			`).join("")}
		</div>
		`;

	},

	wireBetChips() {

		document.querySelectorAll(".betChip").forEach(chip => {

			chip.onclick = () => {

				if (this.spinning) return;
				this.currentBet = parseInt(chip.dataset.bet, 10);

				document.querySelectorAll(".betChip").forEach(c => c.classList.remove("active"));
				chip.classList.add("active");

			};

		});

	},

	toast(text, kind) {

		const box = document.querySelector(".gameModalBox");
		let el = box.querySelector(".gameToast");

		if (!el) {

			el = document.createElement("div");
			el.className = "gameToast";
			box.appendChild(el);

		}

		el.textContent = text;
		el.className = "gameToast show" + (kind ? " " + kind : "");

		clearTimeout(this._toastTimer);
		this._toastTimer = setTimeout(() => el.classList.remove("show"), 2200);

	},

	coinBurst(container, big) {

		const layer = document.createElement("div");
		layer.className = "coinBurstLayer";
		container.appendChild(layer);

		const count = big ? 20 : 10;

		for (let i = 0; i < count; i++) {

			const s = document.createElement("span");
			const angle = (360 / count) * i + Math.random() * 20;
			const dist = 55 + Math.random() * 60;
			const dx = Math.cos((angle * Math.PI) / 180) * dist;
			const dy = Math.sin((angle * Math.PI) / 180) * dist;

			s.style.setProperty("--dx", dx + "px");
			s.style.setProperty("--dy", dy + "px");
			s.style.animationDelay = (Math.random() * 0.15) + "s";
			s.textContent = big ? "💰" : "🪙";

			layer.appendChild(s);

		}

		setTimeout(() => layer.remove(), 1000);

	},

	checkBet() {

		if (this.user.coin < this.currentBet) {

			this.toast("Yetersiz Coin", "lose");
			return false;

		}

		return true;

	},

	renderGame(game) {

		if (game === "slot") return this.slotMarkup();
		if (game === "wheel") return this.wheelMarkup();
		if (game === "dice") return this.diceMarkup();
		if (game === "box") return this.boxMarkup();
		if (game === "jackpot") return this.jackpotMarkup();

		return `<p style="padding:30px;text-align:center;">Yakında</p>`;

	},

	wireGame(game) {

		this.wireBetChips();

		if (game === "slot") this.wireSlot();
		if (game === "wheel") this.wireWheel();
		if (game === "dice") this.wireDice();
		if (game === "box") this.wireBox();
		if (game === "jackpot") this.wireJackpot();

	},

	/* ==========================================
	   SLOT MACHINE
	========================================== */

	slotSymbols: ["🍇", "🍉", "🍋", "🔔", "⭐", "💎", "7️⃣"],
	slotWeight: { "🍇": 20, "🍉": 18, "🍋": 18, "🔔": 14, "⭐": 12, "💎": 8, "7️⃣": 4 },
	slotPay: { "🍇": 2, "🍉": 3, "🍋": 3, "🔔": 5, "⭐": 8, "💎": 20, "7️⃣": 50 },

	slotPick() {

		const total = Object.values(this.slotWeight).reduce((a, b) => a + b, 0);
		let r = Math.random() * total;

		for (const s of this.slotSymbols) {

			r -= this.slotWeight[s];
			if (r <= 0) return s;

		}

		return this.slotSymbols[0];

	},

	slotMarkup() {

		return `
		<div class="gameStageTitle">🎰 Kraliyet Slot</div>
		<div class="slotFrame">
			<div class="slotReels" id="slotReels">
				${[0, 1, 2].map(() => `
				<div class="slotReel">
					<div class="slotCell">🍇</div>
					<div class="slotCell">🍉</div>
					<div class="slotCell">🍋</div>
				</div>
				`).join("")}
			</div>
		</div>
		${this.betChipsHtml([50, 100, 250, 500, 1000])}
		<button class="gamePlayBtn" id="slotPlayBtn">ÇEVİR</button>
		<p style="font-size:11px;color:#B9B9C9;text-align:center;">3 aynı sembol büyük ödül · 2 aynı küçük ödül</p>
		`;

	},

	wireSlot() {

		document.getElementById("slotPlayBtn").onclick = () => this.playSlot();

	},

	playSlot() {

		if (this.spinning || !this.checkBet()) return;

		this.spinning = true;
		this.user.coin -= this.currentBet;
		this.renderCoin();

		const reels = document.querySelectorAll("#slotReels .slotReel");
		let ticks = 0;

		this.activeTimer = setInterval(() => {

			reels.forEach(reel => {

				const cells = reel.querySelectorAll(".slotCell");
				cells.forEach(c => c.textContent = this.slotPick());

			});

			ticks++;

			if (ticks > 14) {

				clearInterval(this.activeTimer);

				const final = [this.slotPick(), this.slotPick(), this.slotPick()];

				reels.forEach((reel, i) => {

					const cells = reel.querySelectorAll(".slotCell");
					cells[0].textContent = final[i];
					cells[1].textContent = this.slotPick();
					cells[2].textContent = this.slotPick();

				});

				this.spinning = false;

				const box = document.querySelector(".gameModalBox");

				if (final[0] === final[1] && final[1] === final[2]) {

					const win = this.currentBet * this.slotPay[final[0]];
					this.user.coin += win;
					this.saveUser();
					this.addHistory(`Slot: +${this.fmt(win)} Coin`);

					const jackpot = final[0] === "7️⃣";
					this.coinBurst(box, jackpot);
					this.toast(jackpot ? `JACKPOT! +${this.fmt(win)} Coin` : `Kazandın! +${this.fmt(win)} Coin`, jackpot ? "jackpot" : "");

				} else if (final[0] === final[1] || final[1] === final[2] || final[0] === final[2]) {

					const win = Math.round(this.currentBet * 1.2);
					this.user.coin += win;
					this.saveUser();
					this.addHistory(`Slot: +${this.fmt(win)} Coin`);
					this.coinBurst(box, false);
					this.toast(`+${this.fmt(win)} Coin`);

				} else {

					this.saveUser();
					this.addHistory(`Slot: -${this.fmt(this.currentBet)} Coin`);
					this.toast("Bu sefer olmadı", "lose");

				}

			}

		}, 65);

	},

	/* ==========================================
	   LUCKY WHEEL
	========================================== */

	wheelSlices: [
		{ label: "x0", mult: 0, color: "#1a1620" },
		{ label: "x1.5", mult: 1.5, color: "#3a2a55" },
		{ label: "x0", mult: 0, color: "#1a1620" },
		{ label: "x2", mult: 2, color: "#7B2EFF" },
		{ label: "x0.5", mult: 0.5, color: "#3a2a55" },
		{ label: "x5", mult: 5, color: "#22C55E" },
		{ label: "x0", mult: 0, color: "#1a1620" },
		{ label: "x10", mult: 10, color: "#F59E0B" }
	],

	wheelMarkup() {

		const n = this.wheelSlices.length;
		const sliceDeg = 360 / n;
		const gradient = this.wheelSlices.map((s, i) => `${s.color} ${i * sliceDeg}deg ${(i + 1) * sliceDeg}deg`).join(",");

		return `
		<div class="gameStageTitle">🎡 Şanslı Çark</div>
		<div class="wheelWrap">
			<div class="wheelPointer"></div>
			<div class="wheelDisc" id="wheelDisc" style="background:conic-gradient(${gradient});">
				${this.wheelSlices.map((s, i) => `
				<div class="wheelSlice" style="transform:rotate(${i * sliceDeg + sliceDeg / 2}deg);">
					<span>${s.label}</span>
				</div>
				`).join("")}
				<div class="wheelCenter">EY</div>
			</div>
		</div>
		${this.betChipsHtml([50, 100, 250, 500, 1000])}
		<button class="gamePlayBtn" id="wheelPlayBtn">ÇARKI ÇEVİR</button>
		`;

	},

	wireWheel() {

		document.getElementById("wheelPlayBtn").onclick = () => this.playWheel();

	},

	wheelRotation: 0,

	playWheel() {

		if (this.spinning || !this.checkBet()) return;

		this.spinning = true;
		this.user.coin -= this.currentBet;
		this.renderCoin();

		const n = this.wheelSlices.length;
		const sliceDeg = 360 / n;
		const idx = Math.floor(Math.random() * n);
		const extraTurns = 5;
		const targetDeg = extraTurns * 360 + (360 - idx * sliceDeg - sliceDeg / 2);

		this.wheelRotation += targetDeg;

		const disc = document.getElementById("wheelDisc");
		disc.style.transform = `rotate(${this.wheelRotation}deg)`;

		setTimeout(() => {

			this.spinning = false;

			const s = this.wheelSlices[idx];
			const win = Math.round(this.currentBet * s.mult);
			const box = document.querySelector(".gameModalBox");

			if (win > 0) {

				this.user.coin += win;
				this.saveUser();
				this.addHistory(`Şanslı Çark: +${this.fmt(win)} Coin`);

				const jackpot = s.mult >= 10;
				this.coinBurst(box, jackpot);
				this.toast(`${s.label} · +${this.fmt(win)} Coin`, jackpot ? "jackpot" : "");

			} else {

				this.saveUser();
				this.addHistory(`Şanslı Çark: -${this.fmt(this.currentBet)} Coin`);
				this.toast("Bu sefer olmadı", "lose");

			}

		}, 3450);

	},

	/* ==========================================
	   DICE
	========================================== */

	diceMarkup() {

		return `
		<div class="gameStageTitle">🎲 Yüksek Zar</div>
		<div class="diceStage">
			<div class="diceCube" id="dice1">🎲</div>
			<div class="diceCube" id="dice2">🎲</div>
		</div>
		<p style="font-size:12px;color:#B9B9C9;text-align:center;">Toplam 8 ve üzeri kazandırır</p>
		${this.betChipsHtml([50, 100, 250, 500, 1000])}
		<button class="gamePlayBtn" id="dicePlayBtn">ZAR AT</button>
		`;

	},

	wireDice() {

		document.getElementById("dicePlayBtn").onclick = () => this.playDice();

	},

	playDice() {

		if (this.spinning || !this.checkBet()) return;

		this.spinning = true;
		this.user.coin -= this.currentBet;
		this.renderCoin();

		const d1 = document.getElementById("dice1");
		const d2 = document.getElementById("dice2");
		const faces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

		d1.classList.add("rolling");
		d2.classList.add("rolling");

		let ticks = 0;

		this.activeTimer = setInterval(() => {

			d1.textContent = faces[Math.floor(Math.random() * 6)];
			d2.textContent = faces[Math.floor(Math.random() * 6)];
			ticks++;

			if (ticks > 12) {

				clearInterval(this.activeTimer);

				const r1 = Math.floor(Math.random() * 6) + 1;
				const r2 = Math.floor(Math.random() * 6) + 1;
				const total = r1 + r2;

				d1.textContent = faces[r1 - 1];
				d2.textContent = faces[r2 - 1];
				d1.classList.remove("rolling");
				d2.classList.remove("rolling");

				this.spinning = false;

				const box = document.querySelector(".gameModalBox");

				if (total >= 8) {

					const mult = total === 12 ? 8 : total >= 10 ? 3 : 1.6;
					const win = Math.round(this.currentBet * mult);
					this.user.coin += win;
					this.saveUser();
					this.addHistory(`Zar: +${this.fmt(win)} Coin`);

					const jackpot = total === 12;
					this.coinBurst(box, jackpot);
					this.toast(`${total} geldi · +${this.fmt(win)} Coin`, jackpot ? "jackpot" : "");

				} else {

					this.saveUser();
					this.addHistory(`Zar: -${this.fmt(this.currentBet)} Coin`);
					this.toast(`${total} geldi · kaybettin`, "lose");

				}

			}

		}, 90);

	},

	/* ==========================================
	   LUCKY BOX
	========================================== */

	boxMarkup() {

		return `
		<div class="gameStageTitle">🎁 Şans Kutusu</div>
		<div class="boxStage" id="boxStage">
			<div class="boxArt" id="boxArt">🎁</div>
		</div>
		${this.betChipsHtml([50, 100, 250, 500, 1000])}
		<button class="gamePlayBtn" id="boxPlayBtn">KUTUYU AÇ</button>
		`;

	},

	wireBox() {

		document.getElementById("boxPlayBtn").onclick = () => this.playBox();

	},

	playBox() {

		if (this.spinning || !this.checkBet()) return;

		this.spinning = true;
		this.user.coin -= this.currentBet;
		this.renderCoin();

		const art = document.getElementById("boxArt");
		art.classList.add("shaking");

		setTimeout(() => {

			art.classList.remove("shaking");
			art.classList.add("opened");

			const roll = Math.random();
			let win = 0;
			let msg = "";
			let kind = "lose";

			if (roll < 0.05) {

				win = this.currentBet * (10 + Math.floor(Math.random() * 15));
				msg = `Kutu dolu! +${this.fmt(win)} Coin`;
				kind = "jackpot";
				art.textContent = "💎";

			} else if (roll < 0.4) {

				win = Math.round(this.currentBet * (1.3 + Math.random()));
				msg = `+${this.fmt(win)} Coin`;
				art.textContent = "🪙";

			} else {

				msg = "Kutu boş çıktı";
				art.textContent = "📦";

			}

			this.spinning = false;

			const box = document.querySelector(".gameModalBox");

			if (win > 0) {

				this.user.coin += win;
				this.saveUser();
				this.addHistory(`Şans Kutusu: +${this.fmt(win)} Coin`);
				this.coinBurst(box, kind === "jackpot");

			} else {

				this.saveUser();
				this.addHistory(`Şans Kutusu: -${this.fmt(this.currentBet)} Coin`);

			}

			this.toast(msg, kind);

			setTimeout(() => {

				art.classList.remove("opened");
				art.textContent = "🎁";

			}, 900);

		}, 1200);

	},

	/* ==========================================
	   JACKPOT
	========================================== */

	jackpotMarkup() {

		return `
		<div class="gameStageTitle">💰 Büyük İkramiye</div>
		<div class="jackpotPool">
			<div class="label">Ödül Havuzu</div>
			<div class="value" id="jackpotPoolValue">${this.fmt(this.jackpotPool)}</div>
		</div>
		<div class="boxStage">
			<div class="jackpotChest" id="jackpotChest">💰</div>
		</div>
		${this.betChipsHtml([100, 250, 500, 1000, 2500])}
		<button class="gamePlayBtn" id="jackpotPlayBtn">ÇEKİLİŞE KATIL</button>
		<p style="font-size:11px;color:#B9B9C9;text-align:center;">Her katılım havuzu büyütür</p>
		`;

	},

	wireJackpot() {

		document.getElementById("jackpotPlayBtn").onclick = () => this.playJackpot();

	},

	playJackpot() {

		if (this.spinning || !this.checkBet()) return;

		this.spinning = true;
		this.user.coin -= this.currentBet;
		this.renderCoin();

		this.jackpotPool += Math.round(this.currentBet * 0.3);
		this.saveJackpot();

		const chest = document.getElementById("jackpotChest");
		chest.classList.add("shaking");

		setTimeout(() => {

			chest.classList.remove("shaking");
			chest.classList.add("opened");

			const roll = Math.random();
			let win = 0;
			let msg = "";
			let kind = "lose";

			if (roll < 0.01) {

				win = this.jackpotPool;
				msg = `BÜYÜK İKRAMİYE! +${this.fmt(win)} Coin`;
				kind = "jackpot";
				this.jackpotPool = 500000;
				this.saveJackpot();

			} else if (roll < 0.2) {

				win = this.currentBet * (3 + Math.floor(Math.random() * 8));
				msg = `+${this.fmt(win)} Coin`;

			} else if (roll < 0.5) {

				win = Math.round(this.currentBet * 1.3);
				msg = `+${this.fmt(win)} Coin`;

			} else {

				msg = "Bu sefer olmadı";

			}

			this.spinning = false;

			const box = document.querySelector(".gameModalBox");

			if (win > 0) {

				this.user.coin += win;
				this.saveUser();
				this.addHistory(`Jackpot: +${this.fmt(win)} Coin`);
				this.coinBurst(box, kind === "jackpot");

			} else {

				this.saveUser();
				this.addHistory(`Jackpot: -${this.fmt(this.currentBet)} Coin`);

			}

			this.toast(msg, kind);

			setTimeout(() => chest.classList.remove("opened"), 900);

		}, 1300);

	}

};

document.addEventListener("DOMContentLoaded", () => {

	Games.init();

});
