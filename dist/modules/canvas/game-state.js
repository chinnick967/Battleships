import Socket from '../socket/connect.js';
import Render from '/render.js';
import Splash from "../states/splash.js";

var Game = function() {
    var socket = new Socket();
    var render = new Render();
    this.state = {
        page: new Splash()
    };

    Socket.io.on("start-game", function(data) {

    });


    // draws the game on Canvas
    this.render = function() {
        render.drawGame(this.state);
        requestAnimationFrame(this.render);
    }.bind(this);
    this.render();
}

export default Game;