import Socket from '../socket/connect.js';
import Render from './render.js';
import Splash from "./states/splash.js";
import Main from "./states/main.js";
import EndGame from "./states/end-game.js";

var Game = function() {
    var canvas = document.getElementById("battleships");
    this.socket = new Socket();
    var render = new Render();
    this.state = {
        page: "Splash",
        interface: new Splash(this.socket),
        socketEvents: []
    };

    this.updateState = function(update) {
        var previousState = Object.assign({}, this.state);
        for (var key in update) {
            this.state[key] = update[key];
        }
        this.updateInterface(previousState);
    }

    this.updateInterface = function(previousState) {
        this.removeEvents();
        switch (this.state.page) {
            case "Splash":
                this.state.interface = new Splash(this.socket);
                break;
            case "Main":
                this.state.interface = new Main(this.socket, this.state);
                break;
            case "End":
                localStorage.removeItem("gameID");
                this.state.interface = new EndGame(this.socket, this.state);
                break;
            default:
                break;
        }
    }

    this.removeEvents = function() {
        $(canvas).off();
        canvas.style.cursor = "default"; // resets cursor

        var events = this.state.socketEvents;
        for (var i = 0; i < events.length; i++) { // clear all UI element socket event listeners
            this.socket.io.off(events[i]);
        }
        events.length = 0;
    }

    this.prepareForDestruction = function() {
        this.removeEvents();
        this.socket.io.off("update-state");
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
        console.log("state updated");
        console.log(this.state);
    }.bind(this));

    this.socket.io.on("save-gameID", function(data) {
        localStorage.setItem('gameID', data.id);
    });

}

export default Game;