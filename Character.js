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
        this.#loadCharacterImages();
        document.addEventListener("keydown",this.#keydown)
    }
drawCharacter(context){
    
    context.drawImage(this.characterImages[0],
        this.x,
        this.y,
        this.tileSize,
        this.tileSize)
        
        
}
enableGravity(){
    // console.log(`gravity after ${this.y}`)
   if(( this.y/this.tileSize)<9){
       if(!this.tileMap.onGround(this.x,this.y)){
     this.y+=2}
    //    console.log(`gravity after ${this.y}`)
    //     // this.gravityHeight=this.y-640);
        // this.gravitySpeed=this.gravityHeight*this.gravity;
        // this.y+=this.gravitySpeed
    }
}

#loadCharacterImages(){
    const characterIdle=new Image();
    characterIdle.src='./images/Idle\ \(1\).png';
    const characterJump=new Image();
    characterJump.src='./images/Jump\ \(1\).png';
    const characterRun1=new Image();
    characterRun1.src='./images/Run\ \(1\).png';

    const characterRun2=new Image();
    characterRun2.src='./images/Run\ \(2\).png';

    const characterRun3=new Image();
    characterRun3.src='./images/Run\ \(3\).png';
console.log("inside")
    this.characterImages=[
        characterIdle,
        characterJump,
        characterRun1,
        characterRun2,
        characterRun3 
    ];
    this.pacmanImageIndex=0;
}
#keydown=(event)=>{
    
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
    console.log(this.x,this.y)
    this.tileMap.fun(this.x,this.y);
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
   
    console.log(this.x,this.y)
}
test(){
    console.log("a")
}
   
 

}