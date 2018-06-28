var ObjectId = require('mongodb').ObjectID;

function getCurrentGameState(id, db, callback) {
    db.collection("games").findOne({"_id": ObjectId(id)}, function(err, result) {
        callback(result);
    });
}

function updateGameState() {
    
}

export function fire(cords, id, db) {
    getCurrentGameState(id, db, function(state) {
        var result;
        if (!state.attacked) {
            state.attacked = true;
            if (state.turn == 1) {
                result = attackShip(state.player2.ships, cords, state.player1.grid); // ships, cordinates, grid, returns the status of the attacked point
            } else {
                result = attackShip(state.player1.ships, cords, state.player2.grid);
            }
        }
    });
}

function attackShip(ships, cords, grid) { // This function is messy and needs to be refactored, too tired tonight (logic was changed because I don't wanna pass opponent's ships to the frontend)
    var gridPoint = grid[cords.x][cords.y];
    gridPoint.attacked = "Missed";
    for (var i = 0; i < ships.length; i++) { // loop through ships
        var ship = ships[i];
        for (var j = 0; j < ship.points.length; j++) { // loop through each ship point
            var point = ship.points[j];
            if (point.x == cords.x && point.y == cords.y) {
                point.hit = true;
                gridPoint.attacked = "Hit";
                if (checkIfSunk(ship)) {
                    for (var k = 0; k < ship.points.length; k++) { // loop through each ship point if sunk to adjust grid and set values to sunk
                        var shipPoint = ship.points[k];
                        grid[shipPoint.x][shipPoint.y].attacked = "Sunk";
                    }
                }
            }
        }
    }
    return gridPoint.attacked;
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