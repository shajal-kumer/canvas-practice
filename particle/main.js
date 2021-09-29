const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

window.addEventListener("load", () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.style.backgroundColor = "#000";

	loop();
});

var particles = [];
var tick = 0;
function loop() {
	requestAnimationFrame(loop);
	createParticles();
	drawParticles();
	updateParticles();
	killParticles();
}
// requestAnimationFrame(loop);

function createParticles() {
	//add particle if fewer than 100
	if (particles.length < 100) {
		particles.push({
			x: Math.random() * canvas.width, //between 0 and canvas width
			y: 0,
			speed: 2 + Math.random() * 3, //between 2 and 5
			radius: 5 + Math.random() * 5, //between 5 and 10
			color: "white",
		});
	}
}
function drawParticles() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	for (let i in particles) {
		var part = particles[i];
		console.log(part);
		context.beginPath();
		context.arc(part.x, part.y, part.radius, 0, Math.PI * 2, true);
		context.closePath();
		context.fillStyle = part.color;
		context.fill();
	}
}

function updateParticles() {
	for (var i in particles) {
		var part = particles[i];
		part.y += part.speed;
	}
}
function killParticles() {
	for (var i in particles) {
		var part = particles[i];
		if (part.y > canvas.height) {
			part.y = 0;
		}
	}
}
