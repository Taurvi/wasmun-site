serverMsg = function(msg) {
    console.log('|| SERVER || ' + msg);
};

serverMsg('node.js is initializing');

// Initializing the dependencies.
var app = require('express')();
serverMsg(' Loaded express.');
var http = require('http').Server(app);
serverMsg(' Loaded http.');
var io = require('socket.io')(http);
serverMsg(' Loaded socket.io.');
var Firebase = require('firebase');
serverMsg(' Loaded Firebase');

serverMsg('Server loading complete.');
// SocketIO listens on port 3000
http.listen(3000, function(){
    serverMsg('Server is now listening on *:3000');
});

var database = new Firebase("");

io.sockets.on('connection', function(socket){
    serverMsg('  User has connected: ' + socket.id);

    socket.on('registerSchool', function(dataPackage) {
        console.log(dataPackage);
        database.push(dataPackage, function(err) {
            console.log('callbackFunction')
            if (err) {
                socket.emit('registerError', err);
            } else {
                console.log('emitting');
                socket.emit('registerSuccess', true);

            }
        })
    });

    socket.on('disconnect', function(){
        console.log('  User has disconnected: ' + socket.id);
    });
});

