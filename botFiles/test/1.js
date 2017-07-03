function exec(){
  var nb=Math.floor((Math.random() * 100) + 1);
  if(nb>0 && nb<20){
        this.player.move("left")
    this.player.plantBomb()
      this.player.move("right")
      this.player.move("down")
  }else if(nb>20 && nb<40){
      this.player.move("right")
  }else if(nb>40 && nb<60){
      this.player.move("left")
  }else if(nb>60 && nb<80){
      this.player.move("down")
  }else if(nb>80 && nb<100){
      this.player.move("up")
  }


}