import Button from "../UI/button";
import Label from "../UI/label";
import Actions from "../actions";

var EndGame = function(socket, state) {
    var canvas = document.getElementById("battleships");
    var actions = new Actions(socket);
    var restart = new Event('restart');
    this.ui = [
        new Label({x: canvas.width / 2 - 280, y: 150, text: "Battleships", fontSize: 120, color: "white"}),
        // Player 1
        new Label({x: 300, y: 250, text: "Player 1", fontSize: 40, color: "white", center: true}),

        new Label({x: 150, y: 350, text: "Hits:", fontSize: 24, color: "white"}),
        new Label({x: 450, y: 350, text: state.player1.shotsHit, fontSize: 24, color: "#28b6d1", center: true}),

        new Label({x: 150, y: 400, text: "Misses:", fontSize: 24, color: "white"}),
        new Label({x: 450, y: 400, text: state.player1.shotsMissed, fontSize: 24, color: "#28b6d1", center: true}),

        new Label({x: 150, y: 450, text: "Accuracy:", fontSize: 24, color: "white"}),
        new Label({x: 450, y: 450, text: (state.player1.shotsHit / (state.player1.shotsMissed + state.player1.shotsHit) * 100).toFixed(1) + "%", fontSize: 24, color: "#28b6d1", center: true}),

        new Label({x: 150, y: 500, text: "Ships Sank:", fontSize: 24, color: "white"}),
        new Label({x: 450, y: 500, text: state.player1.shipsDestroyed, fontSize: 24, color: "#28b6d1", center: true}),

        // Player 2
        new Label({x: 908, y: 250, text: "Player 2", fontSize: 40, color: "white", center: true}),

        new Label({x: 758, y: 350, text: "Hits:", fontSize: 24, color: "white"}),
        new Label({x: 1058, y: 350, text: state.player2.shotsHit, fontSize: 24, color: "#C82C37", center: true}),

        new Label({x: 758, y: 400, text: "Misses:", fontSize: 24, color: "white"}),
        new Label({x: 1058, y: 400, text: state.player2.shotsMissed, fontSize: 24, color: "#C82C37", center: true}),

        new Label({x: 758, y: 450, text: "Accuracy:", fontSize: 24, color: "white"}),
        new Label({x: 1058, y: 450, text: state.player2.shotsHit / (state.player2.shotsMissed + state.player2.shotsHit) * 100 + "%", fontSize: 24, color: "#C82C37", center: true}),

        new Label({x: 758, y: 500, text: "Ships Sank:", fontSize: 24, color: "white"}),
        new Label({x: 1058, y: 500, text: state.player2.shipsDestroyed, fontSize: 24, color: "#C82C37", center: true}),

        // Winner
        new Button({x: canvas.width / 2 - 100, y: 600, background: "#28B6D1", border: "#027B92", width: 200, text: "Restart", color: "white", click: function() {canvas.dispatchEvent(restart);}}, actions)
    ]
}

export default EndGame;