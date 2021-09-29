const onlineImage = "https://cdn.pixabay.com/photo/2017/03/17/19/37/sky-2152463_960_720.jpg";

const initCanvas = () => {
	return new fabric.Canvas("canvas", {
		width: 500,
		height: 500,
		selection: false,
	});
};

const setBackground = (url, canvas) => {
	fabric.Image.fromURL(onlineImage, (img) => {
		canvas.setBackgroundImage(img);
		canvas.renderAll();
	});
};

const toggleMode = (mode) => {
	if (mode === modes.pan) {
		if (currentMode === modes.pan) {
			currentMode = "";
		} else {
			currentMode = modes.pan;
			canvas.isDrawingMode = false;
		}
	} else if (mode === modes.drawing) {
		if (currentMode === modes.drawing) {
			currentMode = "";
			canvas.isDrawingMode = false;
		} else {
			// canvas.freeDrawingBrush = new fabric.CircleBrush(canvas);
			// canvas.freeDrawingBrush = new fabric.SprayBrush(canvas);
			canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
			canvas.freeDrawingBrush.color = "red";
			canvas.freeDrawingBrush.width = 5;

			currentMode = modes.drawing;
			canvas.isDrawingMode = true;
		}
	}

	console.log(`${currentMode}`);
};

const setPanEvent = (canvas, modes) => {
	// mouse over
	canvas.on("mouse:move", (event) => {
		if (mousePressed && currentMode === modes.pan) {
			canvas.setCursor("grab");
			const mEvent = event.e;
			const delta = new fabric.Point(mEvent.movementX, mEvent.movementY);
			canvas.relativePan(delta);
		}
	});

	// kep track of mouse down/up
	canvas.on("mouse:down", (event) => {
		mousePressed = true;
		if (currentMode === modes.pan) {
			canvas.setCursor("grab");
		}
	});
	canvas.on("mouse:up", (event) => {
		mousePressed = false;
		canvas.setCursor("default");
	});
};

// Global Variable

let mousePressed = false;
let currentMode = null;
const modes = {
	pan: "pan",
	drawing: "drawing",
};

// init class and function
const canvas = initCanvas();
setBackground(onlineImage, canvas);
setPanEvent(canvas, modes);
