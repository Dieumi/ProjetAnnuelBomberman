
//	inits
/*var models=require("./models");
var playersummary=models.player;
var player=new playersummary();
var bombsummary=models.bomb;
var bomb=new bombsummary();*/

var idBot1 = "";
var idBot2 = "";

var urlApi = document.getElementById('urlApi').value;

var canvasTiles = document.getElementById('tiles'),
    contextTiles = canvasTiles.getContext('2d'),
    canvasBombs = document.getElementById('bombs'),
    contextBombs = canvasBombs.getContext('2d'),
    canvasPlayerOne = document.getElementById('player-one'),
    contextPlayerOne = canvasPlayerOne.getContext('2d'),
    canvasPlayerTwo = document.getElementById('player-two'),
    contextPlayerTwo = canvasPlayerTwo.getContext('2d'),
    canvasPlayerThree = document.getElementById('player-three'),
    contextPlayerThree = canvasPlayerTwo.getContext('2d'),
    canvasPlayerFour = document.getElementById('player-four'),
    contextPlayerFour = canvasPlayerTwo.getContext('2d');

var hasPlayed=null,
    hasPlayed2=null;
var matrix = {},
    matrixSize = 9,
    brickSize = 64;

var upperLimit = matrixSize - 1,
    upperLimitMinusOne = upperLimit - 1,
    empty = ['0 0', upperLimit + ' 0', '0 ' + upperLimit, upperLimit + ' ' + upperLimit, '1 0', upperLimitMinusOne + ' 0', '0 ' + upperLimitMinusOne, upperLimit + ' ' + upperLimitMinusOne, '0 1', upperLimit + ' 1', '1 ' + upperLimit, upperLimitMinusOne + ' ' + upperLimit];

var iconBomb = new Image(),

    patternBrick = new Image(),
    patternPillar = new Image(),
    patternFloor = new Image(),
    patternFire = new Image(),
    iconBonus=new Image(),
    iconBonus2=new Image(),
    playerBomberman = new Image(),
    playerAvatar = new Image(),
    playerRonflex = new Image(),
    playerFreezer = new Image(),
    playerBuu = new Image(),
    playerGoku = new Image(),
    playerLink = new Image(),
    playerPika = new Image()

var BOMB_TIMER = 3500,
    BOMB_CLEAR_TIMER = 400,
    GAME_TIMER = 300000;

var gameId,
    gameOn = false,
    frozen = false,
    startTimer = 3000,
    movementDelay = 100,
    movementTimer,
    controlsBound = false,
    player,
    player2,
    players = [],
    avatars = {
        bomberman: playerBomberman,
        avatar: playerAvatar,
        ronflex: playerRonflex,
        freezer: playerFreezer,
        buu: playerBuu,
        goku: playerGoku,
        link: playerLink,
        pika: playerPika,
    },
    playerMap = [
        {
            context: contextPlayerOne,
            x: 0,
            y: 0,
        },
        {
            context: contextPlayerTwo,
            x: upperLimit,
            y: upperLimit,
        },
        {
            context: contextPlayerThree,
            x: 0,
            y: upperLimit,
        },
        {
            context: contextPlayerFour,
            x: upperLimit,
            y: 0,
        }
    ];

$(document).ready(function () {
    showLoading();

    iconBomb.src = '/images/bomb.png';

    patternBrick.src = '/images/brick.png';
    patternPillar.src = '/images/pillar.png';
    patternFloor.src = '/images/floor.png';
    patternFire.src = '/images/fire.png';

    iconBonus.src='/images/bonus1.png';
    iconBonus2.src='/images/bonus2.png';
 

    playerBomberman.src = '/images/avatarGame/bomberman.png';
    playerBomberman.alt = 'bomberman';

    playerAvatar.src = '/images/avatarGame/avatar.png';
    playerAvatar.alt = 'avatar';

    playerRonflex.src = '/images/avatarGame/ronflex.png';
    playerRonflex.alt = 'ronflex';

    playerFreezer.src = '/images/avatarGame/freezer.png';
    playerFreezer.alt = 'freezer';

    playerGoku.src = '/images/avatarGame/goku.png';
    playerGoku.alt = 'goku';

    playerBuu.src = '/images/avatarGame/buu.png';
    playerBuu.alt = 'buu';

    playerLink.src = '/images/avatarGame/link.png';
    playerLink.alt = 'link';

    playerPika.src = '/images/avatarGame/pika.png';
    playerPika.alt = 'pika';

});

