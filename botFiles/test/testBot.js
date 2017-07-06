function Player(t,i,n){this.context=t,this.name=i||"Whale",this.avatar=n,this.isAlive=!0,this.position={},this.maxBombs=1,this.bombs=0,this.move=function(t){},this.canGo=function(t,i){},this.clearBomb=function(){},this.plantBomb=function(){},this.render=function(t,i,n){},this.remove=function(){}};var player = new Player(null, "test", null);

    player.plantBomb()
	