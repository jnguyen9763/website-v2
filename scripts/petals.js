function petalsAnimation() {
	const canvas = document.querySelector('canvas');
	if (!canvas.getContext) {
		console.log('Cannot run petals animation');
		return;
	}

	// run animation
	let ctx = canvas.getContext('2d');
	const petal = new Image();
	const flower = new Image();
	let stopAnimation = false;
	// constants
	const NUM_PETALS = window.matchMedia('(max-width: 767.98px)').matches
		? 25
		: 75;
	const TOLERANCE = 5;
	const ROTATE_TOLER = 20;
	const ROTATE_DIFF = 3;
	const FLOWER_CHANCE = 3;

	const petals = new Array(NUM_PETALS);
	const fallen = new Array(NUM_PETALS);
	function init() {
		petal.src = 'assets/images/animation/petal.svg';
		flower.src = 'assets/images/animation/flower.svg';
		for (let i = 0; i < NUM_PETALS; i++) {
			if (randomInteger(0, FLOWER_CHANCE) === 0) petals[i] = new Flower();
			else petals[i] = new Petal();
			fallen[i] = false;
		}
		window.requestAnimationFrame(draw);
	}

	function draw() {
		//clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// run animation
		for (let i = 0; i < NUM_PETALS; i++) {
			if (petals[i].x < TOLERANCE) petals[i].x = canvas.width - TOLERANCE;
			if (petals[i].x > canvas.width - TOLERANCE) petals[i].x = TOLERANCE;
			if (petals[i].y > canvas.height + petals[i].height) fallen[i] = true;
			petals[i].draw();
		}
		// stop animation
		stopAnimation = true;
		for (let fell of fallen) {
			if (fell === false) {
				stopAnimation = false;
				break;
			}
		}
		if (stopAnimation) {
			ctx = null;
			return;
		}
		window.requestAnimationFrame(draw);
	}

	class Falling {
		constructor(width, height) {
			// rotation
			this.origRotat = randomInteger(0, 360);
			this.rotation = this.origRotat;
			// size
			this.width = width;
			this.height = height;
			// initial position
			this.x = randomInteger(0, canvas.width);
			this.y = randomInteger(-1500, -25);
			// speed
			this.speedX = randomDecimal(-0.25, 0.25);
			this.speedY = randomDecimal(1, 2);
			// side by side rotation
			this.turn = randomInteger(0, 1); // turn left or right
		}
	}

	Falling.prototype.draw = function () {
		this.fall();
		this.show();
	};

	Falling.prototype.fall = function () {
		this.x += this.speedX;
		this.y += this.speedY;
	};

	Falling.prototype.show = function (img) {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(radians(this.rotation));
		if (0 <= this.y) {
			let opacity = 1 - this.y / canvas.height;
			ctx.globalAlpha = opacity >= 0 ? opacity : 0;
		}
		ctx.drawImage(
			img,
			-this.width / 2,
			-this.height / 2,
			this.width,
			this.height
		);
		ctx.restore();
	};

	class Petal extends Falling {
		constructor() {
			const width = randomInteger(15, 20);
			super(width, width / 2.5);
			this.change = false; // change direction of turn
		}

		show() {
			super.show(petal);
			if (
				Math.abs(this.origRotat - this.rotation) < ROTATE_TOLER ||
				this.change
			) {
				if (this.change) {
					this.turn = !this.turn;
					this.change = false;
				}
				let rotateDiff = randomInteger(0, ROTATE_DIFF);
				if (this.turn) this.rotation += rotateDiff;
				else this.rotation -= rotateDiff;
			} else this.change = true;
		}
	}

	class Flower extends Falling {
		constructor() {
			const size = randomInteger(13, 17);
			super(size, size);
			this.rotateDiff = randomInteger(1, ROTATE_DIFF);
		}

		show() {
			super.show(flower);
			if (this.turn) this.rotation += this.rotateDiff;
			else this.rotation -= this.rotateDiff;
		}
	}

	init();
}

function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDecimal(min, max) {
	return Math.random() * (max - min) + min;
}

function radians(degree) {
	return (degree * Math.PI) / 180;
}