$(window).load(function () {
    hideLoading();

    showMenu();

    if (window.location.hash.length == 10) {
        $('input[name=game-id]').val(window.location.hash.substr(1));
    }
    attachEventListeners();
});

//	functions

function attachEventListeners() {

    idBot1 = document.getElementById('idBot1').value;

    idBot2 = document.getElementById('idBot2').value;

    /*codeBot1 = document.getElementById('codeBot1').value;
    codeBot2 = document.getElementById('codeBot2').value;*/


    var element = $(this);

    var fieldUserName = $('input[name=user-name]'),
        fieldGameId = $('input[name=game-id]');

    var userName = fieldUserName.val(),
        gameId = fieldGameId.val();


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
    })


    $.ajax({
        type: "GET",
        url: urlApi + "/bot",
        data: { "idBot": idBot2 },
        dataType: 'json',
        async: false,
        success: function (data) {
            bot2 = data
            console.log(bot2);
        }
    })*/

    /*		if (userName && gameId)
			{
				if (gameId.length !== 9) return growl('Enter a game ID from your friend', true), fieldGameId.focus();

				joinGame(userName, gameId);
			}
			else if (userName)
			{*/

    newGame(userName);

    //joinGame($('input[name=user-nameAD]').val(), gameId);
    /*}
    else
    {
        return growl('Enter your name', true), fieldUserName.focus()
    }
*/


    $('.show-about').on('click', function (e) {
        e.preventDefault();

        status() ? hideStatus() : showStatus();

    });
}

function bindControls() {
    if (controlsBound) return;

    $(document).on('keydown', function (e) {
        if (!player || frozen) return;




        /*
                    if (e.which == 32)
                    {
                        player.plantBomb();
                    }
                    else if (e.which == 38)
                    {
                        player.move('up');

                        frozen = true;
                    }
                    else if (e.which == 40)
                    {
                        player.move('down');

                        frozen = true;
                    }
                    else if (e.which == 37)
                    {
                        player.move('left');

                        frozen = true;
                    }
                    else if (e.which == 39)
                    {
                        player.move('right');

                        frozen = true;
                    }*/

        movementTimer = setTimeout(function () {
            frozen = false;

        }, movementDelay);

    });

    controlsBound = true;
}

function init(matrix_, clear) {
    if (matrix_) {
        for (var x = 0; x < matrixSize; x++) {
            matrix[x] = {};

            for (var y = 0; y < matrixSize; y++) {
                var tile = new Tile(matrix_[x][y].type);

                tile.render(x, y);

                setTile(tile, x, y);
            }
        }
    }
    else {
        for (var x = 0; x < matrixSize; x++) {
            matrix[x] = {};

            for (var y = 0; y < matrixSize; y++) {
                matrix[x][y] = drawTile(x, y);
            }
        }
    }

    if (clear === true) {
        clearLog();

        clearPlayers();
    }

    $('.game').addClass('play');

    bindControls();
}

function drawTile(x, y) {
    if (x % 2 == 1 && y % 2 == 1) {
        type = 'pillar';
    }
    else {
        type = Math.floor(Math.random() * 10) > 1 ? 'normal' : 'empty';
    }

    if (empty.indexOf(x + ' ' + y) > -1) {
        type = 'empty';
    }

    var tile = new Tile(type);

    tile.render(x, y);

    return tile;
}
/*
function drawTile(x, y) {
    if (x % 2 == 1 && y % 2 == 1) {
        type = 'pillar';

    }
    else {
        type = Math.floor(Math.random() * 10) > 1 ? 'normal' : 'empty';

    }

    if (empty.indexOf(x + ' ' + y) > -1) {
        type = 'empty';
    }

    var tile = new Tile(type);

    tile.render(x, y);

    return tile;
}*/

function getTile(x, y) {
    return matrix[x] && matrix[x][y];
}

function setTile(tile, x, y) {
    if (matrix[x]) {
        matrix[x][y] = tile;
    }
}

