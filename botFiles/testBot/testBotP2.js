var Code = function (){

this.exec = function() {var enemyPosition = player2.getNearestEnemy();
if(player2.bombs == player2.maxBombs){
    goSafe();
}else if(player2.isOnSameLine() === true){
	if(enemyPosition.x == player2.position.x){
    	if(enemyPosition.y - player2.position.y <=2 && enemyPosition.y - player2.position.y >=-2 && player2.bombs < player2.maxBombs){
         	player2.plantBomb();   
        }else{
        	goToEnemy(enemyPosition);
        }
	}else{
       if(enemyPosition.x - player2.position.x <=2 && enemyPosition.x - player2.position.x >=-2 &&  player2.bombs < player2.maxBombs){
         	player2.plantBomb();   
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
    if(enemyPositionToKill.x != player2.position.x){
    	if(enemyPositionToKill.x>player2.position.x){
            caseToGo = [player2.position.x+1, player2.position.y];
           	action(caseToGo, "right");
        }else{
            caseToGo = [player2.position.x-1, player2.position.y];
            action(caseToGo, "left");
        }	
    }
	else{
    	if(enemyPositionToKill.y>player2.position.y){
            caseToGo = [player2.position.x, player2.position.y+1];
           	action(caseToGo, "down");
        }else{
            caseToGo = [player2.position.x, player2.position.y-1];
            action(caseToGo, "up");
        }	
    }
	
}

function action(caseToGo, direction){
     if(player2.isDangerous(caseToGo[0],caseToGo[1]) === true){ 
        /*ne fais rien et att que sa explose*/

     }else if(player2.isEmpty(caseToGo[0],caseToGo[1])===true){
         player2.move(direction);
     }else if(player2.isObstacle(caseToGo[0],caseToGo[1]) === true){
     	if(direction == "left" || direction == "right"){
            if(player2.position.y>enemyPosition.y){
				caseToGo = [player2.position.y-1, player2.position.y];
            	action(caseToGo, "down");
            }else{
				caseToGo = [player2.position.y+1, player2.position.y];
            	action(caseToGo, "up");
            }
        }else{
        	 if(player2.position.x>enemyPosition.x){
				caseToGo = [player2.position.x-1, player2.position.x];
            	action(caseToGo, "left");
            }else{
				caseToGo = [player2.position.x+1, player2.position.x];
            	action(caseToGo, "right");
            }
        }
     }else if(player2.isWall(caseToGo[0],caseToGo[1])===true){
         player2.plantBomb();     
     }
}


function goSafe(){
    if(player2.isDangerous(player2.position.x, player2.position.y) === true){
        var stopInfiniteLoop1=0;for(var i = 0; i<player2.tabBomb.length; i++){if(stopInfiniteLoop1>1000){console.log("boucle infini");return null;}stopInfiniteLoop1++;
            if (player2.position.x - player2.tabBomb[i].position.x <2 && player2.position.x - player2.tabBomb[i].position.x >-2){
                if(player2.canGo("left", player2.position) === true){
                    player2.move("left");
                }else if(player2.canGo("right", player2.position) === true ){
                    player2.move("right");
                }else{
                    if(player2.canGo("up", player2.position) === true){
                        player2.move("up");
                    }else {
                       player2.move("down"); 
                    }

                }
            }else if(player2.position.y - player2.tabBomb[i].position.y <2 && player2.position.y - player2.tabBomb[i].position.y >-2){
                if(player2.canGo("up", player2.position) === true){
                    player2.move("up");
                }else if(player2.canGo("down", player2.position ) === true){
                    player2.move("down");
                }else{
                    if(player2.canGo("right", player2.position) === true){
                        player2.move("right");
                    }else if (player2.canGo("left", player2.position) === true){
                       player2.move("left"); 
                    }
                }
            }
        }
    } 
}              } }