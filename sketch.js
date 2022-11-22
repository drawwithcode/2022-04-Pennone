function preload() {
	
}

let randombkg = [];
let bkg;

let lines = [];

let tresh = 0.1;

let ifbg = true;

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
			if (tresh > 0) {
				tresh -= 0.01;
			}
		}

		bezier(lerp(this.x1, cx1, tresh), lerp(this.y1, cy1, tresh), this.x2, this.y2, this.x3, this.y3, lerp(this.x4, cx4, tresh), lerp(this.y4, cy4, tresh));
		//console.log(tresh);
	}
  }

function setup() {
	createCanvas(windowWidth, windowHeight);

	rectMode(CENTER);

	noFill();

	randombkg = [random(255), random(255), random(255)];
	bkg = [100, 100, 100];

	const basepoints = [width/4, height/4, width/4, height/4, width/4*3, height/4, width/4*3, height/4, width/4, height/4*3, width/4, height/4*3, width/4*3, height/4*3, width/4*3, height/4*3, width/4, height/4, width/4, height/4, width/4, height/4*3, width/4, height/4*3, width/4*3, height/4, width/4*3, height/4, width/4*3, height/4*3, width/4*3, height/4*3];

	for (let i = 0; i < 4; i++) {
		let ii = i + 1;
		lines.push(new Lines(basepoints[ii*8 - 8], basepoints[ii*8 - 7], basepoints[ii*8 - 6], basepoints[ii*8 - 5], basepoints[ii*8 - 4], basepoints[ii*8 - 3], basepoints[ii*8 - 2], basepoints[ii*8 - 1]));
	}
	
}

function draw() {
	for (let i = 0; i < bkg.length; i++) {
		bkg[i] = lerp(bkg[i], randombkg[i], 0.005);
	}

	if (ifbg == true) {
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
		lines[i].wobble();
	}

}
