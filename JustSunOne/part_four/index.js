const initCanvas = () => {
	return new fabric.Canvas("canvas", {
		width: 500,
		height: 500,
		selection: false,
	});
};

const setBackground = (url, canvas) => {
	fabric.Image.fromURL(url, (img) => {
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
			canvas.freeDrawingBrush.color = color;
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

const setColorListener = () => {
	const picker = document.querySelector("#colorPicker");
	picker.addEventListener("change", (e) => {
		color = e.target.value;
		canvas.freeDrawingBrush.color = color;
	});
};

const clearCanvas = (canvas, state) => {
	state.val = canvas.toSVG();
	//console.log(canvas.getObjects());
	canvas.getObjects().forEach((obj) => {
		canvas.remove(obj);
	});
};

const createRect = (canvas) => {
	const rect = new fabric.Rect({
		width: 100,
		height: 100,
		fill: "green",
		top: -50,
		left: canvas.getCenter().left,
		originX: "center",
		originY: "center",
		cornerColor: "white",
		objectCaching: false,
	});
	canvas.add(rect);
	// ANimation
	rect.animate("top", canvas.getCenter().top, {
		onChange: canvas.renderAll.bind(canvas),
		duration: 500,
	});
	// event
	rect.on("selected", (e) => {
		rect.fill = "red";
	});
	rect.on("deselected", (e) => {
		rect.fill = "green";
	});
};

const createCircle = (canvas) => {
	const circle = new fabric.Circle({
		radius: 50,
		fill: "orange",
		top: -50,
		left: canvas.getCenter().left,
		originX: "center",
		originY: "center",
		cornerColor: "white",
	});
	canvas.add(circle);
	// Animation
	circle.animate("top", canvas.height - 50, {
		onChange: canvas.renderAll.bind(canvas),
		duration: 500,
		onComplete: () => {
			circle.animate("top", canvas.getCenter().top, {
				onChange: canvas.renderAll.bind(canvas),
				duration: 500,
				easing: fabric.util.ease.easeOutCubic,
			});
		},
	});

	// event
	circle.on("selected", (e) => {
		// circle.fill = "red";
		circle.set("fill", "red");
	});
	circle.on("deselected", (e) => {
		circle.set("fill", "orange");
	});
};

const groupObjects = (canvas, group, shouldGroup) => {
	if (shouldGroup) {
		const objects = canvas.getObjects();
		group.val = new fabric.Group(objects, { cornerColor: "red" });
		clearCanvas(canvas, state);
		canvas.add(group.val);
		canvas.requestRenderAll();
	} else {
		group.val.destroy();
		const oldGroup = group.val.getObjects();
		canvas.remove(group.val);
		// clearCanvas(canvas, state);
		canvas.add(...oldGroup);
		group.val = null;
		canvas.requestRenderAll();
	}
};

const restoreCanvas = (canvas, state) => {
	if (state.val) {
		fabric.loadSVGFromString(state.val, (objects) => {
			objects = objects.filter((obj) => obj["xlink:href"] !== bgIMG);
			canvas.add(...objects);
		});
	}
};

const imgAdd = (e) => {
	const file = e.target.files[0];
	reader.readAsDataURL(file);
};

const reader = new FileReader();
reader.addEventListener("load", () => {
	//	console.log(reader.result);
	fabric.Image.fromURL(reader.result, (img) => {
		canvas.add(img);
	});
});

// Global Variable
let mousePressed = false;
let currentMode = null;
let color = "#000000";
const group = {};
const state = {};
const modes = {
	pan: "pan",
	drawing: "drawing",
};
const bgIMG = "https://cdn.pixabay.com/photo/2017/03/17/19/37/sky-2152463_960_720.jpg";
const myImage = document.querySelector("#myImage");

// init class and call function
const canvas = initCanvas();
setBackground(bgIMG, canvas);
setPanEvent(canvas, modes);
setColorListener(canvas);

myImage.addEventListener("change", imgAdd);

// canvas.on("after:render", (e) => {
// 	console.log(canvas.getObjects());
// });
