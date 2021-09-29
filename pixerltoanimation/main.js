var c_canvas = document.getElementById("myCanvas");
var context = c_canvas.getContext("2d");
for (var x = 0.5; x < 500; x += 10) {
	context.moveTo(x, 0);
	context.lineTo(x, 375);
}

for (var y = 0.5; y < 375; y += 10) {
	context.moveTo(0, y);
	context.lineTo(500, y);
}

context.strokeStyle = "#eee";
context.stroke();

context.beginPath();
context.moveTo(0, 40);
context.lineTo(240, 40);
context.moveTo(260, 40);
context.lineTo(500, 40);
context.moveTo(495, 35);
context.lineTo(500, 40);
context.lineTo(495, 45);

context.moveTo(60, 0);
context.lineTo(60, 153);
context.moveTo(60, 173);
context.lineTo(60, 375);
context.moveTo(65, 370);
context.lineTo(60, 375);
context.lineTo(55, 370);
context.strokeStyle = "#000";
context.stroke();
