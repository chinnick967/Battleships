import Game from './game-state.js';

$(function() {
    var canvas = document.getElementById("battleships");

    this.game = new Game();
    canvas.addEventListener('restart', function(e) {
        this.game.prepareForDestruction();
        delete this.game;
        this.game = new Game();
    }.bind(this));
});