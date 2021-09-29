function textChangeListener(evt) {
	var id = evt.target.id;
	var text = evt.target.value;

	if (id == "topLineText") {
		window.topLineText = text;
	} else {
		window.bottomLineText = text;
	}

	redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
}

function redrawMeme(image, topLine, bottomLine) {
	// Get Canvas2DContext
	var canvas = document.querySelector("canvas");
	var context = canvas.getContext("2d");
	// Your code here
	if (image != null) ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

	// Text attributes
	context.font = "30pt Impact";
	context.textAlign = "center";
	context.strokeStyle = "black";
	context.lineWidth = 3;
	context.fillStyle = "white";

	if (topLine != null) {
		context.fillText(topLine, canvas.width / 2, 40);
		context.strokeText(topLine, canvas.width / 2, 40);
	}

	if (bottomLine != null) {
		context.fillText(bottomLine, canvas.width / 2, canvas.height - 20);
		context.strokeText(bottomLine, canvas.width / 2, canvas.height - 20);
	}
}

function saveFile() {
	// debugBase64(document.querySelector("canvas").toDataURL());
	const src = document.querySelector("canvas").toDataURL();
	var newTab = window.open();
	newTab.document.body.innerHTML = `<img src="${src}" />`;
}

function handleFileSelect(evt) {
	var canvasWidth = 500;
	var canvasHeight = 500;
	var file = evt.target.files[0];

	var reader = new FileReader();
	reader.readAsDataURL(file);

	reader.onload = function (fileObject) {
		var data = fileObject.target.result;

		// Create an image object
		var image = new Image();

		// Set image data to background image.
		image.src = data;

		image.onload = function () {
			window.imageSrc = this;
			redrawMeme(window.imageSrc, null, null);
		};

		console.log(fileObject.target.result);
	};
}

window.topLineText = "";
window.bottomLineText = "";
var input1 = document.getElementById("topLineText");
var input2 = document.getElementById("bottomLineText");
input1.oninput = textChangeListener;
input2.oninput = textChangeListener;
document.getElementById("file").addEventListener("change", handleFileSelect, false);
document.querySelector("button").addEventListener("click", saveFile, false);
