let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');

// //  fillReact
// context.fillStyle = 'red';
// context.fillRect(50, 50, 100, 100);
// context.fillStyle = 'blue';
// context.fillRect(200, 50, 100, 100);

// // strokeRect()
// context.lineWidth = 5;
// context.strokeStyle = 'green';
// context.strokeRect(50, 200, 100, 100);

// // clearReat()
// context.clearRect(55, 55, 90, 90);

// // filltext()
// context.fillStyle = 'purple';
// context.font = '30px Arial';
// context.fillText('Hello World', 350, 100);

// // strokeText()
// context.lineWidth = 1;
// context.strokeStyle = 'orange';
// context.strokeText('Hello world 2', 350, 150);

// Path
// context.beginPath();
// context.moveTo(50, 50); // start point
// context.lineTo(150, 50);
// context.lineTo(100, 200);

// context.lineTo(50, 50);
// // or
// context.closePath();

// // context.stroke(); // to visible the line
// context.fillStyle = 'coral';
// context.fill();

// context.beginPath();
// context.moveTo(200, 50);
// context.lineTo(150, 200);
// context.lineTo(250, 200);
// context.lineTo(200, 50);

// context.fillStyle = 'coral';
// context.fill();

// // cretae rectangle through path
// context.beginPath();
// context.rect(300, 50, 150, 100);
// context.fill();

// // circle
// context.beginPath();
// context.arc(200, 300, 50, 0, Math.PI * 2);
// context.stroke();

// draw smile mouse

// context.beginPath();
// const canvasX = canvas.width / 2;
// const canvasY = canvas.height / 2;

// context.arc(canvasX, canvasY, 180, 0, Math.PI * 2);

// // draw half circle
// context.moveTo(canvasX + 90, canvasY);
// context.arc(canvasX, canvasY, 90, 0, Math.PI * 1);

// // move to left eye
// context.moveTo(canvasX - 20, canvasY - 60);
// // draw left eye

// context.arc(canvasX - 50, canvasY - 60, 30, 0, Math.PI * 2);

// // move to right eye
// context.moveTo(canvasX + 80, canvasY - 60);
// // draw right eye
// context.arc(canvasX + 50, canvasY - 60, 30, 0, Math.PI * 2);

// Quadratric curves example
// context.beginPath();
// context.moveTo(75, 25);
// // context.lineTo(25, 62.5);

// context.quadraticCurveTo(25, 25, 25, 62.5);
// context.quadraticCurveTo(25, 100, 50, 100);
// context.quadraticCurveTo(50, 120, 30, 125);
// context.quadraticCurveTo(60, 120, 65, 100);
// context.quadraticCurveTo(125, 100, 125, 62.5);
// context.quadraticCurveTo(125, 25, 75, 25);

// context.stroke();

// animation 1
/*
const circle = {
	x: 200,
	y: 200,
	size: 30,
	dx: 5,
	dy: 4,
};

function drawCircle() {
	context.beginPath();
	context.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
	context.fillStyle = 'purple';
	context.fill();
}

function update() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	drawCircle();
	// change position
	circle.x += circle.dx;
	circle.y += circle.dy;

	// detect side walls
	if (circle.x + circle.size >= canvas.width || circle.x - circle.size <= 0) {
		circle.dx *= -1;
	}
	if (circle.y + circle.size >= canvas.height || circle.y - circle.size <= 0) {
		circle.dy *= -1;
	}

	requestAnimationFrame(update);
}

update();
*/
// animation -- 2

const image = document.getElementById('source');

const player = {
	w: 50,
	h: 70,
	x: 20,
	y: canvas.height / 2 - 35,
	speed: 5,
	dx: 0,
	dy: 0,
};

function drawPlayer() {
	context.drawImage(image, player.x, player.y, player.w, player.h);
}

function clear() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function newPos() {
	player.x += player.dx;
	player.y += player.dy;

	detectWalls();
}

function detectWalls() {
	// left wall
	if (player.x < 0) {
		player.x = 0;
	}

	// top wall
	if (player.y < 0) {
		player.y = 0;
	}

	// Right wall
	if (player.x + player.w > canvas.width) {
		player.x = canvas.width - player.w;
	}

	// bottom wall
	if (player.y + player.h > canvas.height) {
		player.y = canvas.height - player.h;
	}
}

function update() {
	clear();
	drawPlayer();

	newPos();

	requestAnimationFrame(update);
}
update();

function moveRight() {
	player.dx += player.speed;
}
function moveLeft() {
	player.dx -= player.speed;
}
function moveUp() {
	player.dy -= player.speed;
}
function moveDown() {
	player.dy += player.speed;
}

function keyDown(e) {
	if (e.key === 'ArrowRight' || e.key === 'Right') {
		moveRight();
	} else if (e.key === 'ArrowLeft' || e.key === 'Left') {
		moveLeft();
	} else if (e.key === 'ArrowUp' || e.key === 'Up') {
		moveUp();
	} else if (e.key === 'ArrowDown' || e.key === 'Down') {
		moveDown();
	}
}

function keyUp(e) {
	if (
		e.key === 'ArrowRight' ||
		e.key === 'Right' ||
		e.key === 'ArrowLeft' ||
		e.key === 'Left' ||
		e.key === 'ArrowUp' ||
		e.key === 'Up' ||
		e.key === 'ArrowDown' ||
		e.key === 'Down'
	) {
		player.dx = 0;
		player.dy = 0;
	}
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

let canvas2 = document.querySelector('#canvas2');
let context2 = canvas2.getContext('2d');

let grd = context2.createLinearGradient(40, 40, 400, 40);
grd.addColorStop(0, 'green');
grd.addColorStop(1, 'white');

context2.fillStyle = grd;

context2.fillRect(40, 40, 400, 250);

let color = (context2.strokeStyle = 'black');

context2.lineWidth = 6;
context2.strokeRect(37, 37, 400, 250);

const w = 400 / 2;
const h = 250 / 2;
console.log(w, h);
// context2.beginPath();
context2.arc(240, 165, 60, 0, Math.PI * 2);
context2.fillStyle = 'red';
context2.fill();
