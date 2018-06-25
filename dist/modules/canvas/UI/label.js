var Label = function(properties) {
    var canvas = document.getElementById("battleships");
    var ctx = canvas.getContext("2d");
    this.properties = properties; // x, y, text, fontSize, color
    
    this.draw = function() {
        ctx.font = this.properties.fontSize + "px Impact";
        ctx.fillStyle = this.properties.color;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 4;
        ctx.strokeText(this.properties.text, this.properties.x, this.properties.y);
        ctx.fillText(this.properties.text, this.properties.x, this.properties.y);
    }
}

export default Label;