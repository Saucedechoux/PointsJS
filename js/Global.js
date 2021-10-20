import Point from "./Point.js";

class Global {
	constructor() {

		// Récupération des éléments du DOM

		this.body = document.querySelector("body");
		this.menu = document.querySelector(".menu")
		this.menuActivate = document.querySelector(".menu-activate")
		this.neon = document.querySelector(".submenu.neon")
		this.restart = document.querySelector(".submenu.restart")
		this.move = document.querySelector(".submenu.move")
		this.divRandomMove = document.querySelector(".submenu.random-move")

		// Variables globales

		this.isDown = false;
		this.size
		this.maxCount
		this.mixMode = false;
		this.xMove = 500
		this.yMove = 500

		// Variables pour les couleurs

		this.isColorHUEIncreasing = false;
		this.isColorSaturationIncreasing = false;
		this.isColorLuminosityIncreasing = false;
		this.colorHUE = 0
		this.colorSaturation = 75
		this.colorLuminosity = 35

		// Variables pour le mouvement aléatoire

		this.isGoingUp = true
		this.isGoingRight = true
		this.offset = 10
		this.xOffset = 10
		this.yOffset = 10

		// Appel fonction principale

		this.init()

	}

	init() {
		this.getURLParams()
		this.addEventsListeners()
	}

	addEventsListeners() {

		// Ajout des événements sur le body
		this.body.addEventListener("mousedown", () => {
			this.isDown = !this.isDown
		})

		this.body.addEventListener("mouseup", () => {
			this.isDown = !this.isDown
		})

		this.body.addEventListener("mousemove", e => {
			if (!this.isDown) return
			this.updateColors()
			Point.deleteElements(this.maxCount)
			new Point({
				x: e.clientX,
				y: e.clientY,
				size: this.size,
				color: `hsl(${this.colorHUE}, ${this.colorSaturation}%, ${this.colorLuminosity}%)`,
				mixMode: this.mixMode,
			})
		})

		// Ajout évenements cercles

		this.neon.addEventListener("click", () => {
			if (!this.mixMode) this.mixMode = "screen"
			else this.mixMode = null
		})

		this.restart.addEventListener("click", () => {
			document.location = "../choix.html"
		})

		this.move.addEventListener("click", () => {
			requestAnimationFrame(() => Point.move(-15, -15))
		})

		this.menuActivate.addEventListener("click", () => {
			this.menu.classList.toggle("not-visible")
		})

		this.divRandomMove.addEventListener("click", () => {
			requestAnimationFrame(() => this.randomMove())
		})

	}

	getURLParams() {
		const params = new URLSearchParams(document.location.search.substring(1))
		this.size = parseInt(params.get("taille"), 10)
		this.maxCount = parseInt(params.get("nombre"), 10)

		if (!this.size) this.size = 200
		if (!this.maxCount) this.maxCount = 50
	}

	updateColors() {

		if (this.colorHUE >= 360 || this.colorHUE <= 0) {
			this.isColorHUEIncreasing = !this.isColorHUEIncreasing
		}

		if (this.colorSaturation >= 100 || this.colorSaturation <= 75) {
			this.isColorSaturationIncreasing = !this.isColorSaturationIncreasing
		}

		if (this.colorLuminosity >= 100 || this.colorLuminosity <= 75) {
			this.isColorLuminosityIncreasing = !this.isColorLuminosityIncreasing
		}

		this.isColorHUEIncreasing ? this.colorHUE++ : this.colorHUE--
		this.isColorSaturationIncreasing ? this.colorSaturation++ : this.colorSaturation--
		this.isColorLuminosityIncreasing ? this.colorLuminosity++ : this.colorLuminosity--
	}

	randomMove() {

		if (this.xMove > window.innerWidth - (this.size / 2) || this.xMove < this.size / 2) {
			this.xOffset = this.getRandomArbitrary(2, 11)
			this.yOffset = this.getRandomArbitrary(2, 11)
			this.isGoingRight = !this.isGoingRight
		}
		if (this.yMove > window.innerHeight - (this.size / 2) || this.yMove < this.size / 2) {
			this.xOffset = this.getRandomArbitrary(2, 11)
			this.yOffset = this.getRandomArbitrary(2, 11)
			this.isGoingUp = !this.isGoingUp
		}

		this.isGoingRight ? this.xMove += this.xOffset : this.xMove -= this.xOffset
		this.isGoingUp ? this.yMove += this.yOffset : this.yMove -= this.yOffset

		this.updateColors()
		Point.deleteElements(this.maxCount)

		new Point({
			x: this.xMove,
			y: this.yMove,
			size: this.size,
			color: `hsl(${this.colorHUE}, ${this.colorSaturation}%, ${this.colorLuminosity}%)`,
			mixMode: this.mixMode,
		})

		requestAnimationFrame(() => this.randomMove())
	}

	getRandomArbitrary(min, max) {
		return Math.random() * (max - min) + min;
	}

}

export default Global