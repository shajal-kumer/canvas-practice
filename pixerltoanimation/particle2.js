// selectors
const canvas = document.querySelector("#myCanvas");
const context = canvas.getContext("2d");

// global variable
const circleCount = 800;
const maxRadius = 20;
const circleArray = [];
const colorArray = ["#046975", "#2EA1D4", "#3BCC2A", "#FFDF59", "#FF1D47"];

window.addEventListener("resize", () => {
	init();
});

class Circle {
	constructor(x, y, dx, dy, radius) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.radius = radius;
		this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
	}

	draw() {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		context.fillStyle = this.color;
		context.fill();
		context.stokeStyle = "black";
		context.stroke();
	}

	update() {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		this.draw();
	}
}

function init() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	for (let i = 0; i < circleCount; i++) {
		const radius = Math.round(Math.random() * maxRadius) + 1;
		const x = Math.floor(Math.random() * (innerWidth - radius * 2) + radius);
		const y = Math.floor(Math.random() * (innerHeight - radius * 2) + radius);
		const dx = (Math.random() - 0.5) * 2;
		const dy = (Math.random() - 0.5) * 2;

		circleArray.push(new Circle(x, y, dx, dy, radius));
	}
}
init();

function animate() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	requestAnimationFrame(animate);
	for (let i = 0; i < circleCount; i++) {
		circleArray[i].update();
	}
}
animate();
