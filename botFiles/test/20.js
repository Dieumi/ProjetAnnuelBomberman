var nb=Math.floor((Math.random() * 100) + 1);
var test = [];
  if(nb<0 < nb<20){
	player.plantBomb()
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