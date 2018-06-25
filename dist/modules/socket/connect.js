var Socket = function() {
    this.io = io();

    this.play = function() {
        var gameID = false;
        if (localStorage.gameID != null) {
            gameID = localStorage.gameID;
        }
        io.emit("play", {gameID: gameID});
    }

}

export default Socket;