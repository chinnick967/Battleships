export function createNewGame(db) {
    var newGame = {
        turn: 1,
        player1: {
            grid: [],
            ships: []
        },
        player2: {
            grid: [],
            ships: []
        }
    }

    db.collection(item["collection"]).insertOne(item, function(err, result) {

    });
}