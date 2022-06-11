var Play = 1;
var serve = 2
var End ;
var last;
var gameState = serve;

var space,space2;
var spaceImg,space2Img;
var Boss_enemy, Boss2_enemy, enemy1, enemy2, enemy3, fire_ball;
var Boss_enemyImg, Boss2_enemyImg, enemy1Img, enemy2Img, enemy3Img, fire_ballImg;
var fighter, blue_fire, game_over;
var fighterImg, blue_fireImg, game_overImg;

var asteroid, asteroidImg;

var border;

var victory, victoryImg

var coin, gems;
var coinImg, gemsImg;
var kill, coinScore;
var killImg, coinScoreImg;
var killCount,Boss;

var restart, restartImg;

function preload(){

spaceImg=loadImage("background.jpg");
space2Img=loadImage("background2.jpg");

Boss_enemyImg=loadImage("boss enemy.png");
Boss2_enemyImg=loadImage("boss2 enemy.png");

enemy1Img=loadImage("enemy1.png");
enemy2Img=loadImage("enemy2.png");
enemy3Img=loadImage("enemy3.png");
fire_ballImg=loadAnimation("fire_ball_sprite_1.png", "fire_ball_sprite_2.png", "fire_ball_sprite_3.png", "fire_ball_sprite_4.png", "fire_ball_sprite_5.png");

fighterImg=loadImage("main.png");
blue_fireImg=loadAnimation("blue_fire_ball-1.png", "blue_fire_ball-2.png", "blue_fire_ball-3.png", "blue_fire_ball-4.png", "blue_fire_ball-5.png");

game_overImg=loadImage("gameOver.png");

coinImg=loadImage("coin.png");
gemsImg=loadImage("gems.png");

restartImg=loadImage("restart_button.png");

victoryImg = loadImage ("YouWin.png");

enemy1G=new Group();
enemy2G=new Group();
enemy3G=new Group();

asteroidImg=loadAnimation("asteroid 1.png", "asteroid 2.png", "asteroid 3.png", "asteroid 4.png");

asteroidG=new Group();

fireBall=new Group();

BossFireBall=new Group();

coinG=new Group();
gemsG=new Group();

killImg=loadImage("kill.png");
coinScoreImg=loadImage("coin.png");
} 

function setup() {
  createCanvas(650,800);
  createEdgeSprites();
  
  //Background
  space2 = createSprite(300,400);
  space2.addImage(space2Img);
    space2.velocityY = 4;

    fighter = createSprite(300, 740);
    fighter.visible = false;

    Boss2_enemy = createSprite(325, -150);
    Boss2_enemy.visible = false;

    restart = createSprite(300, 655);
    restart.addImage(restartImg);
    restart.scale=0.4;
    restart.visible = false;

  //Game_over
  game_over = createSprite(300, 400);
  game_over.addImage(game_overImg);
  game_over.visible = false;

  //you win

  victory = createSprite(300, 400);
  victory.addImage(victoryImg);
  victory.visible = false;

//count And Boss Life

  killCount = 0;
  Boss = 500;
  coinScore = 0;
}

