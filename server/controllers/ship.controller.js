export function generateShip(type) {
    var ship;
    var startPoint = {
        x: getRandomInt(7),
        y: getRandomInt(7),
        hit: false
    }
    var degrees = rotationDegree(getRandomInt(3));
    switch(type) {
        case "L":
            ship = [startPoint, createPoint(startPoint, {x: 1, y: 0}), createPoint(startPoint, {x: 2, y: 0}), createPoint(startPoint, {x: 3, y: 0}), createPoint(startPoint, {x: 3, y: 1})];
            break;
        case "Square":
            ship = [startPoint, createPoint(startPoint, {x: 1, y: 0}), createPoint(startPoint, {x: 1, y: 1}), createPoint(startPoint, {x: 0, y: 1})];
            break;
        case "Line":
            ship = [startPoint, createPoint(startPoint, {x: 1, y: 0}), createPoint(startPoint, {x: 2, y: 0}), createPoint(startPoint, {x: 3, y: 0})];
            break;
        default:
            break;
    }
    return rotateShip(ship, degrees).shiftShip(ship);
}

// create a new point based off the origin points and a provided distance
function createPoint(origin, distance) {
    var point = Object.assign({}, origin);
    point.x += distance.x;
    point.y += distance.y;
    return point;
}

// generate a random int with a max value
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// create a random rotation degree
function rotationDegree(int) {
    // takes value 0 - 3
    var degrees = [0, 90, 180, 270]
    return degrees[int];
}

// rotate ship around the origin
function rotateShip(ship, degrees) {
    if (degrees != 0) {
        for (var i = 1; i < ship.length; i++) {
            var origin = ship[0];
            var point = ship[i];
            var newCoords = rotate(origin.x, origin.y, point.x, point.y, degrees);
            point.x = newCoords.x;
            point.y = newCoords.y;
        } 
    }
    return ship;
}

// rotate a point around the origin point, cx and cy are central points and x, y are the points of the rotated point
function rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return {x: nx, y: ny};
}

// shift ship to keep it in bounds
function shiftShip(ship) {
    var shift = {x: 0, y: 0};
    var maxX = 7, maxY = 7, minX = 0, minY = 0;
    for (var i = 0; i < ship.length; i++) { // gets the maximum/minimum amount out of bounds to determine shift
        var point = ship[i];
        if (point.x < minX) {
            minX = point.x;
        } else if (point.x > maxX) {
            maxX = point.x;
        }
        if (point.y < minY) {
            minY = point.y;
        } else if (point.y > maxY) {
            maxY = point.y;
        }
    }

    if (maxX > 7) {
        shift.x = (maxX - 7) * -1;
    } else if (minX < 0) {
        shift.x = minX * -1;
    }

    if (maxY > 7) {
        shift.y = (maxY - 7) * -1;
    } else if (minY < 0) {
        shift.y = minY * -1;
    }

    return shift(ship, shift);
}

// shifts the ship based off the x and y shift provided
function shift(ship, shift) {
    
}