window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();

var canvas = document.createElement('canvas');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
document.body.append(canvas);

var ctx = canvas.getContext('2d');

var stars = [];
var planes;
var num;
var frame;

var bg, star, plane, fail;

var lastTime, deltaTime;

function init () {
	num = 20;
	frame = 0;

	bg = new Image();
	star = new Image();
	plane = new Image();
	fail = new Image();
	bg.src = 'images/bg.jpg';
	star.src = 'images/star.png';
	plane.src = 'images/plane2.png';
	fail.src = 'images/404.png';

	lastTime = Date.now();
}

function clear () {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBg () {
	ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
}

function draw404 () {
	ctx.drawImage(fail, canvas.width / 2 - fail.width / 2, canvas.height / 2 - 50, fail.width, fail.height);
}

function Star (x, y, scale) {
	this.x = x;
	this.y = y;
	this.scale = scale;
	this.timer = 0;
}
Star.prototype.zoom = function () {
	this.timer += deltaTime;
	var dir = 2;
	if (this.timer > 70) {
		if (this.scale <= 20 || this.scale >= 30) {
			dir = -dir;
		}
		this.scale += dir;
		this.timer = 0;
	}
};
Star.prototype.draw = function () {
	ctx.drawImage(star, this.x, this.y, this.scale, this.scale);
};

function Plane (x, y) {
	this.x = x;
	this.y = y;
	this.num = 4;
	this.l = 337;
	this.timer = 0;
	this.picNo = 0;
}
Plane.prototype.update = function () {
	this.timer += deltaTime;
	if (this.timer > 100) {
		if (this.picNo >= this.num) this.picNo = 0;
		this.picNo++;
		this.timer = 0;
	}
};
Plane.prototype.draw = function () {
	ctx.drawImage(plane, this.picNo * this.l, 0, this.l, plane.height, this.x, this.y, this.l, plane.height);
};

function update () {

	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;

	clear();
	drawBg();
	drawStars();
	drawPlane();
	draw404();
	window.requestAnimationFrame(update);
}

window.onload = function () {
	init();
	createStars();
	createPlane();

	update();
};

