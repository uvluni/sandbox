var shipsAray = [1, 1, 2, 2, 2, 3, 3, 4];
var board = createEmptyBoard();

while (shipsAray.length) {
    if (getRandBinary() === 1) {
        console.log('/////////////////////////////////');
        tryVertical();
    } else {
        tryHorizontal();
    }
}
printBoard();

function tryVertical() {
    var currentShip = shipsAray.pop();
    var bound = 9 - currentShip;
    do {
        console.log('currentShip: ' + currentShip);
        var randVertical = getRandInRange(bound);
        console.log('randVertical: ' + randVertical);
        var randHorizon = getRandInRange(9);
        console.log('randHorizon 0-9: ' + randHorizon);
        // var shipInserted = insertShipVertical(0, 9, currentShip);
        // var shipInserted = insertShipVertical(6, 9, currentShip);
        // var shipInserted = insertShipVertical(0, 0, currentShip);
        // var shipInserted = insertShipVertical(6, 0, currentShip);
        // var shipInserted = insertShipVertical(2, 2, currentShip);

        var shipInserted = insertShipVertical(randVertical, randHorizon, currentShip);
    } while (!shipInserted);
    // markSurroundingShipVertical(0, 9, currentShip);
    // markSurroundingShipVertical(6, 9, currentShip);
    // markSurroundingShipVertical(0, 0, currentShip);
    // markSurroundingShipVertical(6, 0, currentShip);
    // markSurroundingShipVertical(2, 2, currentShip);

    markSurroundingShipVertical(randVertical, randHorizon, currentShip);
}

function insertShipVertical(vertical, horizon, shipSize) {
    var successfulInsertions = 0;
    for (var i = vertical; i < vertical + shipSize; ++i) {
        if (board[i][horizon] != '1' && board[i][horizon] != 's') {
            successfulInsertions++;
            console.log(successfulInsertions);
        }
        if (vertical != 0) {
            if (board[vertical - 1][horizon] == 's') {
                return false;
            }
        } else if (vertical != 0 && horizon != 0) {
            if (board[vertical - 1][horizon - 1] == 's') {
                return false;
            }
        } else if (vertical != 0) {
            if (board[vertical - 1][horizon + 1] == 's') {
                return false;
            }
        } else if (vertical + shipSize != 10) {
            if ((board[vertical + shipSize][horizon] = 's')) {
                return false;
            }
        } else if (vertical + shipSize != 10 && horizon != 0) {
            if ((board[vertical + shipSize][horizon - 1] = 's')) {
                return false;
            }
        } else if (vertical + shipSize != 10 && horizon != 9) {
            if ((board[vertical + shipSize][horizon + 1] = 's')) {
                return false;
            }
        }
    }
    if (successfulInsertions == shipSize) {
        console.log('successfulInsertions: ' + successfulInsertions);
        console.log('shipSize: ' + shipSize);
        for (var i = vertical; i < vertical + shipSize; ++i) {
            board[i][horizon] = '1';
        }
        return true;
    }
}

function markSurroundingShipVertical(vertical, horizon, shipSize) {
    for (var i = vertical; i < vertical + shipSize; ++i) {
        if (horizon != 9) {
            board[i][horizon + 1] = 's';
        }
        if (horizon != 0) {
            board[i][horizon - 1] = 's';
        }
    }

    if (vertical != 0) {
        board[vertical - 1][horizon] = 's';
    }
    if (vertical != 0 && horizon != 0) {
        board[vertical - 1][horizon - 1] = 's';
    }
    if (vertical != 0) {
        board[vertical - 1][horizon + 1] = 's';
    }
    if (vertical + shipSize != 10) {
        board[vertical + shipSize][horizon] = 's';
    }
    if (vertical + shipSize != 10 && horizon != 0) {
        board[vertical + shipSize][horizon - 1] = 's';
    }
    if (vertical + shipSize != 10 && horizon != 9) {
        board[vertical + shipSize][horizon + 1] = 's';
    }
}

