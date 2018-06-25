var Button = function(properties) {
    var canvas = document.getElementById("battleships");
    var ctx = canvas.getContext("2d");
    this.properties = properties; // x, y, background, border, width
    
    this.draw = function() {
        ctx.fillStyle = this.properties.background;
        ctx.strokeStyle = this.properties.border;
        ctx.fillRect(this.properties.x, this.properties.y, this.properties.width, this.properties.width * .6);
        ctx.rect(this.properties.x, this.properties.y, this.properties.width, this.properties.width * .6);
        ctx.stroke();
    }

    this.clicked = function() {

    }

    // onclick event for canvas
}

export default Button;