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
      if (!isDrawing) {
         startX = x;
         startY = y;
         isDrawing = true;
         fishFunc = setInterval(fishing, 1000);
      } else {
         clearInterval(fishFunc); // Always clear fishFunc when drawing stops

         // Always clear moveFunc, regardless of isMoving
         if (moveFunc) { 
            clearInterval(moveFunc);
         }
         
         if (isMoving) {  // Keep the isMoving check, though it's less critical now.
         counter = parseInt(document.getElementById("fishNumber").textContent);
         document.getElementById("fishNumber").textContent = counter + 1;
         isMoving = false; 
         }

         isDrawing = false;
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
      }
   }
}

function moveFish() {

   startX += xdir
   startY += ydir
   console.log(startX);
   draw();
   isMoving = true;
}

// setInterval(moveFish, 1000);

function fishing() {
   console.log("fishing...");
   var num = Math.random();
   if(num > .8 && isDrawing){
      xdir = (Math.random() - .5) * Math.floor(Math.random() * 20);
      ydir = (Math.random() - .5) * Math.floor(Math.random() * 20);
      moveFunc = setInterval(moveFish, 100);
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