function tryHorizontal() {
    var currentShip = shipsAray.pop();
    var bound = 9 - currentShip;
    do {
        console.log('currentShip: ' + currentShip);
        var randHorizon = getRandInRange(bound);
        console.log('randHorizon: ' + randHorizon);
        var randVertical = getRandInRange(9);
        console.log('randVertical 0-9: ' + randVertical);

        var shipInserted = insertShipHorizontal(randHorizon, randVertical, currentShip);
    } while (!shipInserted);

    markSurroundingShipHorizontal(randHorizon, randVertical, currentShip);
}

function insertShipHorizontal(horizon, vertical, shipSize) {
    var successfulInsertions = 0;
    for (var i = horizon; i < horizon + shipSize; ++i) {
        if (board[vertical][i] != '1' && board[vertical][i] != 's') {
            successfulInsertions++;
            console.log(successfulInsertions);
        }
    }
    if (horizon != 0) {
        if (board[vertical][horizon - 1] == 's') {
            console.log('board[vertical][horizon - 1]: ' + board[vertical][horizon - 1]);
            return false;
        }
    } else if (vertical != 0) {
        if (board[vertical - 1][horizon + shipSize] == 's') {
            console.log('board[vertical - 1][horizon + shipSize]: ' + board[vertical - 1][horizon + shipSize]);
            return false;
        }
    } else if (vertical != 0 && horizon != 0) {
        if (board[vertical - 1][horizon - 1] == 's') {
            console.log('board[vertical - 1][horizon - 1]: ' + board[vertical - 1][horizon - 1]);
            return false;
        }
    } else if (vertical != 9) {
        if (board[vertical + 1][horizon + shipSize] == 's') {
            console.log('board[vertical + 1][horizon + shipSize]: ' + board[vertical + 1][horizon + shipSize]);
            return false;
        }
    } else if (vertical != 9 && horizon != 0) {
        if (board[vertical + 1][horizon - 1] == 's') {
            console.log('board[vertical + 1][horizon - 1]: ' + board[vertical + 1][horizon - 1]);
            return false;
        }
    } else if ((board[vertical][horizon + shipSize] = 's')) {
        console.log('board[vertical][horizon + shipSize]: ' + board[vertical][horizon + shipSize]);
        return false;
    }
    if (successfulInsertions == shipSize) {
        console.log('successfulInsertions: ' + successfulInsertions);
        console.log('shipSize: ' + shipSize);
        for (var i = horizon; i < horizon + shipSize; ++i) {
            board[vertical][i] = '1';
        }
        return true;
    }
}

function markSurroundingShipHorizontal(horizon, vertical, shipSize) {
    for (var i = horizon; i < horizon + shipSize; ++i) {
        if (vertical != 9) {
            board[vertical + 1][i] = 's';
        }
        if (vertical != 0) {
            board[vertical - 1][i] = 's';
        }
    }

    if (horizon != 0) {
        board[vertical][horizon - 1] = 's';
    }
    if (vertical != 0) {
        board[vertical - 1][horizon + shipSize] = 's';
    }
    if (vertical != 0 && horizon != 0) {
        board[vertical - 1][horizon - 1] = 's';
    }
    board[vertical][horizon + shipSize] = 's';
    if (vertical != 9) {
        board[vertical + 1][horizon + shipSize] = 's';
    }
    if (vertical != 9 && horizon != 0) {
        board[vertical + 1][horizon - 1] = 's';
    }
}

function createEmptyBoard() {
    var board = [];
    for (var i = 0; i < 10; ++i) {
        var row = [];
        for (var j = 0; j < 10; ++j) {
            row[j] = '0';
        }
        board[i] = row;
    }
    return board;
}

function getRandBinary() {
    return Math.floor(Math.random() * 2);
}

function getRandInRange(max) {
    return Math.floor(Math.random() * (max + 1));
}

function printBoard() {
    for (var i = 0; i < 10; ++i) {
        var row = '';
        for (var j = 0; j < 10; ++j) {
            row += board[i][j] + ' ';
        }
        console.log(row);
    }
}