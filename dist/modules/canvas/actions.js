var Actions = function(socket) {
    var canvas = document.getElementById("battleships");
    this.mouse = {
        x: 0,
        y: 0
    }

    this.play = function() {
        socket.play();
    }

    this.fire = function(x, y) {
        socket.fire(x, y);
    }

    // track mouse position
    canvas.addEventListener("mousemove", function(evt) {   
        var rect = canvas.getBoundingClientRect();
        this.mouse = {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
    }.bind(this), false);
}

export default Actions;