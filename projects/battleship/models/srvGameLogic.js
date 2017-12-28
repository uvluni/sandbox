const _ = require('lodash');

class SrvGameLogic {
    constructor() {}
    createBoard2d() {
        var shipsAray = [1, 1, 2, 2, 2, 3, 3, 4];
        var board = this.createEmptyBoard(10, 10);

        while (shipsAray.length) {
            if (getRandBinary() === 1) {
                tryVertical();
            } else {
                tryHorizontal();
            }
        }
        this.changeOnesToTrue(board);
        // printBoard();

        function tryVertical() {
            var currentShip = shipsAray.pop();
            var bound = 9 - currentShip;
            do {
                var randVertical = getRandInRange(bound);
                var randHorizon = getRandInRange(9);
                var shipInserted = insertShipVertical(randVertical, randHorizon, currentShip);
            } while (!shipInserted);
            markSurroundingShipVertical(randVertical, randHorizon, currentShip);
        }

        function insertShipVertical(vertical, horizon, shipSize) {
            var successfulInsertions = 0;
            for (var i = vertical; i < vertical + shipSize; ++i) {
                if (board[i][horizon] != '1' && board[i][horizon] != 's') {
                    successfulInsertions++;
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
                var randHorizon = getRandInRange(bound);
                var randVertical = getRandInRange(9);
                var shipInserted = insertShipHorizontal(randHorizon, randVertical, currentShip);
            } while (!shipInserted);

            markSurroundingShipHorizontal(randHorizon, randVertical, currentShip);
        }

        function insertShipHorizontal(horizon, vertical, shipSize) {
            var successfulInsertions = 0;
            for (var i = horizon; i < horizon + shipSize; ++i) {
                if (board[vertical][i] != '1' && board[vertical][i] != 's') {
                    successfulInsertions++;
                }
            }
            if (horizon != 0) {
                if (board[vertical][horizon - 1] == 's') {
                    return false;
                }
            } else if (vertical != 0) {
                if (board[vertical - 1][horizon + shipSize] == 's') {
                    return false;
                }
            } else if (vertical != 0 && horizon != 0) {
                if (board[vertical - 1][horizon - 1] == 's') {
                    return false;
                }
            } else if (vertical != 9) {
                if (board[vertical + 1][horizon + shipSize] == 's') {
                    return false;
                }
            } else if (vertical != 9 && horizon != 0) {
                if (board[vertical + 1][horizon - 1] == 's') {
                    return false;
                }
            } else if ((board[vertical][horizon + shipSize] = 's')) {
                return false;
            }
            if (successfulInsertions == shipSize) {
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

        return board;
    }

    changeOnesToTrue(board) {
        for (var i = 0; i < 10; ++i) {
            for (var j = 0; j < 10; ++j) {
                if (board[i][j] == 1) {
                    board[i][j] = true;
                } else {
                    board[i][j] = false;
                }
            }
        }
    }

    createEmptyBoard(x, y) {
        return Array.apply(null, Array(x)).map(e => Array(y).fill(false));
    }
}

var srvGameLogic = new SrvGameLogic();
module.exports = srvGameLogic;

// var board = [
//     [false, false, true, true, false, false, false, false, false, false],
//     [false, false, false, false, false, true, false, true, true, false],
//     [false, true, false, false, false, true, false, false, false, false],
//     [false, true, false, false, false, false, false, false, false, false],
//     [false, true, false, true, true, true, true, false, true, false],
//     [false, true, false, false, false, false, false, false, true, false],
//     [false, false, false, false, true, false, true, false, true, false],
//     [false, false, false, false, true, false, true, false, true, false],
//     [false, false, false, false, false, false, true, false, false, false],
//     [false, true, true, true, false, false, true, false, false, false]
// ];