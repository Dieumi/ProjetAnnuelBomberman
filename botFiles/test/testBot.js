var Code = function (){ 
 this.exec = function() { function Player(t,i,n){this.context=t,this.name=i||"Whale",this.avatar=n,this.isAlive=!0,this.position={},this.maxBombs=1,this.bombs=0,this.move=function(t){},this.canGo=function(t,i){},this.clearBomb=function(){},this.plantBomb=function(){},this.render=function(t,i,n){},this.remove=function(){},this.isObstacle = function (x, y){},this.isWall = function (x, y) { }, this.isEmpty = function (x, y) { }, this.isBomb = function (x, y) { }, this.isBomber = function(x, y){} };var player = new Player(null, "test", null);
var b ="test";
var nb=Math.floor((Math.random() * 100) + 1);

if(nb>0 && nb<20){
	pslayer.move("right");
	//player.plantBomb()
	//player.move("left")
	player.non();
/*}else if(nb>20 && nb<40){
	player.move("right")
}else if(nb>40 && nb<60){
	player.move("up")
}else if(nb>60 && nb<80){
	player.move("down")
}else if(nb>80 && nb<100){
	player.move("left")*/
}   } }