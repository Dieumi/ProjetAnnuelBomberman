  var nb=Math.floor((Math.random() * 100) + 1);

  var tile =player.canGo("up",player.position);

  player.plantBomb();

if(tile==true ){
  console.log("up")
      player.move("up")

}else{
    console.log("down")
      player.move("down")
}
  console.log(tile);
