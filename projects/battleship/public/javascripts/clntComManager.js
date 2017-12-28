class ClientComManager {
    constructor() {
        // this.socket = io.connect('http://localhost:3000');
        this.socket = io.connect();

        this.initiateOns();
    }

    startComunication() {
        this.socket.on('connection-established', message => {});
    }

    sendUsernameToServer(username) {
        this.socket.emit('client-send-username', username);
    }

    chooseOpponent(opponentId) {
        this.socket.emit('client-chose-opponent', opponentId);
    }

    tryHit(i, j) {
        this.socket.emit('try-hit', { i: i, j: j });
    }

    initiateOns() {
        this.socket.on('username-response', authenticationData => {
            clientUsers.displayUserList(authenticationData);
        });

        this.socket.on('new-user-logged', user => {
            clientUsers.updateUserList(user);
        });

        this.socket.on('game-init', gameInit => {
            clientGame.initiateBoard(gameInit.board, gameInit.yourTurn);
            if (gameInit.yourTurn) {
                clientGame.myTurn = true;
                clientGame.showTurn('Your turn');
            } else {
                clientGame.myTurn = false;
                clientGame.showTurn('Opponent turn');
            }
        });

        this.socket.on('p2-hit-result', hitResult => {
            if (hitResult.hitResult) {
                clientGame.drawMyHit(hitResult.spot.i, hitResult.spot.j);
            } else {
                clientGame.drawMyMiss(hitResult.spot.i, hitResult.spot.j);
            }
        });

        this.socket.on('p1-hit-result', hitResult => {
            if (hitResult.hitResult) {
                clientGame.drawHitOpp(hitResult.spot.i, hitResult.spot.j);
            } else {
                clientGame.drawMissOpp(hitResult.spot.i, hitResult.spot.j);
            }
        });

        this.socket.on('player-no-longer-available', playerId => {
            clientUsers.removePlayer(playerId);
        });

        this.socket.on('you-win', message => {
            clientUsers.gameEnded(message);
        });

        this.socket.on('you-lose', message => {
            clientUsers.gameEnded(message);
        });

        this.socket.on('opponent-name', opponentName => {
            clientGame.showOpponentName(opponentName);
        });

        this.socket.on('opponent-disconnected', message => {
            clientUsers.gameEnded('Your opponent disconnected');
        });

        this.socket.on('announce-disconnection', socketId => {
            clientUsers.someoneDisconected(socketId);
        });
    }
}

var clientComManager = new ClientComManager();
