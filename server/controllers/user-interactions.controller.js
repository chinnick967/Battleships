var ObjectId = require('mongodb').ObjectID;

export function getCurrentGameState(id, db, callback) {
    db.collection("games").findOne({"_id": ObjectId(id)}, function(err, result) {
        if (callback) {
            callback(result);
        }
    });
}

export function updateGameState(id, db, state, callback) {
    db.collection("games").findOneAndUpdate({"_id": ObjectId(id)}, {$set: state}, {returnOriginal: false}, function(err, result) {
        if (callback) {
            callback(result.value);
        }
    });
}

export function endTurn(id, db, callback) {
    getCurrentGameState(id, db, function(state) {
        if (state.turn === 1) {
            state.turn = 2;
        } else {
            state.turn = 1;
        }
        state.attacked = false;
        updateGameState(id, db, state, function(newState) {
            callback(newState);
        });
    });
}

export function fire(cords, id, db, callback) {
    getCurrentGameState(id, db, function(state) {
        var result;
        if (!state.attacked) {
            state.attacked = true;
            if (state.turn == 1) {
                result = attackShip(state.player2.ships, cords, state.player1.grid, state.player1); // ships, cordinates, grid, returns the status of the attacked point
            } else {
                result = attackShip(state.player1.ships, cords, state.player2.grid, state.player2);
            }
            updateGameState(id, db, state);
            callback({result: {attack: result.attack, cords: result.cords}, state: state});
        } else {
            callback(false);
        }
    });
}

function attackShip(ships, cords, grid, player) { // This function is messy and needs to be refactored, too tired tonight (logic was changed because I don't wanna pass opponent's ships to the frontend)
    var gridPoint = grid[cords.x][cords.y];
    gridPoint.attacked = "Missed";
    var attackedPoints = [{x: cords.x, y: cords.y}];
    for (var i = 0; i < ships.length; i++) { // loop through ships
        var ship = ships[i];
        for (var j = 0; j < ship.points.length; j++) { // loop through each ship point
            var point = ship.points[j];
            if (point.x == cords.x && point.y == cords.y) {
                point.hit = true;
                gridPoint.attacked = "Hit";
                if (checkIfSunk(ship)) {
                    player.shipsDestroyed++;
                    attackedPoints = [];
                    for (var k = 0; k < ship.points.length; k++) { // loop through each ship point if sunk to adjust grid and set values to sunk
                        var shipPoint = ship.points[k];
                        grid[shipPoint.x][shipPoint.y].attacked = "Sunk";
                        attackedPoints.push({x: shipPoint.x, y: shipPoint.y});
                    }
                }
            }
        }
    }
    if (gridPoint.attacked === "Missed") {
        player.shotsMissed++;
    } else {
        player.shotsHit++;
    }
    return {attack: gridPoint.attacked, cords: attackedPoints};
}

function checkIfSunk(ship) {
    var sunk = true;
    for (var i = 0; i < ship.points.length; i++) {
        var point = ship.points[i];
        if (!point.hit) {
            sunk = false;
            i = ship.points.length;
        }
    }
    if (sunk) {
        ship.destroyed = true;
    }
    return sunk;
}