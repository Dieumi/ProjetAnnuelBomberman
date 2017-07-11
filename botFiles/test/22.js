var Code = function (){ 
 this.exec = function() {      var tedst;
  var nb=Math.floor((Math.random() * 100) + 1);
		if(nb>0 && nb<20){
			player.move("right")
			   player.plantBomb()
				player.move("left")

		  }else if(nb>20 && nb<40){
			  player.move("right")
		  }else if(nb>40 && nb<60){
			  player.move("up")
		  }else if(nb>60 && nb<80){
			  player.move("down")
		  }else if(nb>80 && nb<100){
			  player.move("left")
		  }
		var tile =player.canGo("up",player.position);
		  player.plantBomb();
		  if(this.bomb){
			if(this.bomb.isAlive==true){
			  if(tile==true && this.bomb.position.x!=player.position.x-1 && this.bomb.position.y!=player.position.y-1){
				console.log("up")
					plmmayer.move("up")

			  }else{
				  console.log("down")
					player.move("down")
			  }
			}else {
			  if(tile==true ){
				console.log("up")
					player.move("up")

			  }else{
				  console.log("down")
					player.move("down")
			  }
			}
		 }else{
		  console.log("down")
			player.move("down")
		}

		console.log(tile)

 

 

 

 

 

 

 
 } }