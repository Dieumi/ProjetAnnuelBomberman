var Code = function (){

this.exec = function() {var enemyPosition = player.getNearestEnemy();
if(player.bombs == player.maxBombs){
    goSafe();
}else if(player.isOnSameLine() === true){
	if(enemyPosition.x == player.position.x){
    	if(enemyPosition.y - player.position.y <=2 && enemyPosition.y - player.position.y >=-2 && player.bombs < player.maxBombs){
         	player.plantBomb();   
        }else{
        	goToEnemy(enemyPosition);
        }
	}else{
       if(enemyPosition.x - player.position.x <=2 && enemyPosition.x - player.position.x >=-2 &&  player.bombs < player.maxBombs){
         	player.plantBomb();   
        }else{
        	goToEnemy(enemyPosition);   
        }
    }
}else{
    goSafe();
	goToEnemy(enemyPosition);    
}

function goToEnemy(enemyPositionToKill){
	 var caseToGo = [];
    if(enemyPositionToKill.x != player.position.x){
    	if(enemyPositionToKill.x>player.position.x){
            caseToGo = [player.position.x+1, player.position.y];
           	action(caseToGo, "right");
        }else{
            caseToGo = [player.position.x-1, player.position.y];
            action(caseToGo, "left");
        }	
    }
	else{
    	if(enemyPositionToKill.y>player.position.y){
            caseToGo = [player.position.x, player.position.y+1];
           	action(caseToGo, "down");
        }else{
            caseToGo = [player.position.x, player.position.y-1];
            action(caseToGo, "up");
        }	
    }
	
}

function action(caseToGo, direction){
     if(player.isDangerous(caseToGo[0],caseToGo[1]) === true){ 
        /*ne fais rien et att que sa explose*/

     }else if(player.isEmpty(caseToGo[0],caseToGo[1])===true){
         player.move(direction);
     }else if(player.isObstacle(caseToGo[0],caseToGo[1]) === true){
     	if(direction == "left" || direction == "right"){
            if(player.position.y>enemyPosition.y){
				caseToGo = [player.position.y-1, player.position.y];
            	action(caseToGo, "down");
            }else{
				caseToGo = [player.position.y+1, player.position.y];
            	action(caseToGo, "up");
            }
        }else{
        	 if(player.position.x>enemyPosition.x){
				caseToGo = [player.position.x-1, player.position.x];
            	action(caseToGo, "left");
            }else{
				caseToGo = [player.position.x+1, player.position.x];
            	action(caseToGo, "right");
            }
        }
     }else if(player.isWall(caseToGo[0],caseToGo[1])===true){
         player.plantBomb();     
     }
}


function goSafe(){
    if(player.isDangerous(player.position.x, player.position.y) === true){
        var stopInfiniteLoop1=0;for(var i = 0; i<player.tabBomb.length; i++){if(stopInfiniteLoop1>1000){console.log("boucle infini");return null;}stopInfiniteLoop1++;
            if (player.position.x - player.tabBomb[i].position.x <2 && player.position.x - player.tabBomb[i].position.x >-2){
                if(player.canGo("left", player.position) === true){
                    player.move("left");
                }else if(player.canGo("right", player.position) === true ){
                    player.move("right");
                }else{
                    if(player.canGo("up", player.position) === true){
                        player.move("up");
                    }else {
                       player.move("down"); 
                    }

                }
            }else if(player.position.y - player.tabBomb[i].position.y <2 && player.position.y - player.tabBomb[i].position.y >-2){
                if(player.canGo("up", player.position) === true){
                    player.move("up");
                }else if(player.canGo("down", player.position ) === true){
                    player.move("down");
                }else{
                    if(player.canGo("right", player.position) === true){
                        player.move("right");
                    }else if (player.canGo("left", player.position) === true){
                       player.move("left"); 
                    }
                }
            }
        }
    } 
}              } }