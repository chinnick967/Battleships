// server.js

var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
var path = require("path");
var mongo = require('mongodb');

import { createNewGame, trimShips, endGame } from './controllers/new-game.controller.js';
import { fire, endTurn, getCurrentGameState } from './controllers/user-interactions.controller.js';

var db;
mongo.connect("mongodb://localhost:27017", function(err, client) {
    if (!err) {
        console.log("Connected to Mongodb");
        db = client.db('battleships');
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

    socket.on('start-game', (data) => {
        if (data.gameID) {
            // reconnect to game, return old game state to user
            getCurrentGameState(data.gameID, db, function(state) {
                socket.emit('update-state', state);
                socket.emit('save-gameID', {id: state["_id"]});
            });
        } else {
            // start new game, clear disconnect timeout, return new game state to user
            var game = createNewGame(db);
            db.collection("games").insertOne(game);
            game = trimShips(game); // strips out player info for the opposing player
            socket.emit('update-state', game);
            socket.emit('save-gameID', {id: game["_id"]});
        }
    });

    socket.on('fire', (data) => {
        fire({x: data.x, y: data.y}, data.id, db, function(hit) {
            getCurrentGameState(data.id, db, function(state) {
                if (state.player1.shipsDestroyed == 4 || state.player2.shipsDestroyed == 4) {
                    endGame(data.id, db, function(finalState) {
                        socket.emit('update-state', finalState);
                    });
                } else {
                    if (hit) {
                        socket.emit('update-state', hit.state);
                        socket.emit('fire-result', hit.result);
                    } else {
                        socket.emit('message', {type: "error", text: "You have already attacked this turn"});
                    }
                }
            });
        });
    });

    socket.on('end-turn', (data) => {
        endTurn(data.id, db, function(newState) {
            socket.emit('update-state', newState);
        });
    });

    socket.on('end-game', (data) => {
        endGame(data.id, db, function(finalState) {
            socket.emit('update-state', finalState);
        });
    });

    socket.on('disconnect', () => {
        console.log("User disconnected");
        // set timeout to end game if user doesn't reconnect
    });
    
});

server.listen(3000);  