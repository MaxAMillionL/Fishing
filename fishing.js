var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var canvas = null;
var bounds = null;
var ctx = null;
var hasLoaded = false;

var startX = 0;
var startY = 0;
var mouseX = 0;
var mouseY = 0;
var isDrawing = false;
var isMoving = false;
var xdir = 0;
var ydir = 0;
var reelXDir = 0;
var reelYDir = 0;
var percentNotBite = .9;
var fishSpeed = 20;
var deckHeight = 150;
var lineTension = 0;
var reeling = false;
var startTime = 0;
var endTime = 0;
var tension = 3000;
let fishFunc = setInterval(fishing, 1000);
let moveFunc = setInterval(moveFish, 100);
clearInterval(fishFunc);
clearInterval(moveFunc);

function draw() {
   // clear canvas
   ctx.clearRect(0, 0, canvasWidth, canvasHeight);

   // Draw preview line
   if (isDrawing) {
      if(isMoving){
         ctx.strokeStyle = "red";
      }
      else{
         ctx.strokeStyle = "black";
      }
      
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(mouseX, mouseY);
      ctx.stroke();
   }
}

function onmousedown(e) {
   if (hasLoaded && e.button === 0) {
      const x = e.clientX;
      const y = e.clientY;
      if (!isDrawing && y < canvasHeight && y > canvasHeight - deckHeight) {
         startX = x;
         startY = y - canvasHeight + deckHeight;
         isDrawing = true;
         fishFunc = setInterval(fishing, 1000);
      } else {
         clear()
      }
      draw();
   }
}

function onmousemove(e) {
   if (hasLoaded) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (isDrawing) {
         draw();
         // console.log(y)
         // console.log(canvasHeight - deckHeight)
         if(mouseY > canvasHeight || mouseY < canvasHeight - deckHeight){
            isDrawing = false;
            clearInterval(fishFunc); // stop fishing if reeled in
   
            if (moveFunc) { 
               clearInterval(moveFunc); // stop moving fish
            }
            
            if (isMoving) {  // add score if the fish was moving  
               isMoving = false; 
            }
   
            isDrawing = false; // stop drawing if not cast
            draw();
         }
      }
      
   }
   
}

function moveFish() {
   startX += xdir;
   startY += ydir - fishSpeed * .5;
   isMoving = true;
   if (isDrawing) {
      draw();
   }
   var num = Math.random();
   var percentMove = percentNotBite;
   if(num > percentNotBite){
      xdir = (Math.random() - .5) * Math.floor(Math.random() * fishSpeed); // random x
      ydir = (Math.random() - .5) * Math.floor(Math.random() * fishSpeed); // random y
   }

}

function clear(){
   isDrawing = false;
   clearInterval(fishFunc); // stop fishing if reeled in

   if (moveFunc) { 
      clearInterval(moveFunc); // stop moving fish
   }
   
   if (isMoving) {  // add score if the fish was moving
      isMoving = false; 
   }

   isDrawing = false; // stop drawing if not cast
}

function reel() {
   var xvector = mouseX - startX;
   var yvector = mouseY - startY;
   magnitude = Math.sqrt(xvector * xvector + yvector * yvector);
   xvector /= magnitude;
   yvector /= magnitude;
   xvector *= 5;
   yvector *= 5;
   startX += xvector;
   startY += yvector;
   reeling = true;
   if(magnitude < 10 && isDrawing){
      if(isMoving){
         counter = parseInt(document.getElementById("fishNumber").textContent);
         document.getElementById("fishNumber").textContent = counter + 1;    
      }
      clear()
   }
   draw() // final draw to get rid of pesky lines
}

document.addEventListener('keydown', function(event) {
   if (event.key === 'e') {
      // console.log(endTime - startTime);
      // console.log("hello");
      if(!reeling){
         startTime = new Date().getTime();
      }
      if(reeling){
         endTime = new Date().getTime();
         if(endTime - startTime >= tension){
            clear();
            reeling = false;
         }
      }
      reel();
      
      
   }
 });

 document.addEventListener('keyup', function(event){
   if (event.key === 'e') {
      // console.log("hello");
      startTime = new Date().getTime();
      reeling = false;
   }
 });


function fishing() {
   var num = Math.random();
   if(num > percentNotBite && isDrawing){
      xdir = (Math.random() - .5) * Math.floor(Math.random() * fishSpeed); // random x
      ydir = (Math.random() - .5) * Math.floor(Math.random() * fishSpeed); // random y
      moveFunc = setInterval(moveFish, 100); // start moving the fish
      clearInterval(fishFunc);
   }
   
}

window.onload = function () {
   canvas = document.getElementById("canvas");
   canvas.width = canvasWidth;
   canvas.height = canvasHeight;
   canvas.onmousedown = onmousedown;
   canvas.onmousemove = onmousemove;

   ctx = canvas.getContext("2d");
   hasLoaded = true;

   draw();
};
