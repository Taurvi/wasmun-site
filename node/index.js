serverMsg = function (msg) {
    console.log('|| SERVER || ' + msg);
};

serverMsg('node.js is initializing');
/*****************************************************
 ************* DEPENDENCY INITIALIZATION *************
 *****************************************************/
var express = require('express');
serverMsg(' Loaded express.');
var app = express();
var http = require('http').Server(app);
serverMsg('   Initialized express.');
app.use(express.static('public'));
serverMsg('   Initialized "public" folders.')
var http = require('http').Server(app);
serverMsg(' Loaded http.');
var passport = require('passport');
serverMsg(' Loaded passport.');
var expressSession = require('express-session');
serverMsg(' Loaded express-session.');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
serverMsg('   Initialized passport session.');
var io = require('socket.io')(http);
serverMsg(' Loaded socket.io.');
var Firebase = require('firebase');
serverMsg(' Loaded Firebase');
serverMsg('Server loading complete.');

/*****************************************************
 ********************* HTTP PORT *********************
 *****************************************************/
http.listen(8080, function () {
    serverMsg('Server is now listening on *:8080');
});

/*****************************************************
 **************** FIREBASE  DATABASES ****************
 *****************************************************/
var registerDatabase = new Firebase("");

/*****************************************************
 **************** PASSPORT  FUNCTIONS ****************
 *****************************************************/
/*passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('login', new LocalStrategy({
        passReqToCallback: true
    },
    function (req, username, password, done) {
    }));
passport.use('signup', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
    }));*/



/*****************************************************
 **************** ROUTING INFORMATION ****************
 *****************************************************/
app.get('/register', function (req, res) {
    res.sendFile('private/test.html', {root: __dirname});
});
app.get('*', function (req, res) {
    res.sendFile('public/index.html', {root: __dirname});
});

/*app.get('/test', function (req, res) {
 serverMsg('sending private')
 res.send('private/test.html');
 });

 app.get('*', function (req, res) {
 serverMsg('rerouting')
 res.send('../index.html');
 });*/

/*****************************************************
 **************** SOCKET  CONNECTIONS ****************
 *****************************************************/
io.sockets.on('connection', function (socket) {
    // Log when user connects
    serverMsg('  User has connected: ' + socket.id);
    // Detect and handle school registration
    socket.on('registerSchool', function (dataPackage) {
        console.log(dataPackage);
        registerDatabase.push(dataPackage, function (err) {
            console.log('callbackFunction')
            if (err) {
                socket.emit('registerError', err);
            } else {
                console.log('emitting');
                socket.emit('registerSuccess', true);
            }
        })
    });

    // Get a database reference to our posts

// Attach an asynchronous callback to read the data at our posts reference
    socket.on('retrieveRegistration', function(dataPackage) {
        registerDatabase.on('value', function(response)  {
            socket.emit('sendRegData', response.val())
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    })

    // Log when user disconnects
    socket.on('disconnect', function () {
        console.log('  User has disconnected: ' + socket.id);
    });
});

