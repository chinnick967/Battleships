// server.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
var path = require("path");
var mongo = require('mongodb');

var db;
mongo.connect("mongodb://localhost:27017/battleship", function(err, mydb) {
    if (!err) {
        console.log("Connected to Mongodb");
        db = mydb;
    } else {
        console.log("Connection to Mongodb failed: " + err);
        process.exit(1);
    }
});

app.use(express.static(__dirname + '/node_modules')); 

app.get('/', function(req, res, next) {  
    res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
});

app.get('/styles', function(req, res, next) {  
    res.sendFile(path.resolve(__dirname + '/../dist/assets/styles/main.css'));
});

app.get('/bundle', function(req, res, next) {  
    res.sendFile(path.resolve(__dirname + '/../dist/bundle.js'));
});

io.on('connection', (socket) => {

    socket.on('play', (data) => {
        console.log("Play request received");
        if (data.gameID) {
            // reconnect to game, return old game state to user
        } else {
            // start new game, clear disconnect timeout, return new game state to user
        }
    });

    socket.on('disconnect', () => {
        console.log("User disconnected");
        // set timeout to end game if user doesn't reconnect
    });
    
});

server.listen(3000);  