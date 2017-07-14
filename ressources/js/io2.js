var socket2 = io.connect('https://bmanserver.herokuapp.com/', { 'force new connection': true });
//var socket2 = io.connect('http://localhost:3000/', { 'force new connection': true });

console.log('check 1', socket2);
//	setup event listeners



socket2.on('welcome', function (id, playerInfo) {
    console.log("testwelcome")
    gameId = window.location.hash = id;

    
    player2 = Player.create(contextPlayerOne, playerInfo);
    player2.render(0, 0);

    addPlayer(player2);

    hideLoading();

    log('Waiting for players..');

    log('Click your name when you\'re ready', true);
    //joinGame($('input[name=user-nameAD]').val(), gameId);
});

socket2.on('joined', function (playerInfo, game) {
    gameId = window.location.hash = game.id;

    init(game.matrix);

    clearPlayers();

    game.players.forEach(function (player_) {
        var otherPlayer,
            map = playerMap[player_.index];

        if (socket2.io.engine.id == player_.id) {
            otherPlayer = player = Player.create(map.context, player_);

            otherPlayer.render(map.x, map.y);
        }
        else {
            otherPlayer = Player.create(map.context, player_);

            otherPlayer.render(player_.position.x, player_.position.y);
        }

        addPlayer(otherPlayer);

    });

    hideLoading();

    log('Waiting for players..');

    log('Click your name when you\'re ready', true);

});

socket2.on('game-started', function () {
    clearPlayers();

    hideStatus();

    hideLoading();

    showMenu();

    log('Game has already started', true, true);

});

socket2.on('game-not-found', function () {
    clearPlayers();

    hideStatus();

    hideLoading();

    showMenu();

    log('Game not found', true, true);

});

socket2.on('ready', function (player, isReady) {
    readyPlayer(player, isReady);

});

socket2.on('start', function (matrix) {
    startCountdown();

    frozen = true;

    init(matrix);

    players.forEach(function (player2) {
        var map = playerMap[player2.index];

        player2.render(map.x, map.y, true);

    });

    setTimeout(function () {
        gameOn = true;

        frozen = false;

    }, startTimer);


});

socket2.on('stop', function () {
    gameOn = false;

});



socket2.on('move', function (id, position) {
    players.forEach(function (player2) {
        if (player2.id == id) {
            player2.render(position.x, position.y, true);
        }

    });


});
socket2.on('action', function () {
    console.log("io2:" + player2.name);
    console.log(codeBot2);
    player2.move("right");

  /*ATTENTION LORSQUE LE PLAYER 2 POSE UNE BOMB DES LE DEBUT CRASH SI POSITION NON INITIALISER A VOIR */
    //var codeExec = codeBot2.replace(/player/g, "player2");
    var tile=getTile(player2.position.x,player2.position.y);
    if(tile.hasBonus==true){
      player2.maxBombs=2;
      player2.tourBonus=3;
      tile.hasBonus=null;
      tile.render();
    }else if(player2.hasBonus==true){
      player2.tourBonus--;
      if(player2.tourBonus==0){
        player2.hasBonus=false;
      }
    }
     try {
        codeBot2["exec"].exec();
    } catch (err) {
        console.log(err);
    }


    //var codeExec = codeBot2.replace(/player/g , "player2");
    //eval(codeExec);


    //player2.move("down");

    /*if(gameOn != false && frozen != true){
      setTimeout(function(){
        socket2.emit("action",player2.name);
      }, 1500);

    }*/

})
socket2.on('bomb', function (position) {
    var bomb = new Bomb(position.x, position.y);

    bomb.render();

});

socket2.on('death', function (id) {
    players.forEach(function (player2) {
        if (player2.id == id) {
            player2.isAlive = false;

            player2.render();
            //    log(player2.name + ' is dead!', true, true);
        }


    });

});

socket2.on('player-joined', function (player2) {
    console.log("player2-joined")
    console.log(player2)
    var map = playerMap[player2.index],
        newPlayer = Player.create(map.context, player2);

    newPlayer.render(map.x, map.y, true);

    addPlayer(newPlayer);

});

socket2.on('left', function (id) {
    removePlayer(id);

});
