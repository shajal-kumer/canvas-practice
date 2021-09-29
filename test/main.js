window.addEventListener("load", eventWindowLoaded, false);
function eventWindowLoaded() {
	canvasApp();
}
function canvasApp() {
	const theCanvas = document.getElementById("canvas");
	const context = theCanvas.getContext("2d");

	var speed = 5;
	var gravity = 0.1;
	var angle = 295;
	var radians = (angle * Math.PI) / 180;
	var radius = 15;
	var elasticity = 0.5;
	var vx = Math.cos(radians) * speed;
	var vy = Math.sin(radians) * speed;
	var p1 = { x: 20, y: theCanvas.width - radius };
	var ball = { x: p1.x, y: p1.y, velocityx: vx, velocityy: vy, radius: radius, elasticity: elasticity };

	function drawScreen() {
		context.fillStyle = "#EEEEEE";
		context.fillRect(0, 0, theCanvas.width, theCanvas.height);
		//Box
		context.strokeStyle = "#000000";
		context.strokeRect(1, 1, theCanvas.width - 2, theCanvas.height - 2);
		ball.velocityy += gravity;
		if (ball.y + ball.radius > theCanvas.height) {
			ball.velocityy = -ball.velocityy * ball.elasticity;
		}
		ball.y += ball.velocityy;
		ball.x += ball.velocityx;
		context.fillStyle = "#000000";
		context.beginPath();
		context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
		context.closePath();
		context.fill();
	}
	setInterval(drawScreen, 33);
}
