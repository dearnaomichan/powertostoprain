
var socket = io.connect('http://150.253.91.141:3010') // set up a place for us to connect to, and try to connect

socket.on('connect', function(data){//when we are connected to something
	console.log("connected to the server" + socket.id); // log out socket's id, some long garbled number letter thing that is unique
})

document.body.addEventListener("touchstart", function (e) {
	if (e.target == canvas) {
		e.preventDefault();
	}
}, false);
document.body.addEventListener("touchend", function (e) {
	if (e.target == canvas) {
		e.preventDefault();
	}
}, false);
document.body.addEventListener("touchmove", function (e) {
	if (e.target == canvas) {
		e.preventDefault();
	}
}, false);

var incomingData = {};

socket.on('forwardedXYposition', function(data){ //if we see a projectRectangle message then we do stuff
// console.log(data);
//first make div, then add to append body. this is not possibile with the 'normal' syntax cause order of operations (with chained methods)
incomingData = data

})



//object Oriented Collision
var rainDrops = [];
var numRainDrops = 400;
var cir;


function setup() {

	var cnv = createCanvas(windowWidth*.75, windowHeight*.75);
	  var x = (windowWidth - width) / 2;
	  var y = (windowHeight - height) / 2;
	  cnv.position(x, y);
	  // background(255);


			for(i=0 ; i<numRainDrops ; i++){
				r = new rectObj(random(-700, width+100),random(height-100), random(3,5) ) // generate a rectObj
				rainDrops.push(r); //add it to the array.
			}

			cir = new circleObj(100);// create a new circle object // size of circle
			// console.log(rainDrops);

		}

function draw(){
	background(0);


	for(i=0;i<numRainDrops;i++){
		rainDrops[i].disp(2); //how many raindrops to display
		rainDrops[i].collide( cir,rainDrops ); //collide against the circle object
	}


// where data.x data.y goes
	// cir.disp(data.left,data.top); //pass the x,y pos in to the circle.
	cir.disp(incomingData.x*.95,incomingData.y*.45);

}

function rectObj(x,y,dia){
	this.origX = x
	this.x = x
	this.y = y
	this.dia = dia
	this.c = random(100,255) // range of color(# - #) of rain
	this.origColor = color(this.c)
	this.color = color(this.c)
	this.hit = false;
	this.speed = map(this.c,0,50,2,5) //randomize location of rain

	this.collide = function(obj,objArray){

		this.hit = collideCircleCircle(this.x, this.y, this.dia, obj.x, obj.y, obj.dia); //collide the cir object into this rectangle object.

		if(this.hit){
			this.color = color(0,0,0,0) //set this circle to be transparent
		}

	}

	this.disp = function(speedScalar){
		noStroke();
		fill(this.color);
		this.x += 1;

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
	this.color = color(255) // color of object when touched
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


//
// function windowResized(){
//   resizeCanvas(windowWidth/2, windowHeight/2);
// }
