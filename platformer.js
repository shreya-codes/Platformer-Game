import TileMap from "./tileMap.js";
import Character from "./Character.js";
const canvas= document.getElementById("canvas");
const context=canvas.getContext("2d")//gets the canvas and specifies that we wll be working in 2d
const tileSize =64;
const velocity=10;
const gravity=0.005;
const gravitySpeed=0;
const gravityHeight=0;
const tileMap= new TileMap(tileSize);
const character=tileMap.getCharacter(velocity, gravity,gravitySpeed,gravityHeight);

function main (){ //function to udate and draw new things fast
    
    tileMap.drawTile(canvas,context);
    character.drawCharacter(context);
   character.enableGravity();
    requestAnimationFrame(main);//allows HTML to render what is drawn and then calls the main function againThe requestAnimationFrame() method tells the browser to run a callback function right before the next repaint happens.   
    
    
}

window.onload=function(){    
    main();
}