class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
      //background (bg2);
      ground= createSprite(displayWidth/2,displayHeight-250,displayWidth,40);
      army1 = createSprite(100,200);
      army1.addAnimation("army1",army1Img);
      army2 = createSprite(300,200);
      army2.addAnimation("army2",army2Img);
      army=[army1,army2]
      
    }

    play(){
      form.hide();

      Player.getPlayerInfo();
     // player.getCarsatEnd();
      if(allPlayers !== undefined){
        //var display_position = 100;
        
      //  image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
        //index of the array
        var index = 0;
        player.velocityY=1;
        //x and y position of the cars
        var x = 175;
        var y = 400;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
          x = x + 400;
          //use data form the database to display the cars in y direction
          //y = displayHeight - allPlayers[plr].distance;
           //army[index-1].x = x;
           //army[index-1].y = y;
  
          /*if (index === player.index){
            stroke (10);
            fill ("red");
            ellipse(x,y,60,60);
            cars[index - 1].shapeColor = "red";
            camera.position.x = displayWidth/2;
            camera.position.y = cars[index-1].y
          }*/
         
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
  
      }
      
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.velocityY =-10
        player.update();
      }
      if(player.score>10){
        gameState=2;
        //player.rank+=1;
        //Player.updateCarsatEnd(player.rank);
        textSize(30);
        fill("white");
        text("You Won "+ player.rank,displayWidth/2-70,army[player.index-1].y-300)
      }
      drawSprites();
    }
      end(){
        console.log("gameEnded")
      }
  }
  
    
