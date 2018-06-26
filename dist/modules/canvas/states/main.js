import Button from "../UI/button";
import Label from "../UI/label";
import Grid from "../UI/grid";
import Actions from "../actions";

var Main = function(socket, state) {
    var canvas = document.getElementById("battleships");
    var actions = new Actions(socket);
    this.ui = [
        new Grid({x: 310, y: 200}, actions, state),
        new Label({x: canvas.width / 2 - 280, y: 150, text: "Battleships", fontSize: 120, color: "white"})
    ]
}

export default Main;