
	//	inits
/*var models=require("./models");
var playersummary=models.player;
var player=new playersummary();
var bombsummary=models.bomb;
var bomb=new bombsummary();*/
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

		playerBirdie = new Image(),
		playerElephant = new Image(),
		playerFishy = new Image(),
		playerMonkey = new Image(),
		playerRam = new Image(),
		playerOx = new Image(),
		playerPiggle = new Image(),
		playerWhale = new Image();

	var BOMB_TIMER = 2000,
		BOMB_CLEAR_TIMER = 400;

	var gameId,
		gameOn = false,
		frozen = false,
		startTimer = 3000,
		movementDelay = 100,
		movementTimer,
		controlsBound = false,
		player,
		players = [],
		avatars = {
			birdie: playerBirdie,
			elephant: playerElephant,
			fishy: playerFishy,
			monkey: playerMonkey,
			ram: playerRam,
			ox: playerOx,
			piggle: playerPiggle,
			whale: playerWhale,
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
				y: 0,
			},
			{
				context: contextPlayerThree,
				x: 0,
				y: upperLimit,
			},
			{
				context: contextPlayerFour,
				x: upperLimit,
				y: upperLimit,
			}
		];

	$(document).ready(function()
	{
		showLoading();

		iconBomb.src = 'images//bomb.png';

		patternBrick.src = 'images//brick.png';
		patternPillar.src = 'images//pillar.png';
		patternFloor.src = 'images//floor.png';
		patternFire.src = 'images//fire.png';

		playerBirdie.src = 'images//birdie.png';
		playerBirdie.alt = 'birdie';

		playerElephant.src = 'images//elephant.png';
		playerElephant.alt = 'elephant';

		playerFishy.src = 'images//fishy.png';
		playerFishy.alt = 'fishy';

		playerMonkey.src = 'images//monkey.png';
		playerMonkey.alt = 'monkey';

		playerRam.src = 'images//ram.png';
		playerRam.alt = 'ram';

		playerOx.src = 'images//ox.png';
		playerOx.alt = 'ox';

		playerPiggle.src = 'images//piggle.png';
		playerPiggle.alt = 'piggle';

		playerWhale.src = 'images//whale.png';
		playerWhale.alt = 'whale';

		attachEventListeners();

	});

	$(window).load(function()
	{
		hideLoading();

		showMenu();

		if (window.location.hash.length == 10)
		{
			$('input[name=game-id]').val(window.location.hash.substr(1));
		}

	});

	//	functions

	function attachEventListeners()
	{
		$('.menu').on('submit', function(e)
		{
			e.preventDefault();

			var element = $(this);

			var fieldUserName = $('input[name=user-name]'),
				fieldGameId = $('input[name=game-id]');

			var userName = fieldUserName.val(),
				gameId = fieldGameId.val();

			if (userName && gameId)
			{
				if (gameId.length !== 9) return growl('Enter a game ID from your friend', true), fieldGameId.focus();

				joinGame(userName, gameId);
			}
			else if (userName)
			{
				newGame(userName);
			}
			else
			{
				return growl('Enter your name', true), fieldUserName.focus()
			}

		});

		$(document).on('keyup', function(e)
		{
			if (e.which == 27)
			{
				if (menu())
				{
					hideMenu();
				}
				else
				{
					hideLoading();

					showMenu();
				}
			}

		});

		$('.show-about').on('click', function(e)
		{
			e.preventDefault();

			status() ? hideStatus() : showStatus();

		});
	}

	function bindControls()
	{
		if (controlsBound) return;

		$(document).on('keydown', function(e)
		{
			if (!player || frozen) return;

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
			}

			movementTimer = setTimeout(function()
			{
				frozen = false;

			}, movementDelay);

		});

		controlsBound = true;
	}

	function init(matrix_, clear)
	{
		if (matrix_)
		{
			for (var x = 0; x < matrixSize; x ++)
			{
				matrix[x] = {};

				for (var y = 0; y < matrixSize; y ++)
				{
					var tile = new Tile(matrix_[x][y].type);

					tile.render(x, y);

					setTile(tile, x, y);
				}
			}
		}
		else
		{
			for (var x = 0; x < matrixSize; x ++)
			{
				matrix[x] = {};

				for (var y = 0; y < matrixSize; y ++)
				{
					matrix[x][y] = drawTile(x, y);
				}
			}
		}

		if (clear === true)
		{
			clearLog();

			clearPlayers();
		}

		$('.game').addClass('play');

		bindControls();
	}

	function drawTile(x, y)
	{
		if (x % 2 == 1 && y % 2 == 1)
		{
			type = 'pillar';
		}
		else
		{
			type = Math.floor(Math.random() * 10) > 1 ? 'normal' : 'empty';
		}

		if (empty.indexOf(x + ' ' + y) > -1)
		{
			type = 'empty';
		}

		var tile = new Tile(type);

		tile.render(x, y);

		return tile;
	}

	function getTile(x, y)
	{
		return matrix[x] && matrix[x][y];
	}

	function setTile(tile, x, y)
	{
		if (matrix[x])
		{
			matrix[x][y] = tile;
		}
	}

	function updateTile(x, y, key, value)
	{
		if (matrix[x] && matrix[x][y])
		{
			matrix[x][y][key] = value;
		}
	}

	//	classes

	function Tile(type)
	{
		this.position = {};

		this.type = type || 'empty';

		//	can show explosions on empty tiles or bricks
		this.canExplode = this.type == 'pillar' ? false : true;

		//	can only move on empty tiles
		this.canMove = this.type == 'empty' ? true : false;

		this.hasBomb = false;

		this.setType = function(type)
		{
			this.type = type || 'empty';

			this.canExplode = this.type == 'pillar' ? false : true;

			this.canMove = this.type == 'empty' ? true : false;
		}

		this.render = function(x, y)
		{
			this.position.x = x;
			this.position.y = y;

			switch (this.type)
			{
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

					contextTiles.drawImage(patternFloor, x * brickSize, y * brickSize, brickSize, brickSize);

					break;
			}

			//	matrix numbers
			// contextTiles.fillStyle = 'rgb(100, 100, 100)';
			// contextTiles.fillText(x + ',' + y, x * brickSize + 27, y * brickSize + 40);
		}
	}
