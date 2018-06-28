var Point = function(properties, actions) {
    var canvas = document.getElementById("battleships");
    var ctx = canvas.getContext("2d");
    this.properties = properties; // x, y, attacked
    this.properties.size = 75;
    switch(this.properties.attacked) { // was originally going to have different borders for each type, hence the multiple declarations
        case "Hit":
            this.properties.background = "#AA3939";
            this.properties.border = "white";
            this.properties.canAttack = false;
            break;
        case "Sunk":
            this.properties.background = "#550000";
            this.properties.border = "white";
            this.properties.canAttack = false;
            break;
        case "Missed":
            this.properties.background = "#84969F";
            this.properties.border = "white";
            this.properties.canAttack = false;
            break;
        default:
            this.properties.background = "#28b6d1";
            this.properties.border = "white";
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

    this.inbounds = function() {
        if (actions.mouse.x >= this.properties.x && actions.mouse.x <= this.properties.x + this.properties.size && actions.mouse.y >= this.properties.y && actions.mouse.y <= this.properties.y + this.properties.size) {
            return true;
        }
        return false;
    }

    $(canvas).on("click", function(event) {   
        if (this.inbounds()) {
            if (!this.attacked) {
                alert(this.properties.xCord + ", " + this.properties.yCord);
                actions.fire(this.properties.xCord, this.properties.yCord);
            } else {
                alert("You have already attacked this position!")
            }
        }
    }.bind(this));

    $(canvas).on("mousemove", function(event) {   
        if (this.inbounds()) {
            if (!this.properties.attacked) {
                canvas.style.cursor = "pointer";
                this.properties.background = "#29526D";
            }
            setTimeout(function() {
                if (!this.inbounds()) {
                    if (!this.properties.attacked) {
                        canvas.style.cursor = "default";
                        this.properties.background = "#28b6d1";
                    }
                }
            }.bind(this), 50);
        }
    }.bind(this));

}

export default Point;