function updateTile(x, y, key, value) {
    if (matrix[x] && matrix[x][y]) {
        matrix[x][y][key] = value;
    }
}
function addBonus(x,y,name){
  //console.log("bonus : "+x+y);
  var tile=getTile(x,y);
  if(tile.type=='empty'){
    tile.hasBonus=new Bonus(name);
    tile.render(x,y);
  }
}
//	classes
function Bonus(name){
  this.name=name;
}
function Tile(type) {
    this.position = {};

    this.type = type || 'empty';

    //	can show explosions on empty tiles or bricks
    this.canExplode = this.type == 'pillar' ? false : true;

    //	can only move on empty tiles
    this.canMove = this.type == 'empty' ? true : false;

    this.hasBomb = false;

    this.hasBonus = null;

    this.setType = function (type) {
        this.type = type || 'empty';

        this.canExplode = this.type == 'pillar' ? false : true;

        this.canMove = this.type == 'empty' ? true : false;
    }

    this.render = function (x, y) {
        this.position.x = x;
        this.position.y = y;

        switch (this.type) {
            case 'pillar':

                contextTiles.drawImage(patternPillar, x * brickSize, y * brickSize, brickSize, brickSize);

                break;

            case 'normal':

                contextTiles.drawImage(patternBrick, x * brickSize, y * brickSize, brickSize, brickSize);

                break;

            case 'bomb':

                contextTiles.drawImage(iconBomb, x * brickSize, y * brickSize, brickSize, brickSize);

                break;

            case 'empty':
            default:
                if(this.hasBonus!=null){
                  if(this.hasBonus.name=="powerUp"){
                      contextTiles.drawImage(iconBonus2, x * brickSize, y * brickSize, brickSize, brickSize);
                  }else if(this.hasBonus.name=="moreBomb"){
                      contextTiles.drawImage(iconBonus, x * brickSize, y * brickSize, brickSize, brickSize);
                  }

                }else{
                    contextTiles.drawImage(patternFloor, x * brickSize, y * brickSize, brickSize, brickSize);
                }


                break;
        }

        //	matrix numbers
        // contextTiles.fillStyle = 'rgb(100, 100, 100)';
        // contextTiles.fillText(x + ',' + y, x * brickSize + 27, y * brickSize + 40);
    }
} function Player(context, name, avatar) {
    this.context = context;

    this.name = name || 'bomberman';
    this.avatar = avatar || playerBomberman;

    this.isAlive = true;

    this.position = {};

    this.hasBonus = null;

    this.tourBonus = 0;

    this.maxBombs = 1;

    this.bombs = 0;

    this.tabBomb = [];

    this.move = function (direction) {
        // can't move if dead, son
        if (!this.isAlive) return;
        if(this==player && hasPlayed==false ){
          hasPlayed=true;
          if (!this.canGo(direction, this.position)) return;

          switch (direction) {
              case 'up':

                  this.render(this.position.x, this.position.y - 1);

                  break;

              case 'down':

                  this.render(this.position.x, this.position.y + 1);

                  break;

              case 'left':

                  this.render(this.position.x - 1, this.position.y);

                  break;

              case 'right':

                  this.render(this.position.x + 1, this.position.y);

                  break;
          }
        }else if(this==player2 && hasPlayed2==false){
          hasPlayed2=true;
          if (!this.canGo(direction, this.position)) return;

          switch (direction) {
              case 'up':

                  this.render(this.position.x, this.position.y - 1);

                  break;

              case 'down':

                  this.render(this.position.x, this.position.y + 1);

                  break;

              case 'left':

                  this.render(this.position.x - 1, this.position.y);

                  break;

              case 'right':

                  this.render(this.position.x + 1, this.position.y);

                  break;
          }
        }


        //	check if we can move in that direction


    }

    this.moveTowardCell = function(x, y){

    }

    this.isObstacle = function (x, y) {
        if (getTile(x, y).type == "pillar"){
            return true;
        }
        else {
            return false
        }
    }

    this.isWall = function (x, y) {
        if (getTile(x, y).type == "normal") {
            return true;
        }
        else {
            return false
        }
    }

    this.isEmpty = function (x, y) {
        if (getTile(x, y).type == "empty") {
            return true;
        }else {
            return false
        }
    }

    this.isDangerous = function (x, y) {
        var i = 0;
        for (i = 0; i < this.tabBomb.length; i++) {

            if (x - this.tabBomb[i].position.x < 2 && x - this.tabBomb[i].position.x > -2 && this.tabBomb[i].position.y == y) {
                return true;
            }
            if (y - this.tabBomb[i].position.y < 2 && y - this.tabBomb[i].position.y > -2 && this.tabBomb[i].position.x == x) {
                return true;
            }
        }
        if (this == player) {
            for (i = 0; i < player2.tabBomb.length; i++) {
                if (x - player2.tabBomb[i].position.x < 2 && x - player2.tabBomb[i].position.x > -2 && player2.tabBomb[i].position.y == y) {
                    return true;
                }
                if (y - player2.tabBomb[i].position.y < 2 && y - player2.tabBomb[i].position.y > -2 && player2.tabBomb[i].position.x == x) {
                    return true;
                }
            }
        } else {
            for (i = 0; i < player.tabBomb.length; i++) {
                console.log("taille : " + this.tabBomb.length);
                if (x - player.tabBomb[i].position.x < 2 && x - player.tabBomb[i].position.x > -2 && player.tabBomb[i].position.y == y) {
                    return true;
                }
                if (y - player.tabBomb[i].position.y < 2 && y - player.tabBomb[i].position.y > -2 && player.tabBomb[i].position.x == x) {
                    return true;
                }
            }
        }

        return false;
    }

    this.isBomber = function (x,y){
      if(this==player){
        if(x==player2.position.x && y==player2.position.y){
          return true;
        }else{
          return false;
        }
      }else{
        if(x==player.position.x && y==player.position.y){
          return true;
        }else{
          return false;
        }
      }
    }

    this.isOnSameLine= function (){
        if (this == player) {
            if (player2.position.y == this.position.y || player2.position.x == this.position.x) {
          return true
        }else{
          return false
        }
      }else{
         if (player.position.y == this.position.y || player.position.x == this.position.x){
          return true
        }else{
          return false
        }
      }
    }

    this.isBomb = function (x, y) {
        return getTile(x, y).hasBomb
    }

    this.getBombsEnemy = function () {
        if (this == player) {
            return player2.tabBomb;
        } else {
            return player.tabBomb;
        }
    }

    this.getNearestEnemy = function (){
      if(this==player){
        return player2.position;
      }else{
        return player.position;
      }
    }

    this.isBomber = function(x, y){
        if (player != this) {
            if (player.position.y == y && player.position.x == x) {
                return true;
            }
            else {
                return false;
            }
        } else {
            if (player2.position.y == y && player2.position.x == x) {
                return true;
            }
            else {
                return false;
            }
        }
    }

    this.canGo = function (direction, position) {
        var x = position.x,
            y = position.y;

        switch (direction) {
            case 'up':

                y = position.y - 1;

                break;

            case 'down':

                y = position.y + 1;

                break;

            case 'left':

                x = position.x - 1;

                break;

            case 'right':

                x = position.x + 1;

                break;
        }

        var tile = getTile(x, y);

        return tile && tile.canMove && !tile.hasBomb;
    }

    this.clearBomb = function () {
        this.bombs--;
        this.tabBomb.splice(0, 1)
    }

    this.plantBomb = function () {


        Bomb.strength=1;
        // dead people don't plant bombs
        if (!this.isAlive) return;

        //	make sure we're not exceeding the max bomb limit
        if (this.bombs >= this.maxBombs) return;

        //	check if bomb is planted on the same spot
        if (getTile(this.position.x, this.position.y).hasBomb) return;

        //	else plant bomb
        if (socket && this == player && hasPlayed==false)  {
        hasPlayed=true;
        var bomb = new Bomb(this.position.x, this.position.y);

        this.bombs++;
        this.tabBomb.push(bomb);
        setTimeout(this.clearBomb.bind(this), BOMB_TIMER);

        //	fake bomb planting while the server responds
        Bomb.plant(this.position.x, this.position.y);

        //	notify the server

          console.log("player 1 pose sa bomb");
          console.log(this);
          if(this.hasBonus!=null && this.hasBonus.name=="powerUp"){
            bomb.powerUp();
            socket.emit('bomb', gameId, this.position,2);
          }else{
            bomb.strength=1;
              socket.emit('bomb', gameId, this.position,1);
          }

        }
        if (socket2 && this == player2 && hasPlayed2==false) {
            hasPlayed2=true;
            var bomb = new Bomb(this.position.x, this.position.y);

            this.bombs++;
            this.tabBomb.push(bomb);
            setTimeout(this.clearBomb.bind(this), BOMB_TIMER);

            //	fake bomb planting while the server responds
            Bomb.plant(this.position.x, this.position.y);
            console.log("player 2 pose sa bomb");
            console.log(this);
            if(this.hasBonus!=null &&  this.hasBonus.name=="powerUp"){
            bomb.powerUp();
            socket2.emit('bomb', gameId, this.position,2);
            }else{
              bomb.strength=1;
              socket2.emit('bomb', gameId, this.position,1);
            }

        }
        this.bomb = bomb;
    }

    this.render = function (x, y, dontNotify) {
        this.context.clearRect(this.position.x * brickSize, this.position.y * brickSize, brickSize, brickSize);

        //	don't render if player is dead
        if (!this.isAlive) return;

        //	draw player
        this.context.drawImage(this.avatar, x * brickSize, y * brickSize, brickSize, brickSize);

        //	update position
        this.position.x = x;
        this.position.y = y;

        //	let the server know player has moved
        if (socket && this == player && !dontNotify  ) {
            socket.emit('move', gameId, player.id, this.position);


        } else if (socket2 && this == player2 && !dontNotify ) {
            socket2.emit('move', gameId, player2.id, this.position);

        }
    }

    this.remove = function () {
        this.context.clearRect(0, 0, brickSize * matrixSize, brickSize * matrixSize);
    }
}

