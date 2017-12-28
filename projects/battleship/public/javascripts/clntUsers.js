class ClientUsers {
    constructor() {
        this.login = document.getElementById('login');
        this.loby = document.getElementById('loby');
        this.gameScreen = document.getElementById('game-screen');
        this.canvasWrap = document.getElementById('canvas-wrap');
    }

    addNewUser() {
        var submitUsername = document.getElementById('submit-username');
        submitUsername.addEventListener('click', () => {
            var username = document.getElementById('input-username').value;
            clientComManager.sendUsernameToServer(username);
        });
    }

    displayUserList(authenticationData, username) {
        if (authenticationData.validUser) {
            this.login.parentElement.removeChild(this.login);
            this.removeElementsByClass('player-name');

            for (var i = 0; i < authenticationData.userList.length - 1; ++i) {
                this.updateUserList(authenticationData.userList[i]);
            }
        } else {
            alert('Username already taken, please choose another one');
        }
    }

    removeElementsByClass(className) {
        var elements = document.getElementsByClassName(className);
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    }

    updateUserList(user) {
        var newP = document.createElement('p');
        newP.className = 'player-name';
        newP.id = user.socketId;
        newP.innerHTML = user.username;
        newP.addEventListener('click', () => {
            clientComManager.chooseOpponent(newP.id);
        });
        this.loby.appendChild(newP);
    }

    removePlayer(playerId) {
        var availPlayers = document.getElementsByClassName('player-name');
        for (var i = 0; i < availPlayers.length; ++i) {
            if (availPlayers[i].id == playerId) {
                document.getElementById(availPlayers[i].id).remove();
            }
        }
    }

    gameEnded(message) {
        var announcement = document.createElement('p');
        announcement.id = 'announce-winner';
        announcement.innerHTML = message;
        this.canvasWrap.parentElement.removeChild(this.canvasWrap);
        this.gameScreen.appendChild(announcement);
    }

    someoneDisconected(userId) {
        var availPlayers = document.getElementsByClassName('player-name');
        for (var i = 0; i < availPlayers.length; ++i) {
            if (availPlayers[i].id == userId) {
                document.getElementById(availPlayers[i].id).remove();
            }
        }
    }
}

var clientUsers = new ClientUsers();

window.onload = function() {
    clientComManager.startComunication();
    clientUsers.addNewUser();
};