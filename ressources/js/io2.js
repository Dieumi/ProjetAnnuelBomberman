var socket2 = io.connect('https://bmanserver.herokuapp.com/', { 'force new connection': true });
//var socket2 = io.connect('http://localhost:3000/', { 'force new connection': true });

console.log('check 1', socket2);
//	setup event listeners



socket2.on('welcome', function (id, playerInfo) {
    console.log("testwelcome");
    gameId = window.location.hash = id;


    player2 = Player.create(contextPlayerOne, playerInfo);
    player2.render(0, 0);

    addPlayer(player2);

    hideLoading();

    log('En attente..');

    log('Clicker sur votre nom quand vous êtes prêt', true);
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

    log('En attente..');

    log('Clicker sur votre nom quand vous êtes prêt', true);

});

socket2.on('game-started', function () {
    clearPlayers();

    hideStatus();

    hideLoading();

    showMenu();

    log('La partie à déja commencer', true, true);

});

socket2.on('game-not-found', function () {
    clearPlayers();

    hideStatus();

    hideLoading();

    showMenu();

    log('Partie introuvable', true, true);

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

socket2.on('win', function (player) {
    gameOn = false;
    frozen = true;

      endGame(idBot1);
      console.log(player);
      if(player!=null){
        //  log(player.name + ' : VICTOIRE!', true);
        if(document.getElementById('typeGame').value!="test"){
          if(player.idBot==document.getElementById('idBot1').value){
            $("#winner").val(idBot1);
            $("#looser").val(idBot2);
            $("#null").val(false);
            $("#win").submit();
            }else {
            $("#winner").val(idBot2);
            $("#looser").val(idBot1);
            $("#null").val(false);
            $("#win").submit();
          }
        }
      }else{
      //  log('match nul', true);
        $("#winner").val(idBot1);
        $("#looser").val(idBot2);
        $("#null").val(true);
        $("#win").submit();
      }





});

socket2.on('move', function (id, position) {
    players.forEach(function (player2) {
        if (player2.id == id) {
            player2.render(position.x, position.y, true);

        }

    });


});
socket2.on('action', function () {
    hasPlayed2 = false;
    console.log(player2);
    var tile=getTile(player2.position.x,player2.position.y);
    if(tile.hasBonus!=null){
        player2.hasBonus=tile.hasBonus;
        player2.tourBonus=3;
      if(tile.hasBonus.name=="moreBomb"){
        player2.maxBombs=2;
        tile.hasBonus=null;
        tile.render(player2.position.x,player2.position.y);
      }else if(tile.hasBonus.name=="powerUp"){
          player2.maxBombs=1;
          tile.hasBonus=null;
          tile.render(player2.position.x,player2.position.y);
      }
      player2.tourBonus--;
      if(player2.tourBonus==0){
        player2.hasBonus=null;
      }
    }
    try {
        codeBot2.exec.exec();
    } catch (err) {
        console.log(err);
    }
        socket2.emit("action",player2.id, player2.name);
});
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
    console.log("player2-joined");
    console.log(player2);
    var map = playerMap[player2.index],
        newPlayer = Player.create(map.context, player2);

    newPlayer.render(map.x, map.y, true);

    addPlayer(newPlayer);

});

socket2.on('left', function (id) {
    removePlayer(id);

});
