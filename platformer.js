const canvas=document.getElementById("canvas").getContext("2d")//gets the canvas and specifies that we wll be working in 2d

let keysDown={}; //empty object which will hold the keys currently pressed.By storing current keys allows multiple keys to be pressed at onnce 
addEventListener("keydown",function(event){ //eventlistener for key press
    keysDown[event.keyCode]=true;
});
addEventListener("keyup",function(event){
    delete keysDown[event.keyCode]; //removes the entry of the released key from keysDown
})



//object with attributes of player
const player={
    X:0,
    Y:546,
    width:32,
    height:32
}
function draw(){
canvas.fillStyle="#FF0000"; //specify the color to fill the next object drawn
canvas.fillRect(player.X,player.Y,player.width,player.height)//draws and fills therectangle at the same time
}
function main (){ //function to udate and draw new things fast
    draw();
    requestAnimationFrame(main);//allows HTML to render what is drawn and then calls the main function againThe requestAnimationFrame() method tells the browser to run a callback function right before the next repaint happens.   
}
window.onload=function(){
    main();
}