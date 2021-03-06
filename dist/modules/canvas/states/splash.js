import Button from "../UI/button";
import Label from "../UI/label";
import Actions from "../actions";

var Splash = function(socket, state) {
    var canvas = document.getElementById("battleships");
    var actions = new Actions(socket);
    var gameID = localStorage.getItem('gameID');
    if (gameID) {
        actions.play(gameID); // with gameid
    }
    this.ui = [
        new Button({x: canvas.width / 2 - 150, y: 270, background: "#28B6D1", border: "#027B92", width: 300, text: "Start", color: "white", click: function() {actions.play()}}, actions),
        new Label({x: canvas.width / 2 - 280, y: 220, text: "Battleships", fontSize: 120, color: "white"})
    ]
}

export default Splash;