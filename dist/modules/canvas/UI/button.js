var Button = function(properties, actions) {
    var canvas = document.getElementById("battleships");
    var ctx = canvas.getContext("2d");
    this.properties = properties; // x, y, background, border, width, text, color
    this.properties.height = this.properties.width * .25;
    
    this.draw = function() {
        ctx.fillStyle = this.properties.background;
        ctx.strokeStyle = this.properties.border;
        ctx.fillRect(this.properties.x, this.properties.y, this.properties.width, this.properties.height);
        ctx.rect(this.properties.x, this.properties.y, this.properties.width, this.properties.height);
        ctx.stroke();

        var fontSize = this.properties.width * .15;
        ctx.font = fontSize + "px Impact";
        ctx.fillStyle = this.properties.color;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 4;
        ctx.strokeText(this.properties.text, this.properties.x + (this.properties.width / 2 - fontSize), this.properties.y + (this.properties.height / 2 + fontSize / 2.5));
        ctx.fillText(this.properties.text, this.properties.x + (this.properties.width / 2 - fontSize), this.properties.y + (this.properties.height / 2 + fontSize / 2.5));
    }

    this.inbounds = function() {
        if (actions.mouse.x >= this.properties.x && actions.mouse.x <= this.properties.x + this.properties.width && actions.mouse.y >= this.properties.y && actions.mouse.y <= this.properties.y + this.properties.height) {
            return true;
        }
        return false;
    }

    // onclick event for canvas
    canvas.addEventListener("click", function(event) {   
        if (this.inbounds()) {
            this.properties.click();
        }
    }.bind(this));

    // onhover event for canvas
    canvas.addEventListener("mousemove", function(event) {   
        if (this.inbounds()) {
            canvas.style.cursor = "pointer";
            setTimeout(function() {
                if (!this.inbounds()) {
                    canvas.style.cursor = "default";
                }
            }.bind(this), 50);
        }
    }.bind(this));
}

export default Button;