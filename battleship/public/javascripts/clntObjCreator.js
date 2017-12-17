class Drawable {
    constructor() {}
    draw() {
        position.append(this);
    }
}

class Board extends Drawable {
    constructor(board, canvasWidth, offsetX, offsetY, cellSide, boardWidth) {
        super();
        this.boardWidth = boardWidth;
        this.boardHeight = this.boardWidth / 2;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.cellSide = cellSide;

        this.gameBoard = this.createBoard(board);
    }

    createBoard(gameBoard) {
        for (var i = 0; i < 10; ++i) {
            for (var j = 0; j < 10; ++j) {
                if (gameBoard[i][j] === true) {
                    gameBoard[i][j] = new Cell(i, j, this.cellSide, this.offsetX, this.offsetY, true);
                } else {
                    gameBoard[i][j] = new Cell(i, j, this.cellSide, this.offsetX, this.offsetY, false);
                }
            }
        }
        return gameBoard;
    }
}

class Cell extends Drawable {
    constructor(x, y, cellSide, offsetX, offsetY, sub, tryHit = false) {
        super();
        this.sub = sub;
        this.tryHit = tryHit;
        this.x = offsetX + x;
        this.y = offsetY + y;
        this.side = cellSide;
        this.fontSize = this.side / 2;
        this.textTopMargin = this.side * 0.6;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = '#0F0';
        if (this.sub === true) {
            ctx.arc(this.x * this.side + this.side / 2, this.y * this.side + this.side / 2, this.side / 3, 0, Math.PI * 2, true);
            ctx.stroke();
            ctx.strokeRect(this.x * this.side, this.y * this.side, this.side, this.side);
        } else {
            ctx.strokeRect(this.x * this.side, this.y * this.side, this.side, this.side);
            ctx.stroke();
        }
    }

    drawHit(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = '#0F0';
        if (this.sub === true) {
            var offset = this.side / 4;
            ctx.moveTo(this.x * this.side + offset, this.y * this.side + offset);
            ctx.lineTo(this.x * this.side + this.side - offset, this.y * this.side + this.side - offset);
            ctx.moveTo(this.x * this.side + offset, this.y * this.side + this.side - offset);
            ctx.lineTo(this.x * this.side + this.side - offset, this.y * this.side + offset);
            ctx.stroke();
        } else {
            ctx.arc(this.x * this.side + this.side / 2, this.y * this.side + this.side / 2, this.side / 10, 0, Math.PI * 2, true);
            ctx.stroke();
        }
    }

    drawHitOpp(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = '#0F0';
        var offset = this.side / 4;
        ctx.moveTo(this.x * this.side + offset, this.y * this.side + offset);
        ctx.lineTo(this.x * this.side + this.side - offset, this.y * this.side + this.side - offset);
        ctx.moveTo(this.x * this.side + offset, this.y * this.side + this.side - offset);
        ctx.lineTo(this.x * this.side + this.side - offset, this.y * this.side + offset);
        ctx.stroke();
    }

    showTurn(ctx, message) {
        ctx.clearRect(0, 0, 200, this.side - 1);
        ctx.fillStyle = '#0F0';
        ctx.font = this.fontSize + 'px Arial';
        ctx.fillText(message, 10, this.textTopMargin);
    }

    showOpponentName(ctx, opponentName) {
        ctx.fillStyle = '#0F0';
        ctx.font = this.fontSize + 'px Arial';
        ctx.fillText('Playing against: ' + opponentName, this.side * 10, this.textTopMargin);
    }
}