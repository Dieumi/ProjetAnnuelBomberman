function exec(){
    this.player.bomb();
    this.player.move("right");
    this.player.bomb()
    this.player.move("left");
    this.player.bomb();
    this.player.move("down");
}
