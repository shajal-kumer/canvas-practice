window.addEventListener('load', () => {
	const canvas = document.querySelector('#canvas');
	const colors = document.querySelector('.colors');
	const strokeSize = document.querySelector('.stroke-size');
	const clear = document.querySelector('.clear');

	const context = canvas.getContext('2d');
	setCanvasDimention();

	// context.strokeStyle = 'red';
	// context.lineWidth = 5;
	// context.strokeRect(100, 100, 100, 200);

	// context.strokeStyle = 'blue';
	// context.lineWidth = 2;
	// context.strokeRect(150, 150, 100, 200);

	// context.stroke();

	// context.beginPath();
	// context.moveTo(100, 100);
	// context.lineTo(200, 100);
	// context.lineTo(200, 150);
	// context.closePath();

	// context.stroke();

	// variables
	let paiting = false;
	let lineWidth = 5;
	let strokeStyle = 'black';

	function startPosition(e) {
		paiting = true;
		context.beginPath();
		context.moveTo(e.clientX - 20, e.clientY - 190);

		draw(e); // for dot draw
	}
	function finishedPosition() {
		paiting = false;
	}

	function draw(e) {
		if (!paiting) return;

		context.lineCap = 'round';
		context.lineWidth = lineWidth;
		context.strokeStyle = strokeStyle;

		context.lineTo(e.clientX - 20, e.clientY - 190);
		context.stroke();

		console.log(e.clientY);
	}
	colors.addEventListener('click', (e) => {
		if (e.target.classList.contains('color')) {
			strokeStyle = e.target.dataset.color;
		}
	});
	strokeSize.addEventListener('change', (e) => {
		lineWidth = e.target.value;
	});
	clear.addEventListener('click', (e) => {
		context.clearRect(0, 0, canvas.width, canvas.height);
	});
	canvas.addEventListener('mousedown', startPosition);
	canvas.addEventListener('mouseup', finishedPosition);
	canvas.addEventListener('mousemove', draw);
});

function setCanvasDimention() {
	canvas.width = window.innerWidth - 40;
	canvas.height = window.innerHeight - 200;
}

window.addEventListener('resize', setCanvasDimention);
