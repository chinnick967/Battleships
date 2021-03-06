import Button from "../UI/button";
import Label from "../UI/label";
import Grid from "../UI/grid";
import Actions from "../actions";

var Main = function(socket, state) {
    var canvas = document.getElementById("battleships");
    var actions = new Actions(socket);
    this.ui = [
        new Grid({x: 310, y: 165}, actions, state),
        new Label({x: canvas.width / 2 - 280, y: 130, text: "Battleships", fontSize: 120, color: "white"}),
        new Button({x: 780, y: 815, background: "#28B6D1", border: "#027B92", width: 120, text: "End Turn", color: "white", click: function() {actions.endTurn()}}, actions),
        new Button({x: 780, y: 855, background: "#28B6D1", border: "#027B92", width: 120, text: "Surrender", color: "white", click: function() {actions.endGame()}}, actions),
        new Label({x: 320, y: 795, text: "Player " + state.turn + "'s Turn", fontSize: 20, color: "white"}),
        new Label({x: 735, y: 795, text: "Ships Destroyed: " + state['player' + state.turn].shipsDestroyed + "/4", fontSize: 20, color: "white"})
    ]
}

export default Main;