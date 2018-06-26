import Socket from '../socket/connect.js';
import Render from './render.js';
import Splash from "./states/splash.js";
import Main from "./states/main.js";

var Game = function() {
    var canvas = document.getElementById("battleships");
    this.socket = new Socket();
    var render = new Render();
    this.state = {
        page: "Splash",
        interface: new Splash(this.socket)
    };

    this.updateState = function(update) {
        var previousState = Object.assign({}, this.state);
        for (var key in update) {
            this.state[key] = update[key];
        }
        this.updateInterface(previousState);
    }

    this.updateInterface = function(previousState) {
        if (this.state.page != previousState.page) {
            switch (this.state.page) {
                case "Splash":
                    this.state.interface = new Splash(this.socket);
                    break;
                case "Main":
                    this.state.interface = new Main(this.socket, this.state);
                    break;
                default:
                    break;
            }
        }
    }

    // draws the game on Canvas
    this.render = function() {
        render.drawGame(this.state);
        requestAnimationFrame(this.render);
    }.bind(this);
    this.render();

    // socket events
    
    this.socket.io.on("update-state", function(data) {
        this.updateState(data);
        console.log(this.state);
    }.bind(this));

}

export default Game;