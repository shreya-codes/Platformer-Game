const context=document.getElementById("canvas").getContext("2d")//gets the canvas and specifies that we wll be working in 2d

let keysDown={}; //empty object which will hold the keys currently pressed.By storing current keys allows multiple keys to be pressed at onnce 
addEventListener("keydown",function(event){ //eventlistener for key press
   console.log(event.keyCode)
   keysDown[event.keyCode]=true;
});
addEventListener("keyup",function(event){
    console.log("a") 
    delete keysDown[event.keyCode]; //removes the entry of the released key from keysDown
})
function input(){
    if(37 in keysDown){ // 37 is keycode for leftarrow
        player.X -=3;
    }
    if(39 in keysDown){ //for right arrow
        player.X +=3
    }
    if(32 in keysDown || 38 in keysDown){//for spacebar
        player.Y -=3
    }
    if(40 in keysDown){ //for down arrow
        player.Y +=3
    }
}


//object with attributes of player
const player={
    X:10,
    Y:canvas.height-32,
    width:32,
    height:32,
    speed:3,
    mass:64,
    yke:0 , //kinetic energy in y axis
    gpe:0 //gravitational potential energy
}
function draw(){
context.clearRect(0,0,canvas.width,canvas.height);
context.fillStyle="#FF0000"; //specify the color to fill the next object drawn
context.fillRect(player.X,player.Y,player.width,player.height)//draws and fills therectangle at the same time
}
function calcGPE(obj){
    let m=obj.mass;
    let g=9.8/1000000 //dividing by million so that it scales correctly
    let h=((canvas.height-obj.height)-(obj.Y/32))
    let GPE= m*g*h;
    // console.log(`gpe ${GPE}`)
    return GPE;
}
function gravity(obj){
    obj.Y-=obj.yke;
    obj.yke-=obj.gpe;
    obj.gpe=calcGPE(obj);
}
function main (){ //function to udate and draw new things fast
    draw();
    requestAnimationFrame(main);//allows HTML to render what is drawn and then calls the main function againThe requestAnimationFrame() method tells the browser to run a callback function right before the next repaint happens.   
    input();
    gravity(player);
}

window.onload=function(){
    main();
}