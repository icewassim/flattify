//import ImgCanvas from './ImgCanvas';
import CanvasController from './canvasController';

function initCanvas(canvas, img, margin, backgroundColor,shape) {
  'use strict';
  let ctx = canvas.getContext('2d');
  canvas.height = img.height + margin;
  canvas.width = img.width + margin;
  initBackground(canvas, img, backgroundColor, ctx, shape);
  ctx.drawImage(img, margin / 2, margin / 2);
  return ctx;
}

function initBackground(canvas, img, backgroundColor, ctx, shape) {
  'use strict';
  let centerX = canvas.width / 2,
    centerY = canvas.height / 2,
    radius = Math.max(img.height, img.width) - 90;

  ctx.beginPath();
  if (shape === "rect") {
    ctx.rect(0, 0, canvas.height, canvas.width, false);
  } else if (shape === "circle") {
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  }
  ctx.fillStyle = backgroundColor;
  ctx.fill();
}

window.onload = function() {
  'use strict';
  let img = document.getElementById("source"),
    canvas = document.getElementById('canvas'),
    width = parseInt(img.width),
    height = parseInt(img.height),
    imgData,
    iconCanvas,
    margin = 100,
    ctx;


  var canvasController = new CanvasController("canvas","source",100);
  canvasController.init();
  };
/*  
  document.getElementById("circular").onclick = function() {
    ctx = initCanvas(canvas, img, margin, 'rgba(0, 184, 255, 1)','circle');
    imgData = ctx.getImageData(0, 0, height + margin, width + margin);
    iconCanvas = new ImgCanvas(imgData);
    iconCanvas.init({
      r: 0,
      g: 184,
      b: 255,
      a: 255
    });
    iconCanvas.shadowfy();
    ctx.putImageData(iconCanvas.imgData, 0, 0);
  };

  document.getElementById('backgroundColor').onclick = function() {
    var color = document.getElementById("backgroundColorValue").value;
    var rgbaTab = color.replace("rgba(","").replace(")","").split(",");
    console.log(rgbaTab);

    ctx = initCanvas(canvas, img, margin, color,'circle');
    imgData = ctx.getImageData(0, 0, height + margin, width + margin);
    iconCanvas = new ImgCanvas(imgData);
    iconCanvas.init({
      r: rgbaTab[0],
      g: rgbaTab[1],
      b: rgbaTab[2],
      a: 255
    });
    iconCanvas.shadowfy();
    ctx.putImageData(iconCanvas.imgData, 0, 0);
  };

  document.getElementById("rect").onclick = function() {
    ctx = initCanvas(canvas, img, margin, 'rgba(0, 184, 255, 1)','rect');
    imgData = ctx.getImageData(0, 0, height + margin, width + margin);
    iconCanvas = new ImgCanvas(imgData);
    iconCanvas.init({
      r: 0,
      g: 184,
      b: 255,
      a: 255
    });
    iconCanvas.shadowfy();
    ctx.putImageData(iconCanvas.imgData, 0, 0);
  };

  ctx = initCanvas(canvas, img, margin, 'rgba(0, 184, 255, 1)','rect');
  imgData = ctx.getImageData(0, 0, height + margin, width + margin);
  iconCanvas = new ImgCanvas(imgData);
  iconCanvas.init({
    r: 0,
    g: 184,
    b: 255,
    a: 255
  });
  iconCanvas.shadowfy();
  ctx.putImageData(iconCanvas.imgData, 0, 0);
};
*/