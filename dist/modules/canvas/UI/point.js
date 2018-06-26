var Point = function(properties, actions) {
    var canvas = document.getElementById("battleships");
    var ctx = canvas.getContext("2d");
    this.properties = properties; // x, y, attacked
    this.properties.size = 75;
    this.properties.attacked = "Hit";
    switch(this.properties.attacked) {
        case "Hit":
            this.properties.background = "red";
            this.properties.border = "purple";
            this.properties.canAttack = false;
            break;
        case "Sunk":
            this.properties.background = "purple";
            this.properties.border = "red";
            this.properties.canAttack = false;
            break;
        default:
            this.properties.background = "white";
            this.properties.border = "blue";
            this.properties.canAttack = true;
            break;
    }
    
    this.draw = function() {
        // draw the point
        ctx.beginPath();
        ctx.rect(this.properties.x, this.properties.y, this.properties.size, this.properties.size);
        ctx.fillStyle = this.properties.background;
        ctx.fill();
        ctx.strokeStyle = this.properties.border;
        ctx.lineWidth = 4;
        ctx.stroke();
    }

}

export default Point;