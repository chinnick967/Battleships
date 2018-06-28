var Socket = function() {
    this.io = io();
    this.gameID;

    this.play = function() {
        var gameID = false;
        if (localStorage.gameID != null) {
            gameID = localStorage.gameID;
        }
        this.io.emit("start-game", {gameID: gameID});
    }

    this.fire = function(x, y) {
        this.io.emit("fire", {x: x, y: y, id: this.gameID});
    }

    this.io.on("save-gameID", function(data) {
        this.gameID = data.id;
        // save to localstorage as well for reconnect
    }.bind(this));

}

export default Socket;