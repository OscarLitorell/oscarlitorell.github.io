/*

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


function mouseDown(event) {

	main
};


function roundToZero(i) { //Rounds a number down to the nearest hundredth if it's bigger than zero, and up if it's smaller.
	if (i > 0) {
		i = Math.floor(i * 100);
	} else {
		i = Math.ceil(i * 100);
	};
	return i * 0.01;
};

//Draws the object on the screen
function updatePos(x, y, angle, id) {
	document.getElementById(id).style.left = x + "px";
	document.getElementById(id).style.bottom = y + "px";
	document.getElementById(id).style.position = "absolute";
	document.getElementById(id).style.transform = "translate(-50%, 50%) rotate(" + angle + "deg)";
};



var Vx = 0; //Pixels per cycle
var Vy = 0; //Pixels per cycle
var angle = 0;//Degrees
var revs = 0; //Degrees per cycle
var g = 1; //Pixels per cycle per cycle
var drag = 0.99;
var bounce = 0.8;
var bouncedrag = 0.7;
var loopVar;

// This function reads the coordinates of the ball.
function readBallPos() {
	var y = window.getComputedStyle(document.getElementById("ball")).getPropertyValue('bottom');
	var x = window.getComputedStyle(document.getElementById("ball")).getPropertyValue('left');
	var x = Number(x.substring(0, x.length - 2));
	var y = Number(y.substring(0, y.length - 2));
	return [x, y];
};

// This function is called each time the user clicks in the box
function jump(event) {
	// Cursor coordinates
	var x = event.layerX;
	var y = 499 - event.layerY;

	// Delta coordinates
	var dX = x - ballX;
	var dY = y - ballY;

	//This part calculates what velocities the ball needs to have to reach the point where the user clicked.
	if (dY > 0) {
		// Runs if the ball needs to travel upwards.
		var time = Math.sqrt(2 * dY / g);
		Vy = time * g;
	} else {
		// Runs if the ball needs to travel down.
		Vy = 15;
		var distanceUp = Math.pow(Vy, 2) * g / 2;
		var time = Math.sqrt(2 * Math.abs(dY) + distanceUp / g) + Vy;
	};
	Vx = dX / time;
};



//Function that initiates the loop
function init() {
	ballX = readBallPos()[0];
	ballY = readBallPos()[1];

	loopVar = setInterval(loop, 1000 / 60);
};

function loop() {
	var roll = revs / 3.6 * Math.PI; //How many pixels the ball rolls per cycle

	//A bounce on the right side
	if (ballX + Vx >= 450) {
		Vx = 0 - Vx;
		Vx *= bounce;
		var speedDiff = (Vy - roll) * bouncedrag;
		Vy -= speedDiff * 0.1;
		revs += speedDiff * 3.6 / Math.PI;
	};

	//A bounce on the left side
	if (ballX + Vx <= 50) {
		Vx = 0 - Vx;
		Vx *= bounce;
		var speedDiff = (0 - roll - Vy) * bouncedrag;
		Vy -= speedDiff * 0.1;
		revs += speedDiff * 3.6 / Math.PI;
	};

	//A bounce on the top
	if (ballY + Vy >= 450) {
		Vy = 0 - Vy;
		Vy *= bounce;
		var speedDiff = (0 - roll - Vx) * bouncedrag;
		Vx -= speedDiff * 0.1;
		revs += speedDiff * 3.6 / Math.PI;
	};

	//A bounce on the bottom
	if (ballY + Vy <= 50) {
		if (Vy < -3) {
			Vy = 0 - Vy;
		}
		ballY = 50;
		Vy *= bounce;
		var speedDiff = (Vx - roll) * bouncedrag;
		Vx -= speedDiff * 0.1;
		revs += speedDiff * 3.6 / Math.PI;
	} else {
		Vy -= g;
	};


	ballX += Vx;
	ballY += Vy;
	angle += revs;

	Vx *= drag;
	Vy *= drag;


	Vx = roundToZero(Vx);
	Vy = roundToZero(Vy);

	updatePos(ballX, ballY, angle, "ball");
};