function draw() {
  drawSprites();

  textSize(25);
  fill("white");

  text(":" + killCount, 60, 25);
  text("Point:" + coinScore,15, 70);


  
//GameState Serve

  if(gameState == serve){

       //texts
textSize(30);
fill("green");
text("Instructions*", 10, 30);
text("Coin", 80, 270);
text("Gems", 400, 270);
text("Collect Coin For 50 Points", 20, 320);
text("Collect Gems For 100 Points", 20, 350);
text("Fire By Pressing Space And Kill Enemy Ships", 20, 440);
text("Kill 100 Ships To Fight With Boss Ship ", 20, 480);
text("& Be Aware of Asteroid Coming Form Side", 20, 520);
text("Press Enter Key To Start", 80, 700);

    
    space2.velocityY =0.9;
    
  if(space2.y > 1000){
    space2.y = height/10
  }

  
//Gamestate Change

if(keyDown("enter")){
  gameState = Play;
  fighter.visible = true;
}

  } 

//GameState Play

if(gameState == Play){

  game_over.visible = false;
  restart.visible = false;

  

  //kill
  kill = createSprite(30, 25);
  kill.addImage(killImg);
  kill.scale = 0.2;
  
  
 //Main_Fighter
 
 fighter.addImage(fighterImg);
 fighter.scale= 0.3;
 fighter.setCollider("rectangle", 0, 0, 300, 200);



  //Background Moving
  space2.velocityY = (4 + 5* killCount/5);
 if(space2.y > 400){
    space2.y = height/25
}

//Enemy Spawn
var select_enemy = Math.round(random(1,3));

if(World.frameCount%50 === 0){
  if(select_enemy == 1){
    spawnEnemy1();
  }else if(select_enemy == 2){
    spawnEnemy2();
  }else {
    spawnEnemy3();
  }
}

//Coins & gems
var select_object = Math.round(random(1,2));

if(World.frameCount%140 === 0){
  if(select_object == 1){
    spawnCoin();
  }else if(select_object == 2){
    spawnGems();
  }


}



//fighter Control
fighter.x = World.mouseX
fighter.y = World.mouseY

//fighter Fire

if(keyDown("space")){

  spawnFire();

}

//fireball setting

if(fireBall.isTouching(enemy1G)){
  enemy1G.destroyEach();
  fireBall.destroyEach();
  killCount = killCount +1;
}
  
if(fireBall.isTouching(enemy2G)){
  enemy2G.destroyEach();
  fireBall.destroyEach();
  killCount = killCount +1;
}

if(fireBall.isTouching(enemy3G)){
  enemy3G.destroyEach();
  fireBall.destroyEach();
  killCount = killCount +1;
}

if(fireBall.isTouching(asteroidG)){
  asteroidG.destroyEach();
  fireBall.destroyEach();
  killCount = killCount +1;
}

//Collect Coins & Gems

if(coinG.isTouching(fighter)){
  coinG.destroyEach();
  coinScore = coinScore +50
}

if(gemsG.isTouching(fighter)){
  gemsG.destroyEach();
  coinScore = coinScore +100
}

//fighter fire ball With boss 

if(fireBall.isTouching(Boss2_enemy)){

fireBall.destroyEach();
Boss = Boss - 5;

}


//game over setting

if(enemy1G.isTouching(fighter) ){
  fighter.visible = false;
  gameState = End;
}

if(enemy2G.isTouching(fighter) ){
  fighter.visible = false;
  gameState = End;
}

if(enemy3G.isTouching(fighter) ){
  fighter.visible = false;
  gameState = End;
}

if(asteroidG.isTouching(fighter) ){
  fighter.visible = false;
  gameState = End;
}

//Boss Fire Ball Setting

if(BossFireBall.isTouching(fighter)){

  fighter.visible = false;
  gameState = End;

}

if(Boss2_enemy.isTouching(fighter)){

  fighter.visible = false;
  gameState = End;

}


if(World.frameCount%160 == 0){
  
  spawnAsteroid();

}

}


if(killCount == 100){

  BossFight();

}


// GameState End

if(gameState == End){
  
 //enemy

 enemy1G.destroyEach();
 enemy2G.destroyEach();
 enemy3G.destroyEach();
 asteroidG.destroyEach();
 BossFireBall.destroyEach();
 
 //space
 
   space2.velocityY =0;
     
 //Game Over & Restart Button
 
 game_over.visible = true;
 restart.visible = true;
 
 //Restart Game
 
 if(mousePressedOver(restart)){
   reset();
   gameState = Play;
 }
 

}

}


//reset

function reset(){

  fighter = createSprite(300, 740);
  killCount = 0;
  coinScore = 0;
  Boss2_enemy.destroy();

  victory.visible = false;

  }


//Fire Ball

function spawnFire(){

  blue_fire=createSprite(100, 100, 10, 10);
  blue_fire.addAnimation("FireBall", blue_fireImg);
  blue_fire.scale = 0.3;
  blue_fire.lifetime = 100;
  blue_fire.velocityY = -(10 + 2* space2.velocityY/5)
  blue_fire.y = fighter.y;
  blue_fire.x = fighter.x;
  fireBall.add(blue_fire);

  

}


//Enemy 1 Spawn
function spawnEnemy1(){

  enemy1 = createSprite (Math.round(random(40, 650), 0));
  enemy1.addImage(enemy1Img);
  enemy1.scale = 0.4;
  enemy1.velocityY = (4 + 2* space2.velocityY/5);
  enemy1.lifetime= 200;
  enemy1G.add(enemy1);
  console.log(enemy1.velocityY + "fir")

}


//Enemy 2 Spawn
function spawnEnemy2(){

  enemy2 = createSprite (Math.round(random(40, 650), 0));
  enemy2.addImage(enemy2Img);
  enemy2.scale = 0.4;
  enemy2.velocityY = (4 + 2* space2.velocityY/5);
  enemy2.lifetime= 210;
  enemy2G.add(enemy2);
  console.log(enemy2.velocityY + "sec")
}

