import Character from "./Character.js"

//import MovingDirection from "./MovingDirection.js";
export default class TileMap{
    constructor(tileSize,context){
        this.tileSize=tileSize;

        this.context=context
        this.dirt=this.image("img/platformSmall.png")
        this.sky=this.image("img/background.png")
        this.wall=this.image("img/platformSmallTall.png")  
        this.coin=this.image('img/coin.png')
        this.fire=this.image('img/fire.png')
        this.rocket=this.image('img/rocket.png')
    }
    
   image(fileName){ //private method
        const img= new Image(); //create image object 
        img.src=`${fileName}`; //giving a path 
        return img;
    }
    //1-grass
    //0-skt
    //2=dirt
    //3=character
    //4=coin
    //5=fire
    //6=rocket
    map = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
        [0,0,0,0,0,4,4,0,0,0,0,4,6,0,1,1],
        [0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,0],
        [0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0],
        [0,0,0,1,1,1,1,0,0,0,0,4,4,4,4,4],
        [0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
        [0,0,3,0,0,0,4,1,2,1,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1],
            
      ];
    
    drawTile(canvas,context){
        this.setCanvasSize(canvas);
        this.clearCanvas(canvas,context);
        this.drawMap(context);
        this.coinLeft(context)
    }
    coinLeft(context){
        return this.map.flat().filter((tile) => tile ===4 ).length ;
        }
        coinConsumed(context){
            return 16-this.map.flat().filter((tile) => tile ===4 ).length ;
        }   
       drawMap(context){
        for(let row=0;row<this.map.length;row++){
            for(let column=0;column<this.map[row].length;column++){
                const tile=this.map[row][column];
                let image=null;
                switch(tile){
                    case 1:
                        image=this.wall;
                        break;
                    case 0:
                        image=this.sky;
                        break;
                    case 2:
                        image=this.dirt;
                        break;
                    case 3:
                        image=this.character;
                         break;
                    case 4:
                        image=this.coin;
                        break;
                    case 5:
                        image=this.fire;
                        break;
                    case 6:
                        image=this.rocket;
                        break;
                    
                }
               if(image!=null)
                context.drawImage(image
                    ,column*this.tileSize
                    ,row*this.tileSize,
                    this.tileSize
                    ,this.tileSize
                    );
            }

        }
    }
   clearCanvas(canvas,context){
        context.fillStyle="black";
        context.fillRect(0,0,canvas.Width,canvas.Height)
    }
    
   setCanvasSize(canvas){
        canvas.Height=this.map.length*this.tileSize;
        canvas.Width=this.map[0].length*this.tileSize;
        
    }
   
    getCharacter(velocity,gravity,gravitySpeed,gravityHeight){
        for(let row=0;row<this.map.length;row++){
            for(let column=0;column<this.map[row].length;column++){
                let tile=this.map[row][column];
                if(tile===3){
                    this.map[row][column]=0;
                    return new Character(
                        column*this.tileSize,
                        row*this.tileSize ,
                        this.tileSize,
                        velocity,
                        gravity,
                        gravitySpeed,
                        gravityHeight,
                        this);
                }
            }
        }
        
    }
    onGround(x,y){
       
        // console.log('test',x,y)
        let column=x/this.tileSize;
        let row=y/this.tileSize;
        let  downRow=Math.floor(row+1);
        // console.log(`x:${x} y:${y} tilesize:${this.tileSize}`)
        // console.log(`column:${column} row:${row} downrow:${downRow}`)
            const tile= this.map[downRow][column];
            //   console.log(tile)
            if (tile===2 ){
               // console.log("on dirt",tile)
                return true;
            }
            else if(tile===1){
               // console.log("on grass",tile)
                return true
            }
            else{
                //console.log("on air",tile)
                return false;
            }
      
      
       
    }
    didCollideBottom(x,y,direction){
        
            let column=0;
            let row=0;
            let nextColumn=0;
            let nextRow=0;
        nextRow=y+this.tileSize;
        row=nextRow/this.tileSize
        column=x/this.tileSize;
        if(this.tileCollided(row,column,direction)){
            
          //  console.log("collision in bottom")
            return true;
        }
        else{
            
           // console.log("no collision in bottom")
            return false;
        }
    }
    didCollideTop(x,y,direction){
        let column=0;
        let row=0;
        let nextColumn=0;
        let nextRow=0;
        nextRow=y-this.tileSize;
        row=nextRow/this.tileSize
        column=x/this.tileSize;
        if(this.tileCollided(row,column,direction)){
            //console.log("collision in top")
            return true;
        }
        else{
           // console.log("no collision in top")
            return false;
        }

    }
    didCollideLeft(x,y,direction){
        let column=0;
        let row=0;
        let nextColumn=0;
        let nextRow=0;
        nextColumn=x-this.tileSize;
                column=nextColumn/this.tileSize
                row=y/this.tileSize;
                if(this.tileCollided(row,column,direction)){
                  
                    //console.log("collision in left")
                    return true;
                }
                else{
                   // console.log("no collision in left")
                    return false
                    
                }

    }
    didCollideRight(x,y,direction){
        let column=0;
        let row=0;
        let nextColumn=0;
        
        nextColumn=x+this.tileSize;
        column=nextColumn/this.tileSize
        row=y/this.tileSize;
        if(this.tileCollided(row,column,direction)){
            //console.log("collision in right")
            return true;
        }
        else{
          //  console.log(" no collision in right")
            return false;
            
        }

    }
    tileCollided(row,column){
        console.log(win)
        //console.log(row,column,direction);
        //console.log('inside tile collided')
        let intRow=Math.ceil(row)
        const tile= this.map[intRow][column];
        if (tile===1 ){
            //console.log("collison grass",tile)
            return true;
        }
        else if(tile===2){
            //console.log("collison dirt",tile)
            return true
        }
        else if(tile===0){
            //console.log("walk",tile)
           
        }
        else if (tile===4){
            //console.log('coin')
            this.scoreBoard(tile,intRow,column)
        }
        else if(tile===5){
            //console.log("fire")
            this.scoreBoard(tile,intRow,column)
        }
        else if (tile===6){
            const win = document.createElement("div");
            win.classList.add('win');
        }
    }
gameEnd(){
    let context=this.context;
    
    let text="you win"
context.fillStyle = "black";
context.fillRect(0, canvas.height / 3.2, canvas.width, 80);

context.font = "75px comic sans";
const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
gradient.addColorStop("0", "magenta");
gradient.addColorStop("0.5", "blue");
gradient.addColorStop("1.0", "red");

context.fillStyle = gradient;
context.fillText(text, 10, canvas.height / 2)
  }
    scoreBoard(tile,row,column){    
        if (tile === 4)
        {
            this.map[row][column]=0
            
        }
        else if(tile===5){
           
            console.log('in fire score')
           
        }
       
    }
   
}