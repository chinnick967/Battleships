import Point from "./Point";

var Grid = function(properties, actions, state) {
    var canvas = document.getElementById("battleships");
    var ctx = canvas.getContext("2d");
    this.properties = properties; // x, y
    this.points = [];
    
    this.draw = function() {
        // loop through squares and draw each one
        for (var x = 0; x < this.points.length; x++) {
            for (var y = 0; y < this.points[x].length; y++) {
                this.points[x][y].draw();
            }
        }
    }

    // create and set points
    console.log("player");
    console.log(state.turn);
    var grid = state["player" + state.turn].grid;
    for (var x = 0; x < grid.length; x++) {
        this.points[x] = [];
        for (var y = 0; y < grid[x].length; y++) {
            var pointProperties = {
                x: x * 75 + this.properties.x,
                y: y * 75 + this.properties.y,
                attacked: grid[x][y].attacked,
                xCord: x,
                yCord: y
            }
            this.points[x][y] = new Point(pointProperties, actions); // x, y, attacked
        }
    }

    state.socketEvents.push("fire-result");
    actions.socket.io.on("fire-result", function(data) {
        for (var i = 0; i < data.cords.length; i++) {
            this.points[data.cords[i].x][data.cords[i].y].hit(data.attack);
        }
    }.bind(this));
}

export default Grid;