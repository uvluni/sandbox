class ClientGame {
    constructor() {
        this.drawer;
        this.gameBoard;
        this.enemyGameBoard;
    }

    tryHit(i, j) {
        var checkHit = this.enemyGameBoard.gameBoard[i][j].tryHit;
        if (!checkHit && i >= 0 && i <= 9 && j >= 0 && j <= 9) {
            clientComManager.tryHit(i, j);
        }
    }

    initiateBoard(board2d, yourTurn) {
        document.getElementById('my-board').style.display = 'block';
        var loby = document.getElementById('loby');
        loby.style.display = 'none';
        var enemyBoard2d = this.createEnemyBoard2d(10, 10);

        this.drawer = new Drawer('my-board');
        this.gameBoard = new Board(board2d, this.drawer.canvas.width, 14, 1, this.drawer.cellSide, this.drawer.boardWidth);
        this.enemyGameBoard = new Board(enemyBoard2d, this.drawer.canvas.width, 1, 1, this.drawer.cellSide, this.drawer.boardWidth);
        this.drawer.drawBoard(this.gameBoard);
        this.drawer.drawBoard(this.enemyGameBoard);
    }

    drawMyHit(i, j) {
        this.drawer.drawMyHit(this.gameBoard, i, j);
    }

    drawMyMiss(i, j) {
        this.drawer.drawMyMiss(this.gameBoard, i, j);
    }

    drawMissOpp(i, j) {
        this.drawer.drawMissOpp(this.enemyGameBoard, i, j);
    }

    drawHitOpp(i, j) {
        this.drawer.drawHitOpp(this.enemyGameBoard, i, j);
    }

    showTurn(message) {
        this.drawer.showTurn(this.gameBoard, message);
    }

    showOpponentName(opponentName) {
        this.drawer.showOpponentName(this.gameBoard, opponentName);
    }

    createEnemyBoard2d(x, y) {
        return Array.apply(null, Array(x)).map(e => Array(y).fill(false));
    }
}

var clientGame = new ClientGame();