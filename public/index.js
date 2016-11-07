
  var socket = io.connect() //connect to the server
  socket.on('connect', function(data){ // when connected do something
    console.log("connected to the server" + socket.id); // log out our id

  })



// stop touch defaults
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





var pointer;
var xpos = 0;
  function setup(){

      createCanvas(windowWidth, windowHeight);
      	 pointer = loadImage('assets/pointer_finger.png');

      rect(CENTER);

  }

  function draw(){
    background(0);
// image(pointer,winTouchX-100,winTouchY-100);

    translate(winTouchX, winTouchY);
    rotate(radians(frameCount));
    fill(255);
	  rect(0, 0, 100, 100);


    var dataToSend = {
      'y':winTouchY,
      'x':winTouchX,

    }

 // console.log(winTouchX  +" "+ winTouchY);

    socket.emit('myXYposition', dataToSend) // send out a message of addRectangle to the server, it will handle the details!

  }
