var Actions = function(socket) {
    this.socket = socket;
    var canvas = document.getElementById("battleships");
    this.mouse = {
        x: 0,
        y: 0
    }

    this.play = function(gameID) {
        if (gameID) {
            socket.play(gameID);
        } else {
            socket.play();
        }
    }

    this.fire = function(x, y) {
        socket.fire(x, y);
    }

    this.endTurn = function() {
        socket.endTurn();
    }

    this.endGame = function() {
        socket.endGame();
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