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

function draw() {
   // clear canvas
   ctx.clearRect(0, 0, canvasWidth, canvasHeight);

   // Draw preview line
   if (isDrawing) {
      ctx.strokeStyle = "black";
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
      } else {
         counter = document.getElementById("fishNumber").textContent;
         document.getElementById("fishNumber").textContent = counter + 1;
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
