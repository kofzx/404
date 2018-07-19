window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();

// 判断手机
var ua = navigator.userAgent;
var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
isIphone =!ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
isAndroid = ua.match(/(Android)\s+([\d.]+)/),
isMobile = isIphone || isAndroid;

var canvas = document.createElement('canvas');
canvas.width = document.documentElement.clientWidth || document.body.clientWidth;
canvas.height = document.documentElement.clientHeight || document.body.clientHeight;
// 适配手机
if(!isMobile) {
	document.body.appendChild(canvas);
}

var ctx = canvas.getContext('2d');

var stars = [];
var planes;
var num;
var frame;
var tmpx, tmpy;

var bg, star, plane, fail;

var planeX, planeY, planeW ,pad;
var rangeStartX, rangeEndX, rangeStartY, rangeEndY;

var lastTime, deltaTime;

function init () {
	num = 20;
	frame = 0;

	planeX = canvas.width / 2 - 168;
	planeY = 82;
	planeW = 337;
	planeH = 353;
	pad = 100;

	rangeStartX = planeX - pad,
	rangeEndX = planeX + pad,
	rangeStartY = planeY - pad,
	rangeEndY = planeY + pad;

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
	ctx.drawImage(fail, canvas.width / 2 - fail.width / 2, canvas.height / 2 + 20, fail.width, fail.height);
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
		if (this.scale >= 30) {
			dir = -1 * dir;
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

function event () {
	document.addEventListener('mousemove', mousemoveHandler, false);
}

function mousemoveHandler (e) {
	var px = e.pageX;
	var py = e.pageY;

	if (tmpx - px > 0) {
		planes.x -= 3;
	} else {
		planes.x += 3;
	}
	if (tmpy - py > 0) {
		planes.y -= 1;
	} else {
		planes.y += 1;
	}

	if (planes.x < rangeStartX) {
		planes.x = rangeStartX;
	}
	if (planes.x > rangeEndX) {
		planes.x = rangeEndX;
	}
	if (planes.y > rangeEndY) {
		planes.y = rangeEndY;
	}
	if (planes.y > rangeEndY) {
		planes.y = rangeEndY;
	}
	tmpx = px;
	tmpy = py;
}

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

	event();

	update();
};

