# Battleship game
## Synopsis
   The game server allows users to connect and choose an opponent to play Battleship with.
   Key features:
   * Connected users management
   * Connecting to players in a game
   * Game management: Boards, turns and winnings
   * Disconnection management

## API reference
#### srvComManneger
##### Sending and receiving data to and from the clients
```
serverCom variable handles basic interactions between the user and the server:
'connection-established', 'client-send-username', 'client-chose-opponent', 'try-hit', 'disconnect'
Helping functions: authenticateUser(socket, io, username), connectToChosenOpponent(socket, io, opponentId),
sendHitResult(socket, io, hitResult), announceWinner(io, winner, loser),
disconnectOpponent(io, opponentId), announceYourDisconnection(socket, io)
```

#### srvComStart
##### Handling the first connection request clients make when the browser loads

#### srvGame
##### Server side game management
```
SrvGame class constructor (board1, board2, p1SocketId, p2SocketId)
Class Methods: tryHit (spot, socketId), changeTurn(), checkWin()
```

#### srvGameLogic
##### Creating a randomized spared of ships according to game rules

#### srvUsers
##### Users management on the server side and holds a list of users and games
```
Class methods: validateUserName(user),  getCurrentGame(socketId), markPlayerAsInGame(userId),
getUsernameById(userId), removePlayerById(userId), removeGameByPlayerId(userId)
```

#### clntComManeger
##### Client side communication with the server
```
Constructor connects to port 3000 and initiate ons:
'username-response', 'new-user-logged', 'game-init', 'p2-hit-result', 'p1-hit-result', 'opponent-name'
'player-no-longer-available', 'you-win', 'you-lose', 'opponent-disconnected', 'announce-disconnection'
Class methods: startComunication(), sendUsernameToServer(username), chooseOpponent(opponentId), tryHit(i, j)
```

#### clntDrawer
##### Declaring the canvas and activate object methods that need the canvas in order to be executed
```
Drawer class constructor: canvas, canvas.width, canvas.height, boardWidth, cellSide
Class methods: drawBoard(gameBoard), drawMyHit(gameBoard, i, j), drawMyMiss(gameBoard, i, j),
drawHitOpp(gameBoard, i, j), drawMissOpp(gameBoard, i, j), onCanvasCick(),
showTurn(gameBoard, message), showOpponentName(gameBoard, opponentName)
```

#### clntGame
##### Client side game management
```
Class ClientGame constructor: drawer, gameBoard, enemyGameBoard
Class methods: tryHit(i, j), initiateBoard(board2d, yourTurn), drawMyHit(i, j), drawMyMiss(i, j),
drawMissOpp(i, j), drawHitOpp(i, j), showTurn(message), showOpponentName(opponentName), createEnemyBoard2d()
```

#### clntObjCreator
##### Declaring the basic game classes: Board and Cell
```
Class Board constructor: (board, canvasWidth, offsetX, offsetY, cellSide, boardWidth)
Board method: createBoard(gameBoard)
Class Cell constructor: (x, y, cellSide, offsetX, offsetY, sub, tryHit = false)
Cell methods: draw(ctx), drawHit(ctx), drawHitOpp(ctx), showTurn(ctx, message), showOpponentName(ctx, opponentName)
The Cell can draw itself empty (square), with a ship (O), with an hit ship (X), with a miss (o)
As well as print opponent name and who's turn it is
```

#### clntUsers
##### Client side user management
```
Class ClientUsers constructor: login (DOM element), loby (DOM element), gameScreen (DOM element), canvasWrap (DOM element)
Class methods: addNewUser(), displayUserList(authenticationData, username),
removeElementsByClass(className), updateUserList(user), removePlayer(playerId),
gameEnded(message), someoneDisconected(userId)
When client window loads: clientComManager.startComunication() and clientUsers.addNewUser()
```

### License

   MIT
