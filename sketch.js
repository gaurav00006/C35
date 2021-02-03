var hypnoticBall,database,position;

function preload(){
    backgroundImage = loadImage("Hot Air Ballon-01.png") 
    baloon_flying = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png")  
}
function setup(){
    database=firebase.database();

    createCanvas(1350,650);
   

    background2 = createSprite(700,250,1400,1000)
    background2.addImage(backgroundImage);
    background2.scale=0.5;

    hypnoticBall = createSprite(250,250,10,10);
    hypnoticBall.addAnimation("flying",baloon_flying);  
    hypnoticBall.scale=0.5;

    var hypnoticBallPosition=database.ref("baloon/position")
    hypnoticBallPosition.on("value",readPosition,showError)
    
}


function draw(){
    if(position!==undefined){

    
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}
}
function writePosition(x,y){
    database.ref("baloon/position").set({
    'x':position.x+x,
    'y':position.y+y
    })
}

function readPosition(data){
 position=data.val()
 hypnoticBall.x=position.x
 hypnoticBall.y=position.y
}
function showError(){
  console.log("erroriswritingindatabase")
}