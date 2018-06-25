var Render = function() {
    var canvas = document.getElementById("battleships");
    var ctx = canvas.getContext("2d");
    
    this.drawGame = function(state) {
        var ui = state.interface.ui;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < ui.length; i++) {
            ctx.save();
            ui[i].draw();
            ctx.restore();
        }
    }.bind(this);
}

export default Render;