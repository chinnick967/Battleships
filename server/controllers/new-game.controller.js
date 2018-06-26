import generateShip from './ship.controller.js';
import generateGrid from './grid.controller.js';

export function createNewGame(db) {
    var newGame = {
        page: "Main",
        turn: 1,
        attacked: false,
        player1: {
            grid: generateGrid(),
            ships: [generateShip("L"), generateShip("Square"), generateShip("Line"), generateShip("Line")],
            shotsHit: 0,
            shotsMissed: 0,
            turns: 1
        },
        player2: {
            grid: generateGrid(),
            ships: [generateShip("L"), generateShip("Square"), generateShip("Line"), generateShip("Line")],
            shotsHit: 0,
            shotsMissed: 0,
            turns: 0
        }
    }
    return newGame;
}

export function trimShips(state) {
    if (state.turn === 1) {
        delete state.player2.ships;
    } else {
        delete state.player1.ships;
    }
    return state;
}