
//	connect

//var socket = io.connect('https://bman.herokuapp.com:443/');
var codeBot = "";
var bot1;
var socket = io.connect('https://bmanserver.herokuapp.com/');
//var socket = io.connect('http://localhost:3000/');
console.log('check 1', socket.connected);

//	setup event listeners


socket.on('welcome', function (id, playerInfo) {
    console.log("welcome")
    gameId = window.location.hash = id;

    player = Player.create(contextPlayerOne, playerInfo);
    console.log(player2)

    player.render(0, 0);
    console.log(player)
    addPlayer(player);

    hideLoading();

    log('Waiting for players..');

    log('Click your name when you\'re ready', true);
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

    log('Waiting for players..');

    log('Click your name when you\'re ready', true);

});

socket.on('game-started', function () {

    clearPlayers();

    hideStatus();

    hideLoading();

    showMenu();

    log('Game has already started', true, true);

});

socket.on('game-not-found', function () {
    clearPlayers();

    hideStatus();

    hideLoading();

    showMenu();

    log('Game not found', true, true);

});

socket.on('ready', function (player, isReady) {
    readyPlayer(player, isReady);

});

socket.on('start', function (matrix) {
    console.log("start")
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
        socket.emit("action", player.name);

    }, startTimer);


});

socket.on('stop', function () {
    gameOn = false;

});

socket.on('win', function (player) {
    gameOn = false;
    frozen = true;

    log(player.name + ' has won!', true);

    endGame(player.name);

});

socket.on('move', function (id, position) {
    players.forEach(function (player) {
        if (player.id == id) {
            player.render(position.x, position.y, true);
        }

    });


});
socket.on('action', function () {

    eval(codeBot);

    console.log("io:" + player.name)
    if (gameOn != false && frozen != true) {
        setTimeout(function () {
            socket.emit("action", player.name);
        }, 1500);

    }

})
socket.on('bomb', function (position) {
    var bomb = new Bomb(position.x, position.y);

    bomb.render();

});

socket.on('death', function (id) {
    console.log("test death")
    players.forEach(function (player) {
        if (player.id == id) {
            player.isAlive = false;

            player.render();

            log(player.name + ' is dead!', true, true);
        }

    });

});

socket.on('player-joined', function (player) {

   
   

    console.log("player-joined")
    console.log(player)
    var map = playerMap[player.index],
        newPlayer = Player.create(map.context, player);

    newPlayer.render(map.x, map.y, true);

    addPlayer(newPlayer);

});

socket.on('left', function (id) {
    removePlayer(id);

});

//	game methods

function newGame(name) {
    var fieldBotId = $('option[name=user-id]');
    var idBot = fieldBotId.val();
   
    $.ajax({
        type: "GET",
        url: urlApi + "/bot",
        data: { "idBot": idBot },
        dataType: 'json',
        async: false,
        success: function (data) {
            codeBot = data.codeBot;
            bot1 = data
            
        }
    })
    var bornSup = bot1.pointBot + 20;
    var bornInf = bot1.pointBot - 20;
    var tour = 1;
    /* player 2 */
    while (bot2 == null && tour<100) {
        bornSup = bot1.pointBot + (20 * tour);
        bornInf = bot1.pointBot + (-20 * tour);
        $.ajax({
            type: "GET",
            url: urlApi + "/bot/matchmaking",
            data: { "bornSup": bornSup, "bornInf": bornInf },
            dataType: 'json',
            async: false,
            success: function (data) {
                console.log(data)
                if (data.code == 0) {
                    codeBot2 = data.codeBot;
                    bot2 = data
                    console.log(data);
                }  
            }
        })
        tour++;
    }
   

    hideMenu();

    showLoading();

    showStatus();

    log('Creating game..');

    var chars = Object.keys(avatars);

    var random = chars[Math.floor(Math.random() * chars.length)],
        avatar = avatars[random];

    init(null, true);

    log('Connecting to server..');

    socket.emit('create', createGameId(), name, avatar.alt, matrix);
}

function joinGame(name, id) {
    hideMenu();

    showLoading();

    showStatus();

    clearLog();

    log('Joining game..');

    log('Connecting to server..');
    console.log("join")
    socket2.emit('join', id, name);

}

function endGame(winner) {
    var loading = $('.loading');

    loading.text(winner + ' has won!');

    showLoading();
}