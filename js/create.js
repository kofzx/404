function createStars () {
	for (let i = 0; i < num; i++) {
		stars[i] = new Star(random(0, canvas.width), random(0, canvas.height), random(20, 30));
	}
}

function drawStars () {
	for (let i = 0; i < num; i++) {
		stars[i].zoom();
		stars[i].draw();
	}
}

function createPlane () {
	planes = new Plane(canvas.width / 2 - 168, 82);
}

function drawPlane () {
	planes.update();
	planes.draw();
}
