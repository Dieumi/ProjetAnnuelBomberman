var Code = function (){ 
 this.exec = function() { var b ="test";
var nb=Math.floor((Math.random() * 100) + 1);

if(nb>0 && nb<20){
	player2.move("right");
	player2.plantBomb();
	player2.move("left");
	player2.non();
}else if(nb>20 && nb<40){
	player2.move("right");
}else if(nb>40 && nb<60){
	player2.move("up");
}else if(nb>60 && nb<80){
	player2.move("down");
}else if(nb>80 && nb<100){
	player2.move("left");
}  } }