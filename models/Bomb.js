var bombsummary=function(){};

bombsummary.prototype.Bomb = function(posX, posY, strength) {
    this.position = {
        x: posX,
        y: posY
    };

    this.isAlive = true;
    this.strength = strength || 1;
    this.blown = [];
    this.powerUp = function() {
        this.strength++;
    };

    this.cleanUp = function() {
        this.blown.forEach(function(spot) {
            //	clear up explosion
            contextBombs.clearRect(spot.x * brickSize, spot.y * brickSize, brickSize, brickSize);

            var tile = getTile(spot.x, spot.y);

            //	update the tile
            updateTile(spot.x, spot.y, "type", "empty");
            updateTile(spot.x, spot.y, "canMove", true);

            tile.render(tile.position.x, tile.position.y);

        });
    };

    this.detonate = function() {
        clearTimeout(this.explosionTimer);

        //	make it a dud
        this.isAlive = false;

        contextBombs.fillStyle = "rgb(231, 76, 60)";

        //	clear the bomb flag from the tile
        updateTile(this.position.x, this.position.y, "hasBomb", false);

        //	detonate the bomb
        //	and blow any adjacent tiles
        var blown = [{
            x: this.position.x,
            y: this.position.y
        }, {
            x: this.position.x,
            y: this.position.y - this.strength
        }, {
            x: this.position.x,
            y: this.position.y + this.strength
        }, {
            x: this.position.x - this.strength,
            y: this.position.y
        }, {
            x: this.position.x + this.strength,
            y: this.position.y
        }];

        blown.forEach(function(spot) {
            if (this.canExplode(spot.x, spot.y)) {
                this.blown.push(
                    {
                        x: spot.x,
                        y: spot.y
                    });
                updateTile(spot.x, spot.y, "canMove", false);
                contextBombs.drawImage(patternFire, spot.x * brickSize, spot.y * brickSize, brickSize, brickSize);
            }
        }, this);

        //	clear up the explosion
        setTimeout(this.cleanUp.bind(this), BOMB_CLEAR_TIMER);
    };

    this.canExplode = function(x, y) {
        var tile = getTile(x, y);

        //	check if tile can explode
        return tile && tile.canExplode;
    };

    this.render = function() {
        if (this.isAlive) {
            //	clear the cell before drawing bomb
            contextBombs.clearRect(this.position.x * brickSize, this.position.y * brickSize, brickSize, brickSize);

            //	draw bomb
            contextBombs.drawImage(iconBomb, this.position.x * brickSize, this.position.y * brickSize, brickSize, brickSize);

            //	update the tile with the `hasBomb` flag
            updateTile(this.position.x, this.position.y, "hasBomb", true);

            if (this.explosionTimer) return;

            //	detonate the bomb
            this.explosionTimer = setTimeout(this.detonate.bind(this), BOMB_TIMER);
        }
    }
};

//	fake bomb plant on client-side
bombsummary.prototype.plant= function(x, y) {
    //	clear the cell before drawing bomb
    contextBombs.clearRect(x * brickSize, y * brickSize, brickSize, brickSize);

    //	draw bomb
    contextBombs.drawImage(iconBomb, x * brickSize, y * brickSize, brickSize, brickSize);
};