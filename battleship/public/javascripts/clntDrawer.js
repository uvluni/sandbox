class Drawer {
    constructor(canvasID) {
        this.canvas = document.getElementById(canvasID);
        this.canvas.width = screen.availWidth * 0.8;
        this.canvas.height = this.canvas.width / 2;
        this.boardWidth = this.canvas.width / 2;
        this.cellSide = this.boardWidth / 10 * 0.8;

        this.onCanvasCick();

        if (!this.canvas.getContext) throw Error('No Canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    drawBoard(gameBoard) {
        for (var i = 0; i < 10; ++i) {
            for (var j = 0; j < 10; ++j) {
                gameBoard.gameBoard[i][j].draw(this.ctx);
            }
        }
    }

    drawMyHit(gameBoard, i, j) {
        gameBoard.gameBoard[i][j].drawHit(this.ctx);
        gameBoard.gameBoard[i][j].showTurn(this.ctx, 'Opponent turn');
    }

    drawMyMiss(gameBoard, i, j) {
        gameBoard.gameBoard[i][j].drawHit(this.ctx);
        gameBoard.gameBoard[i][j].showTurn(this.ctx, 'Your turn');
    }

    drawHitOpp(gameBoard, i, j) {
        gameBoard.gameBoard[i][j].drawHitOpp(this.ctx);
        gameBoard.gameBoard[i][j].showTurn(this.ctx, 'Your turn');
    }

    drawMissOpp(gameBoard, i, j) {
        gameBoard.gameBoard[i][j].drawHit(this.ctx);
        gameBoard.gameBoard[i][j].showTurn(this.ctx, 'Opponent turn');
    }

    onCanvasCick() {
        this.canvas.addEventListener('click', event => {
            var i = parseInt(event.offsetX / this.cellSide) - 1;
            var j = parseInt(event.offsetY / this.cellSide) - 1;
            clientGame.tryHit(i, j);
            clientGame.enemyGameBoard.gameBoard[i][j].tryHit = true;
        });
    }

    showTurn(gameBoard, message) {
        gameBoard.gameBoard[0][0].showTurn(this.ctx, message);
    }

    showOpponentName(gameBoard, opponentName) {
        gameBoard.gameBoard[0][0].showOpponentName(this.ctx, opponentName);
    }
}