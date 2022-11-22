function preload() {
	
}

let randombkg = [];
let bkg;

let lines = [];

let tresh = 0.1;

let ifbg = true;
let wobble = true;
let snap = false;

const ifbgtext = ["draw", "drag"];
const wobbletext = ["inner", "outer"];
const snaptext = "freeze";
let buttons = [];

class Lines {
	constructor(xp1, yp1, xp2, yp2, xp3, yp3, xp4, yp4){
	this.x1 = xp1;
	this.y1 = yp1;
	this.x2 = xp2;
	this.y2 = yp2;
	this.x3 = xp3;
	this.y3 = yp3;
	this.x4 = xp4;
	this.y4 = yp4;
	}
	wobble(){
		let cx1 = this.x1;
		let cy1 = this.y1;
		let cx4 = this.x4;
		let cy4 = this.y4;

		if (touches.length > 0) {
			for (let i = 0; i < touches.length; i++) {
				if (dist(this.x1, this.y1, touches[i].x, touches[i].y) < width/2*1.1) {
					cx1 = touches[i].x;
					cy1 = touches[i].y;
				} 
				
				if (dist(this.x4, this.y4, touches[i].x, touches[i].y) < width/2*1.1) {
					cx4 = touches[i].x;
					cy4 = touches[i].y;
				}

				if (tresh < 0.8) {
					tresh += 0.01;
				}
			}
		} else {
			tresh = 0;
		}

		bezier(lerp(this.x1, cx1, tresh), lerp(this.y1, cy1, tresh), this.x2, this.y2, this.x3, this.y3, lerp(this.x4, cx4, tresh), lerp(this.y4, cy4, tresh));
		//console.log(tresh);
	}
	wibble(){
		let cx2 = this.x2;
		let cy2 = this.y2;
		let cx3 = this.x3;
		let cy3 = this.y3;

		if (touches.length > 0) {
			for (let i = 0; i < touches.length; i++) {
				if (dist(this.x1, this.y1, touches[i].x, touches[i].y) < width/2*1.1) {
					cx2 = touches[i].x;
					cy2 = touches[i].y;
				} 
				
				if (dist(this.x4, this.y4, touches[i].x, touches[i].y) < width/2*1.1) {
					cx3 = touches[i].x;
					cy3 = touches[i].y;
				}

				if (tresh < 1) {
					tresh += 0.01;
				}
			}
		} else {
			tresh = 0;
		}

		bezier(this.x1, this.y1, lerp(this.x2, cx2, tresh), lerp(this.y2, cy2, tresh), lerp(this.x3, cx3, tresh), lerp(this.y3, cy3, tresh), this.x4, this.y4);
		//console.log(tresh);
	}
  }

function setup() {
	createCanvas(windowWidth, windowHeight);

	rectMode(CENTER);

	noFill();

	frameRate(60);

	randombkg = [random(255), random(255), random(255)];
	bkg = [100, 100, 100];

	const basepoints = [width/4, height/4, width/4, height/4, width/4*3, height/4, width/4*3, height/4, width/4, height/4*3, width/4, height/4*3, width/4*3, height/4*3, width/4*3, height/4*3, width/4, height/4, width/4, height/4, width/4, height/4*3, width/4, height/4*3, width/4*3, height/4, width/4*3, height/4, width/4*3, height/4*3, width/4*3, height/4*3];

	for (let i = 0; i < 4; i++) {
		let ii = i + 1;
		lines.push(new Lines(basepoints[ii*8 - 8], basepoints[ii*8 - 7], basepoints[ii*8 - 6], basepoints[ii*8 - 5], basepoints[ii*8 - 4], basepoints[ii*8 - 3], basepoints[ii*8 - 2], basepoints[ii*8 - 1]));
	}

	buttons[0] = createButton(ifbgtext[0]);
	buttons[1] = createButton(wobbletext[0]);
	buttons[2] = createButton(snaptext);

	buttons.forEach(function(button) {
		button.style("user-select: none; align: center;");
	  })

//	  for (let i = 0; i < 3; i++) {
//		buttons[i].position(width/2 - (buttons[i].width / 2), height - buttons[i].height);
//	}

	buttons[0].position(width/2-(buttons[0].width)-(buttons[1].width/2), height - buttons[0].height);
	buttons[1].position(width/2-(buttons[1].width/2), height - buttons[1].height);
	buttons[2].position(width/2+(buttons[1].width/2), height - buttons[2].height);
	
}

function draw() {
	for (let i = 0; i < bkg.length; i++) {
		bkg[i] = lerp(bkg[i], randombkg[i], 0.005);
	}

	if (ifbg == true && snap == false) {
		background(bkg);
	}

	stroke(255 - bkg[0], 255 - bkg[1], 255 - bkg[2]);
	strokeWeight(4);

	if (frameCount % 100 == 0){
		randombkg = [random(255), random(255), random(255)];
	}

//	console.log(bkg[1] + " " + bkg);

//	push();
//	noStroke();
//	rect(width/2, height/2, width/2, height/2);
//	pop();

	for (let i = 0; i < 4; i++) {
		if (wobble == true && snap == false) {
			lines[i].wobble();
		} else if (snap == false) {
			lines[i].wibble();
		}
	}

}

function touchStarted() {
	for (let i = 0; i < touches.length; i++) {
		if (touches[i].x > width/2-(buttons[0].width)-(buttons[1].width/2) && touches[i].x < width/2-(buttons[1].width/2) && touches[i].y > height - buttons[0].height) {
			if (ifbg == true) {
				ifbg = false;
				if (snap == false) {
					background("white");
				}
				buttons[0].html(ifbgtext[1]);
			} else {
				ifbg = true;
				buttons[0].html(ifbgtext[0]);
			}
		} else if (touches[i].x > width/2-(buttons[1].width/2) && touches[i].x < width/2+(buttons[1].width/2) && touches[i].y > height - buttons[1].height) {
			if (wobble == true) {
				wobble = false;
				buttons[1].html(wobbletext[1]);
			} else {
				wobble = true;
				buttons[1].html(wobbletext[0]);
			}
		} else if (touches[i].x > width/2+(buttons[1].width/2) && touches[i].x < width/2+(buttons[1].width/2)+(buttons[2].width) && touches[i].y > height - buttons[2].height) {
			if (snap == true) {
				snap = false;
			} else {
				snap = true;
			}
		}
	}
}
