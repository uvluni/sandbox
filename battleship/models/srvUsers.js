class SrvUsers {
    constructor() {
        this.userList = [];
        this.games = [];
    }

    validateUserName(user) {
        for (var i = 0; i < this.userList.length; ++i) {
            if (user.username === this.userList[i].username) {
                return { validUser: false, userList: null };
            }
        }
        user.inGame = false;
        this.userList.push(user);
        var lobyList = [];
        for (var i = 0; i < this.userList.length; ++i) {
            if (!this.userList[i].inGame) {
                lobyList.push(this.userList[i]);
            }
        }
        return { validUser: true, userList: lobyList };
    }

    getCurrentGame(socketId) {
        for (var i = 0; i < this.games.length; ++i) {
            if (socketId === this.games[i].p1SocketId || socketId === this.games[i].p2SocketId) {
                return this.games[i];
            }
        }
        return false;
    }

    markPlayerAsInGame(userId) {
        for (var i = 0; i < this.userList.length; ++i) {
            if (userId == this.userList[i].socketId) {
                this.userList[i].inGame = true;
                return;
            }
        }
    }

    getUsernameById(userId) {
        for (var i = 0; i < this.userList.length; ++i) {
            if (this.userList[i].socketId == userId) {
                return this.userList[i].username;
            }
        }
    }

    removePlayerById(userId) {
        for (var i = this.userList.length - 1; i >= 0; i--) {
            if (this.userList[i].socketId == userId) {
                this.userList.splice(i, 1);
            }
        }
    }

    removeGameByPlayerId(userId) {
        for (var i = this.games.length - 1; i >= 0; i--) {
            if (this.games[i].p1SocketId == userId) {
                var opponent = this.games[i].p2SocketId;
                this.games.splice(i, 1);
                return opponent;
            }
            if (this.games[i].p2SocketId == userId) {
                var opponent = this.games[i].p1SocketId;
                this.games.splice(i, 1);
                return opponent;
            }
        }
    }
}

var srvUsers = new SrvUsers();
module.exports = srvUsers;