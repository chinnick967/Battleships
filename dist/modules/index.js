// Third Party Dependencies
window.jQuery = window.$ = require("../../node_modules/jquery/dist/jquery.min.js");

// Scripts
require("./canvas/game-state.js");
require("./socket/connect.js");
require("./canvas/init.js");
require("./canvas/render.js");
require("./canvas/actions.js");
require("./canvas/states/end-game.js");
require("./canvas/states/main.js");
require("./canvas/states/splash.js");
require("./canvas/UI/button.js");
require("./canvas/UI/grid.js");
require("./canvas/UI/square.js");
require("./canvas/UI/ship.js");