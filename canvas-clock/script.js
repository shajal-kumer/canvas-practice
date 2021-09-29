let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');

let radius = canvas.height / 2;
context.translate(radius, radius);
radius = radius * 0.9;
drawClock();
function drawClock() {
	drawFace(context, radius);
	drawNumbers(context, radius);
}

function drawFace() {
	let gradian;
	context.beginPath();
	context.arc(0, 0, radius, 0, Math.PI * 2);
	context.fillStyle = '#fff';
	context.fill();

	gradian = context.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
	gradian.addColorStop(0, '#333');
	gradian.addColorStop(0.5, '#fff');
	gradian.addColorStop(1, '#333');

	context.strokeStyle = gradian;
	context.lineWidth = radius * 0.1;
	context.stroke();

	context.beginPath();
	context.arc(0, 0, radius * 0.1, 0, Math.PI * 2);
	context.fillStyle = '#000';
	context.fill();
}

function drawNumbers(context, radius) {
	let ang;
	let num;
	context.font = `${radius * 0.15}px arial`;
	context.textBaseline = 'middle';
	context.textAlign = 'center';
	for (num = 1; num < 13; num++) {
		ang = (num * Math.PI) / 6;
		console.log(ang);
		context.rotate(ang);
		context.translate(0, -radius * 0.85);
		context.rotate(-ang);
		context.fillText(num.toString(), 0, 0);
		context.rotate(ang);
		context.translate(0, radius * 0.85);
		context.rotate(-ang);
	}
}
