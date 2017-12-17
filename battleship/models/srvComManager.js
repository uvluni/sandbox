var srvUsers = require('./srvUsers.js');
var srvGameLogic = require('./srvGameLogic.js');
var srvGame = require('./srvGame.js');

var serverCom = function(socket, io) {
    socket.emit('connection-established', 'You have a socket to the server: ' + socket.id);
    socket.on('client-send-username', function(username) {
        authenticateUser(socket, io, username);
    });

    socket.on('client-chose-opponent', opponentId => {
        connectToChosenOpponent(socket, io, opponentId, socket.id);
    });

    socket.on('try-hit', spot => {
        var srvGame = srvUsers.getCurrentGame(socket.id);
        if (srvGame) {
            var hitResult = srvGame.tryHit(spot, socket.id);
            if (hitResult.hitResult) {
                sendHitResult(socket, io, hitResult.hitResult);
            }
            if (hitResult.winner) {
                announceWinner(io, hitResult.winner, hitResult.loser);
            }
        } else {
            console.log('No game found');
        }
    });

    socket.on('disconnect', transport => {
        srvUsers.removePlayerById(socket.id);
        var opponentId = srvUsers.removeGameByPlayerId(socket.id);
        if (opponentId) {
            srvUsers.removePlayerById(opponentId);
            disconnectOpponent(io, opponentId);
        } else {
            announceYourDisconnection(socket, io);
        }
    });
};

function authenticateUser(socket, io, username) {
    var authenticationData = srvUsers.validateUserName({ username: username, socketId: socket.id });
    socket.emit('username-response', authenticationData);
    if (authenticationData.validUser) {
        socket.broadcast.emit('new-user-logged', { username: username, socketId: socket.id });
    }
}

function connectToChosenOpponent(socket, io, opponentId) {
    var board1 = srvGameLogic.createBoard2d();
    var board2 = srvGameLogic.createBoard2d();
    socket.emit('game-init', { board: board2, yourTurn: true });
    io.to(opponentId).emit('game-init', { board: board1, yourTurn: false });
    var game = new srvGame(board1, board2, socket.id, opponentId);
    srvUsers.games.push(game);
    socket.broadcast.emit('player-no-longer-available', socket.id);
    socket.broadcast.emit('player-no-longer-available', opponentId);
    srvUsers.markPlayerAsInGame(socket.id);
    srvUsers.markPlayerAsInGame(opponentId);
    var player1 = srvUsers.getUsernameById(socket.id);
    var player2 = srvUsers.getUsernameById(opponentId);

    socket.emit('opponent-name', player2);
    io.to(opponentId).emit('opponent-name', player1);
}

function sendHitResult(socket, io, hitResult) {
    io.to(hitResult.p1SocketId).emit('p1-hit-result', hitResult);
    io.to(hitResult.p2SocketId).emit('p2-hit-result', hitResult);
}

function announceWinner(io, winner, loser) {
    io.to(winner).emit('you-win', 'WIN!');
    io.to(loser).emit('you-lose', 'LOST!');
}

function disconnectOpponent(io, opponentId) {
    io.to(opponentId).emit('opponent-disconnected', 'Test');
}

function announceYourDisconnection(socket, io) {
    socket.broadcast.emit('announce-disconnection', socket.id);
}

module.exports = serverCom;