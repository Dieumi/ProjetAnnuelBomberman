var Code = function (){ 


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
