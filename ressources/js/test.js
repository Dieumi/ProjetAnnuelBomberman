function exec(){
  var nb=Math.floor((Math.random() * 100) + 1);
  var tile =player.canGo("up",player.position);
  player.plantBomb();
  player.move("down")
if(tile==true ){
  console.log("up")
  player.move("up")
}else{
  console.log("down")
  player.move("down")
}
  console.log(tile);

}
