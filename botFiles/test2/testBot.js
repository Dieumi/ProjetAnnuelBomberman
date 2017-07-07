function Player(t,i,n){this.context=t,this.name=i||"Whale",this.avatar=n,this.isAlive=!0,this.position={},this.maxBombs=1,this.bombs=0,this.move=function(t){},this.canGo=function(t,i){},this.clearBomb=function(){},this.plantBomb=function(){},this.render=function(t,i,n){},this.remove=function(){}};var player = new Player(null, "test", null);
 var nb=Math.floor((Math.random() * 100) + 1);
  if(nb>0 && nb<20){
	player.move("left")
    player.plantBomb()
	player.move("right")
	player.move("down")
  }else if(nb>20 && nb<40){
      player.move("right")
  }else if(nb>40 && nb<60){
      player.move("left")
  }else if(nb>60 && nb<80){
      player.move("down")
  }else if(nb>80 && nb<100){
      player.move("up")
  }