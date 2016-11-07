var express = require('express') // we want to use express , our web host routing system.
var app = express(); // starts express running
var server = require('http').Server( app ) //start the server instance on a port
var io = require('socket.io')(server) //use socket.io for real time connection (aka web sockets)



server.listen(3010, function(){ //set up a server on prto 3000, do a call back when it started successfully
  console.log("server started on 3010")

})

app.use(express.static('public')) //server out everything that is in the public folder

io.on('connection', function(socket){ //if socket.io sees a new connection, do something with them...

  console.log(socket.id); //prints out the socket connected (ie: all users + the projection)

  socket.on('myXYposition', function(data){ //look for any messages with the 'addRectangle'
    // console.log('myXYposition' + data); //log out the 'data' in this case you get true but you could use this to get any arbitrary data you want, think position, color, etc.
    io.emit('forwardedXYposition', data) //sends out a message to the projection to add a rectangle to the screen


  })


// io.on('disconnect'function(){ //doublecheck this.
//   var connectedPeeps = Object.keys(io.sockets.sockets);
//   io.emit('connectedPeeps', connectedPeeps)
// })


})
