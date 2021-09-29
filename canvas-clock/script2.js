let leather = new Image();
leather.src = 'leather.png';

function draw() {
	const context = document.querySelector('#canvas').getContext('2d');

	context.canvas.width = window.innerWidth;
	context.canvas.height = window.outerHeight;

	context.rect(50, 50, 100, 100);
	context.clip();

	context.rect(0, 0, 100, 100);

	context.stroke();
}

window.onload = draw;
