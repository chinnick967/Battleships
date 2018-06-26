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
    var grid = state["player" + state.turn].grid;
    for (var i = 0; i < grid.length; i++) {
        this.points[i] = [];
        for (var j = 0; j < grid[i].length; j++) {
            var pointProperties = {
                x: i * 75 + this.properties.x,
                y: j * 75 + this.properties.y,
                attacked: grid[i][j].attacked
            }
            this.points[i][j] = new Point(pointProperties, actions); // x, y, attacked
        }
    }
}

export default Grid;