
//	connect

//var socket = io.connect('https://bman.herokuapp.com:443/');

var socket = io.connect('https://bmanserver.herokuapp.com/');
//var socket = io.connect('http://localhost:3000/');
console.log('check 1', socket);
//	setup event listeners


socket.on('welcome', function (id, playerInfo) {
    console.log("welcome");
    gameId = window.location.hash = id;

    playerInfo.avatar = document.getElementById("avatarBot1").value;

    player = Player.create(contextPlayerOne, playerInfo);
    player.render(0, 0);

    addPlayer(player);

    hideLoading();

    log('En attente..');

    log('Click sur votre nom quand vous êtes prêt', true);
    joinGame($('input[name=user-nameAD]').val(), gameId);
});

socket.on('joined', function (playerInfo, game) {

    gameId = window.location.hash = game.id;

    init(game.matrix);

    clearPlayers();

    game.players.forEach(function (player_) {
        var otherPlayer,
            map = playerMap[player_.index];

        if (socket.io.engine.id == player_.id) {
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



});

socket.on('game-started', function () {

    clearPlayers();

    hideStatus();

    hideLoading();

    showMenu();

    log('La partie à déja commencer ', true, true);

});

socket.on('game-not-found', function () {
    clearPlayers();

    hideStatus();

    hideLoading();

    showMenu();

    log('partie introuvable', true, true);

});

socket.on('ready', function (player, isReady) {
    readyPlayer(player, isReady);

});

socket.on('start', function (matrix) {
    console.log("start");

    startCountdown();

    frozen = true;

    init(matrix);

    players.forEach(function (player) {
        console.log(player);

        var map = playerMap[player.index];
        console.log(map);
        player.render(map.x, map.y, true);

    });

    setTimeout(function () {
        gameOn = true;

        frozen = false;

        socket.emit("action",player.id, player.name);
        socket2.emit("action",player2.id, player2.name);

    }, startTimer);
    setTimeout(function () {
    log("Match nul !",true);
      setTimeout(function () {
        $("#winner").val(idBot1);
        $("#looser").val(idBot2);
        $("#null").val(true);
        $("#win").submit();

      }, 5000);
    }, GAME_TIMER);
});

socket.on('stop', function () {
    gameOn = false;

});

socket.on('win', function (player) {
    gameOn = false;
    frozen = true;
      log(player.name + ' : VICTOIRE!', true);
      endGame(idBot1);
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




});

socket.on('move', function (id, position) {
    players.forEach(function (player) {
        if (player.id == id) {
            player.render(position.x, position.y, true);

        }

    });


});
socket.on('action', function () {
    hasPlayed = false;
    console.log("test fonction");
    console.log(player);
    //player.move("left");
    var tile = getTile(player.position.x, player.position.y);
    console.log(tile);
    if (tile.hasBonus != null) {
        player.hasBonus = tile.hasBonus;
        player.tourBonus = 3;
        if (tile.hasBonus.name == "moreBomb") {
            player.maxBombs = 2;
            tile.hasBonus = null;
            tile.render(player.position.x, player.position.y);
        } else if (tile.hasBonus.name == "powerUp") {
            player.maxBombs = 1;
            tile.hasBonus = null;
            tile.render(player.position.x, player.position.y);
        }
        player.tourBonus--;
        if (player.tourBonus == 0) {
            player.hasBonus = null;
        }
    }
    try {
        codeBot1.exec.exec();
    } catch (err) {
        console.log(err);
    }


    if (gameOn != false && frozen != true) {
        socket.emit("action", player.name);

        setTimeout(function () {
            var rand = getRandomIntInclusive(1, 5);
            if (rand > 4) {
                addBonus(getRandomIntInclusive(0, 8), getRandomIntInclusive(0, 8), "powerUp");
                //addBonus(1,0,"powerUp");
            } else if (rand < 2) {
                addBonus(getRandomIntInclusive(0, 8), getRandomIntInclusive(0, 8), "moreBomb");
            }

        }, 2000);

    }

});
socket.on('bomb', function (position,strength) {
    var bomb = new Bomb(position.x, position.y,strength);

    bomb.render();

});

socket.on('death', function (id) {

    players.forEach(function (player) {
        if (player.id == id) {
            player.isAlive = false;

            player.render();

            log(player.name + ' est mort!', true, true);
        }

    });

});

socket.on('player-joined', function (player) {
    player.avatar = document.getElementById("avatarBot2").value;
    console.log("player-joined");
    console.log(player);
    var map = playerMap[player.index],
        newPlayer = Player.create(map.context, player);
        console.log(map.context);
    newPlayer.render(map.x,map.y, true);


    addPlayer(newPlayer);

});

//	game methods

function newGame(name) {

    hideMenu();

    showLoading();

    showStatus();

    log('Creating game..');

    var chars = Object.keys(avatars);

    var random = chars[Math.floor(Math.random() * chars.length)],
        avatar = avatars[random];

    init(null, true);

    log('Connexion au serveur..');
    if(document.getElementById('typeGame').value!="test"){
      var test=true;
    }else{
      var test=false;
    };
    socket.emit('create', createGameId(), name, avatar.alt, matrix,idBot1,test);
};

function joinGame(name, id) {
    hideMenu();

    showLoading();

    showStatus();

    clearLog();

    log('Partie rejoint');

    log('Connexion au serveur..');
    console.log("join");
    socket2.emit('join', id, name,idBot2);

}

function endGame(winner) {
    var loading = $('.loading');

    loading.text(winner + ' :VICTOIRE!');

    /*$.ajax({
        type: "GET",
        url: urlApi + "/bot",
        data: { "idBot": idBot1 },
        dataType: 'json',
        async: false,
        success: function (data) {
            bot1 = data
            console.log(bot1);
        }
    })*/
    showLoading();
}
