var Code = function (){ 
 this.exec = function() {      var tedst;
  var nb=Math.floor((Math.random() * 100) + 1);
		if(nb>0 && nb<20){
			player2.move("right")
			   player2.plantBomb()
				player2.move("left")

		  }else if(nb>20 && nb<40){
			  player2.move("right")
		  }else if(nb>40 && nb<60){
			  player2.move("up")
		  }else if(nb>60 && nb<80){
			  player2.move("down")
		  }else if(nb>80 && nb<100){
			  player2.move("left")
		  }
		var tile =player2.canGo("up",player2.position);
		  player2.plantBomb();
		  if(this.bomb){
			if(this.bomb.isAlive==true){
			  if(tile==true && this.bomb.position.x!=player2.position.x-1 && this.bomb.position.y!=player2.position.y-1){
				console.log("up")
					plmmayer.move("up")

			  }else{
				  console.log("down")
					player2.move("down")
			  }
			}else {
			  if(tile==true ){
				console.log("up")
					player2.move("up")

			  }else{
				  console.log("down")
					player2.move("down")
			  }
			}
		 }else{
		  console.log("down")
			player2.move("down")
		}

		console.log(tile)

 

 

 

 

 

 

 
 } }