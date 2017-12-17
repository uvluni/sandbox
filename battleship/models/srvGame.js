class SrvGame {
    constructor(board1, board2, p1SocketId, p2SocketId) {
        this.board1 = board1;
        this.board2 = board2;
        this.p1SocketId = p1SocketId;
        this.p2SocketId = p2SocketId;
    }

    tryHit(spot, socketId) {
        if (socketId === this.p1SocketId) {
            if (this.board1[spot.i][spot.j]) {
                var hitResult = { hitResult: true, spot: spot, p1SocketId: this.p1SocketId, p2SocketId: this.p2SocketId };
                this.board1[spot.i][spot.j] = 0; // mark as hit
                if (this.checkWin()) {
                    hitResult.winner = socketId;
                    hitResult.loser = this.p2SocketId;
                    return hitResult;
                }
            } else {
                var hitResult = { hitResult: false, spot: spot, p1SocketId: this.p1SocketId, p2SocketId: this.p2SocketId };
                this.changeTurn();
            }

            return { hitResult: hitResult };
        } else {
            return { hitResult: false, winner: false };
        }
    }

    changeTurn() {
        var tempSocketId = this.p1SocketId;
        this.p1SocketId = this.p2SocketId;
        this.p2SocketId = tempSocketId;

        var tempBoard = this.board1;
        this.board1 = this.board2;
        this.board2 = tempBoard;
    }

    checkWin() {
        for (var i = 0; i < 10; ++i) {
            for (var j = 0; j < 10; ++j) {
                if (this.board1[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }
}

module.exports = SrvGame;