Player.create = function (context, data) {

    var player = new Player(context, data.name, avatars[data.avatar]);

    player.id = data.id;
    player.index = data.index;
    player.ready = false;
    player.idBot=data.idBot;

    return player;
}

function Bomb(x, y, strength) {
    this.position = { x: x, y: y };

    this.isAlive = true;
    this.strength = strength || 1;

    this.blown = [];

    this.powerUp = function () {
        this.strength++;
    }

    this.cleanUp = function () {
        this.blown.forEach(function (spot) {
            //	clear up explosion
            contextBombs.clearRect(spot.x * brickSize, spot.y * brickSize, brickSize, brickSize);

            var tile = getTile(spot.x, spot.y);

            //	update the tile
            updateTile(spot.x, spot.y, 'type', 'empty');
            updateTile(spot.x, spot.y, 'canMove', true);

            tile.render(tile.position.x, tile.position.y);

        });
    }

    this.detonate = function () {
        clearTimeout(this.explosionTimer);

        //	make it a dud
        this.isAlive = false;

        contextBombs.fillStyle = 'rgb(231, 76, 60)';

        //	clear the bomb flag from the tile
        updateTile(this.position.x, this.position.y, 'hasBomb', false);

        //	detonate the bomb
        //	and blow any adjacent tiles
        var blown = [
            {
                x: this.position.x,
                y: this.position.y
            },
            {
                x: this.position.x,
                y: this.position.y - this.strength
            },
            {
                x: this.position.x,
                y: this.position.y + this.strength
            },
            {
                x: this.position.x - this.strength,
                y: this.position.y
            },
            {
                x: this.position.x + this.strength,
                y: this.position.y
            }
        ];

        blown.forEach(function (spot) {
            if (this.canExplode(spot.x, spot.y)) {
                this.blown.push(
                    {
                        x: spot.x,
                        y: spot.y

                    });

                updateTile(spot.x, spot.y, 'canMove', false);

                contextBombs.drawImage(patternFire, spot.x * brickSize, spot.y * brickSize, brickSize, brickSize);
            }

        }, this);

        //	clear up the explosion
        setTimeout(this.cleanUp.bind(this), BOMB_CLEAR_TIMER);
    }

    this.canExplode = function (x, y) {
        var tile = getTile(x, y);

        //	check if tile can explode
        return tile && tile.canExplode;
    }

    this.render = function () {
        if (this.isAlive) {
            //	clear the cell before drawing bomb
            contextBombs.clearRect(this.position.x * brickSize, this.position.y * brickSize, brickSize, brickSize);

            //	draw bomb
            contextBombs.drawImage(iconBomb, this.position.x * brickSize, this.position.y * brickSize, brickSize, brickSize);

            //	update the tile with the `hasBomb` flag
            updateTile(this.position.x, this.position.y, 'hasBomb', true);

            if (this.explosionTimer) return;

            //	detonate the bomb
            this.explosionTimer = setTimeout(this.detonate.bind(this), BOMB_TIMER);
        }
    }
}

//	fake bomb plant on client-side
Bomb.plant = function (x, y) {
    //	clear the cell before drawing bomb
    contextBombs.clearRect(x * brickSize, y * brickSize, brickSize, brickSize);

    //	draw bomb
    contextBombs.drawImage(iconBomb, x * brickSize, y * brickSize, brickSize, brickSize);
}