//Enemy 3 Spawn
function spawnEnemy3(){

  enemy3 = createSprite (Math.round(random(40, 650), 0));
  enemy3.addImage(enemy3Img);
  enemy3.scale = 0.4;
  enemy3.velocityY = (4 + 2* space2.velocityY/5);
  enemy3.lifetime= 200;
  enemy3G.add(enemy3);
  console.log(enemy3.velocityY + "third")
}

//hardLevel

function spawnAsteroid(){

  asteroid = createSprite(690, Math.round(random(20, 780)));
  asteroid.addAnimation("Asteroid", asteroidImg);
  asteroid.scale = 0.4;
  asteroid.velocityX = -4;
  asteroid.lifetime= 180;
  asteroidG.add(asteroid);
}

//Coins And Gems

function spawnCoin(){

coin = createSprite(Math.round(random(40, 650), 0))
coin.addImage(coinImg);
coin.scale = 0.2;
coin.velocityY = (5 + 1* space2.velocityY/5);
coin.lifetime= 200;
coinG.add(coin);

}

function spawnGems(){

gems = createSprite(Math.round(random(40, 650), 0))
gems.addImage(gemsImg);
gems.scale = 0.2;
gems.velocityY= (5 + 1* space2.velocityY/5);
gems.lifetime= 200;
gemsG.add(gems);



}




function BossFight(){

  textSize(30);
  fill("red");
  text("Boss:" + Boss, 280, 40);

  enemy1G.destroyEach();
enemy2G.destroyEach();
enemy3G.destroyEach();
asteroidG.destroyEach();

//Space

space2.velocityY =0.9;

//Invisible border

border = createSprite(325,310, 650, 10);
border.visible = false;


//boss
Boss2_enemy.debug = false;

//boss Collider

Boss2_enemy.setCollider("rectangle", 0, 0, 40, 300);

Boss2_enemy.visible = true;
Boss2_enemy.addImage(Boss2_enemyImg);
Boss2_enemy.scale = 0.7;
Boss2_enemy.velocityY = 2;
Boss2_enemy.collide(border);

if(World.frameCount %110 == 0){

spawnFireBall();

}

//end setting

if(Boss == 0){

  Boss2_enemy.destroy();
  BossFireBall.destroyEach();

    //Boss & fighter
    Boss2_enemy.destroy();
BossFireBall.destroyEach();

fighter.destroy();
fireBall.destroyEach();

//Enemy

    enemy1G.destroyEach();
    enemy2G.destroyEach();
    enemy3G.destroyEach();
    asteroidG.destroyEach();
    BossFireBall.destroyEach();

//Victory

    victory.visible = true;

  //Restart

  restart.visible = true;

//Restart Game
 
if(mousePressedOver(restart)){
  reset();
  gameState = Play;
}

}


}

//Boss Fire Balls

function spawnFireBall(){

fire_ball = createSprite(Math.round(random(60, 740)));
fire_ball.addAnimation("Fire_Ball", fire_ballImg);
fire_ball.scale = 0.4;
fire_ball.y = Boss2_enemy.y;
fire_ball.velocityY = 13;
fire_ball.lifetime = 180;
BossFireBall.add(fire_ball);

fire_ball2 = createSprite(Math.round(random(60, 740)));
fire_ball2.addAnimation("Fire_Ball", fire_ballImg);
fire_ball2.scale = 0.4;
fire_ball2.y = Boss2_enemy.y;
fire_ball2.velocityY = 12;
fire_ball2.lifetime = 180;
BossFireBall.add(fire_ball2);

fire_ball3 = createSprite(Math.round(random(60, 740)));
fire_ball3.addAnimation("Fire_Ball", fire_ballImg);
fire_ball3.scale = 0.4;
fire_ball3.y = Boss2_enemy.y;
fire_ball3.velocityY = 9;
fire_ball3.lifetime = 180;
BossFireBall.add(fire_ball3);

fire_ball4 = createSprite(Math.round(random(60, 740)));
fire_ball4.addAnimation("Fire_Ball", fire_ballImg);
fire_ball4.scale = 0.4;
fire_ball4.y = Boss2_enemy.y;
fire_ball4.velocityY = 7;
fire_ball4.lifetime = 180;
BossFireBall.add(fire_ball4);


}

