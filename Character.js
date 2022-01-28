import MovingDirection from "./MovingDirection.js";

export default class Character{
    constructor(x,y,tileSize,velocity,gravity,gravitySpeed,gravityHeight,tileMap){
        this.x=x;
        this.y=y;
        this.tileSize=tileSize;
        this.velocity=velocity;
        this.gravity=gravity;
        this.gravityHeight=gravityHeight;
        this.gravitySpeed=gravitySpeed;
        this.tileMap= tileMap
        this.currentMovingDirection=null;
        this.requestdMovingDirection= null;
        this.frames=0;
        this.loadCharacterImages();
        document.addEventListener("keydown",this.keydown)
 }
drawCharacter(context){
    
    context.drawImage(
        this.characterImages[0],
        177*this.frames,
        0,
        177 //with of crop mark
        ,400,
        this.x,
        this.y,
        this.tileSize,
        this.tileSize,
        66,150
        )
      
        
}
enableGravity(){
    if(this.frames>28) this.frames=0
    this.frames+=1
   if(( this.y/this.tileSize)<9){
       if(!this.tileMap.onGround(this.x,this.y)){
     this.y+=2}
    
    }
}

loadCharacterImages(){
    
   const spriteRunLeft=new Image();
    spriteRunLeft.src= "img/spriteRunLeft.png";
   
   const spriteRunRight=new Image();
      spriteRunRight.src= 'img/spriteRunRight.png';
     
     const spriteStandLeft=new Image();
     spriteStandLeft.src= 'img/spriteStandLeft.png';
     
     const spriteStandRight=new Image();
      spriteStandRight.src= 'img/spriteStandRight.png';
    
    
    this.characterImages=[
        spriteStandRight,
        spriteStandLeft,
        spriteRunLeft,
        spriteRunRight,
       
    ];
    this.pacmanImageIndex=0;
}
keydown=(event)=>{
    
    if(event.keyCode===32  || event.keyCode===38 ){//for spacebar or up arrow 
            this.currentMovingDirection=MovingDirection.up
            this.move()
            
    }
    if(event.keyCode===40 ){ //for down arrow
            this.currentMovingDirection=MovingDirection.down
            this.move()
            
    }
    if(event.keyCode===37 ){ // 37 is keycode for leftarrow
            this.currentMovingDirection=MovingDirection.left
            this.move()
            
    }
    if(event.keyCode===39 ){ //for right arrow
            this.currentMovingDirection=MovingDirection.right
            this.move()
            
    }

}

move(){
    // console.log(this.x,this.y)
   
  //  this.didCollideRight(this.x,this.y,this.currentMovingDirection)
    //this.tileMap.didCollide(this.x,this.y,this.currentMovingDirection);
    
    switch(this.currentMovingDirection){
        case MovingDirection.up:
            if(!this.tileMap.didCollideTop(this.x,this.y,this.currentMovingDirection)){
        this.y-=this.tileSize;}
        
        break;
        case MovingDirection.down:
            if(!this.tileMap.didCollideBottom(this.x,this.y,this.currentMovingDirection)){
        this.y+=this.tileSize;}
        
        break;
        case MovingDirection.right:
            if(!this.tileMap.didCollideRight(this.x,this.y,this.currentMovingDirection)){
        this.x+=this.tileSize;}
        
        break;
        case MovingDirection.left:
            if(!this.tileMap.didCollideLeft(this.x,this.y,this.currentMovingDirection)){
        this.x-=this.tileSize;}
       
        break;
    }
   
    // console.log(this.x,this.y)
}

   
 

}