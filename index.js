let express = require('express');
let app = express();
app.use('/', express.static('public'));

//Initialize HTTP server
let http = require('http');
let server = http.createServer(app);
// let port = process.env.PORT || 3000;
// server.listen(port, () => {
//     console.log("Server listening at port: " + port);
// });
let port = process.env.PORT || 3000;
server.listen(port, ()=> {
console.log('listening at ', port);
});


//Initialize socket.io
let io = require('socket.io').listen(server);

//Listen for individual clients
io.sockets.on('connection', function(socket) {
    console.log("We have a new client: " + socket.id);

    //Listen for a message
    socket.on('msg', function(data) {
        //Data can be numbers, strings, objects
        console.log("Received a 'msg' event");
        console.log(data);

        //Send a response to all clients, including this one
        io.sockets.emit('msg', data);

    });

    //Listen for this client to disconnect
    socket.on('disconnect', function() {
        console.log("A client has disconnected: " + socket.id);
    });
});


