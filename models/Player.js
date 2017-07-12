var playersummary = function(){};

playersummary.prototype.Player = function(context, name, avatar) {
    this.context = context;
    this.name = name || "Whale";
    this.avatar = avatar || playerWhale;
    this.isAlive = true;
    this.position = {};
    this.maxBombs = 1;
    this.bombs = 0;

    this.move = function(direction) {
        // can't move if dead, son
        if (!this.isAlive) {
            return;
        }

        //	check if we can move in that direction
        if (!this.canGo(direction, this.position)){
            return;
        }

        switch (direction) {
            case "up":
                this.render(this.position.x, this.position.y - 1);
                break;
            case "down":
                this.render(this.position.x, this.position.y + 1);
                break;
            case "left":
                this.render(this.position.x - 1, this.position.y);
                break;
            case "right":
                this.render(this.position.x + 1, this.position.y);
                break;
        }
    };

    this.canGo = function(direction, position) {
        var x = position.x,
            y = position.y;

        switch (direction) {
            case "up":
                y = position.y - 1;
                break;
            case "down":
                y = position.y + 1;
                break;
            case "left":
                x = position.x - 1;
                break;
            case "right":
                x = position.x + 1;
                break;
        }

        var tile = getTile(x, y);

        return tile && tile.canMove && !tile.hasBomb;
    };

    this.clearBomb = function() {
        this.bombs--;
    };

    this.plantBomb = function() {
        // dead people don't plant bombs
        if (!this.isAlive) {
            return;
        }

        //	make sure we're not exceeding the max bomb limit
        if (this.bombs >= this.maxBombs) {
            return;
        }

        //	check if bomb is planted on the same spot
        if (getTile(this.position.x, this.position.y).hasBomb) {
            return;
        }

        //	else plant bomb
        var bomb = new Bomb(this.position.x, this.position.y);

        this.bombs++;

        setTimeout(this.clearBomb.bind(this), BOMB_TIMER);

        //	fake bomb planting while the server responds
        Bomb.plant(this.position.x, this.position.y);

        //	notify the server
        if (socket && player) {
            socket.emit("bomb", gameId, this.position);
        }
    };

    this.render = function(x, y, dontNotify) {
        this.context.clearRect(this.position.x * brickSize, this.position.y * brickSize, brickSize, brickSize);

        //	don't render if player is dead
        if (!this.isAlive) return;

        //	draw player
        this.context.drawImage(this.avatar, x * brickSize, y * brickSize, brickSize, brickSize);

        //	update position
        this.position.x = x;
        this.position.y = y;

        //	let the server know player has moved
        if (socket && player && !dontNotify) {
            socket.emit('move', gameId, player.id, this.position);
        }
    };

    this.remove = function() {
        this.context.clearRect(0, 0, brickSize * matrixSize, brickSize * matrixSize);
    };
};

playersummary.prototype.create = function(context, data) {
    var player = new Player(context, data.name, avatars[data.avatar]);

    player.id = data.id;
    player.index = data.index;
    player.ready = data.ready;

    return player;
};
