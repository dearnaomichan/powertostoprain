//object Oriented Collision
var rainDrops = [];
var numRainDrops = 500;
var cir;
function setup() {
	createCanvas(windowWidth,windowHeight);

	for(i=0;i<numRainDrops;i++){
		r = new rectObj(random(-500, width+100),random(height), random(2,5) ) // generate a rectObj
		rainDrops.push(r); //add it to the array.
	}

	cir = new circleObj(150);// create a new circle object
	console.log(rainDrops);
}

function draw(){
	background(255);

	for(i=0;i<numRainDrops;i++){
		rainDrops[i].disp(1); //speed Scalar, make a new datapoint to send in your socke.io message data.speedScalar
		rainDrops[i].collide( cir,rainDrops  ); //collide against the circle object
	}

// where data.x data.y goes
	cir.disp(mouseX,mouseY); //pass the x,y pos in to the circle.

}

function rectObj(x,y,dia){
	this.origX = x
	this.x = x
	this.y = y
	this.dia = dia
	this.c = random(255,100)
	this.origColor = color(this.c)
	this.color = color(this.c)
	this.hit = false;
	this.speed = map(this.c,0,255,2,5)

	this.collide = function(obj,objArray){

		this.hit = collideCircleCircle(this.x, this.y, this.dia, obj.x, obj.y, obj.dia); //collide the cir object into this rectangle object.

		if(this.hit){
			this.color = color(255,255,255,0) //set this rectangle to be transparent
		}

	}

	this.disp = function(speedScalar){
		noStroke();
		fill(this.color);
		this.x +=1 ;
		this.y += this.speed * speedScalar //move to the right!
		if(this.y > height){ //loop to the top!
			this.color = this.origColor;
			this.y = -this.dia;
			this.x = this.origX;
		}
		ellipse(this.x,this.y,this.dia,this.dia);

	}

}

function circleObj(dia){
	this.dia = dia;
	this.color = color(0)
	this.x;
	this.y;

	this.disp = function(x,y){
		this.x = x;
		this.y = y;
		noStroke();
		fill(this.color);
		ellipse(this.x,this.y,this.dia,this.dia);
	}

}
