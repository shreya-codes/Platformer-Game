export default class TileMap{
    constructor(tileSize){
        this.tileSize=tileSize;
        this.wall=this.#image("grassnow.png")
        this.sky=this.#image("night.jpg")
        this.dirt=this.#image("dirtnow.png")
        this.character=this.#image("sailormoon.png")
        
    }
    #image(fileName){ //private method
        const img= new Image(); //create image object 
        img.src=`./${fileName}`; //giving a path 
        return img;
    }
    //1-wall
    //0-air
    map = [
        [0,0,0,0,,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
           [ 0,0,0,0,0,1,1,0,0,0,0,1,1,1,1,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,1,2,0,0,0,0,0,0],
            [1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1],
            
      ];1
    
    drawTile(canvas,context){
        this.#setCanvasSize(canvas);
        this.#clearCanvas(canvas,context);
        this.#drawMap(context);
    }
    #drawMap(context){
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
    #clearCanvas(canvas,context){
        context.fillStyle="black";
        context.fillRect(0,0,canvas.Width,canvas.Height)
    }
    #setCanvasSize(canvas){
        canvas.Height=this.map.length*this.tileSize;
        canvas.Width=this.map[0].length*this.tileSize;
        
    }

   
}