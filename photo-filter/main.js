const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

const img = new Image();
const reader = new FileReader();

const imageLoader = document.querySelector("#uploader");
imageLoader.addEventListener("change", uploadImage);

function uploadImage(e) {
	reader.readAsDataURL(e.target.files[0]);
	reader.onload = function () {
		img.src = this.result;
		img.onload = function () {
			canvas.width = img.width;
			canvas.height = img.height;
			context.drawImage(this, 0, 0);
		};
	};
}

function grayScale() {
	const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
	const data = imageData.data;

	for (let i = 0; i < data.length; i += 4) {
		const gray = data[i] * 0.21 + data[i + 1] * 0.71 + data[i + 2] * 0.07;
		data[i] = gray;
		data[i + 1] = gray;
		data[i + 2] = gray;
	}
	context.putImageData(imageData, 0, 0);
}
function sepia() {
	const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
	const data = imageData.data;

	for (let i = 0; i < data.length; i += 4) {
		const gray = data[i] * 0.21 + data[i + 1] * 0.71 + data[i + 2] * 0.07;
		data[i] = gray + 95;
		data[i + 1] = gray + 58;
		data[i + 2] = gray;
	}
	context.putImageData(imageData, 0, 0);
}
function invert() {
	const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
	const data = imageData.data;

	for (let i = 0; i < data.length; i += 4) {
		data[i] = 255 - data[i];
		data[i + 1] = 255 - data[i + 1];
		data[i + 2] = 255 - data[i + 2];
	}
	context.putImageData(imageData, 0, 0);
}
function rbg() {
	const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
	const data = imageData.data;

	for (let i = 0; i < data.length; i += 4) {
		const green = data[i + 1];
		data[i] = data[i];
		data[i + 1] = data[i + 2];
		data[i + 2] = green;
	}
	context.putImageData(imageData, 0, 0);
}
function bgr() {
	const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
	const data = imageData.data;

	for (let i = 0; i < data.length; i += 4) {
		const red = data[i];

		data[i] = data[i + 2];
		data[i + 1] = data[i + 1];
		data[i + 2] = red;
	}
	context.putImageData(imageData, 0, 0);
}
function gbr() {
	const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
	const data = imageData.data;

	for (let i = 0; i < data.length; i += 4) {
		const red = data[i];
		data[i] = data[i + 1];
		data[i + 1] = data[i + 2];
		data[i + 2] = red;
	}
	context.putImageData(imageData, 0, 0);
}
function grb() {
	const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
	const data = imageData.data;

	for (let i = 0; i < data.length; i += 4) {
		const red = data[i];
		data[i] = data[i + 1];
		data[i + 1] = red;
		data[i + 2] = data[i + 2];
	}
	context.putImageData(imageData, 0, 0);
}

function clearFilter() {
	img.src = reader.result;
}

function download() {
	const image = canvas.toDataURL();
	const link = document.createElement("a");
	link.href = image;
	link.download = "image.png";
	link.click();
}

document.querySelectorAll("button")[0].addEventListener("click", grayScale);
document.querySelectorAll("button")[1].addEventListener("click", sepia);
document.querySelectorAll("button")[2].addEventListener("click", invert);
document.querySelectorAll("button")[3].addEventListener("click", rbg);
document.querySelectorAll("button")[4].addEventListener("click", bgr);
document.querySelectorAll("button")[5].addEventListener("click", gbr);
document.querySelectorAll("button")[6].addEventListener("click", grb);
document.querySelectorAll("button")[7].addEventListener("click", clearFilter);
document.querySelectorAll("button")[8].addEventListener("click", download);
