export default function generateGrid() {
    var grid = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j <= 7; j++) {
            grid[i][j] = {attacked: false}
        }
    }
    return grid;
}