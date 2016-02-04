import ImgCanvas from './ImgCanvas';

let canvas = document.getElementById('canvas');
let outputCanvas = document.getElementById('canvasOutput');
let ctx = canvas.getContext('2d');

function draw() {
  ctx.drawImage(document.getElementById('source'), 0, 0);
}

window.onload = function() {
  draw();
  let height = 500;
  let width = 500;
  let imgData = ctx.getImageData(0, 0, height, width);
  let iconCanvas = new ImgCanvas(imgData);
  iconCanvas.init();
  iconCanvas.shadowfy();
  ctx.putImageData(iconCanvas.imgData, 0, 0);
};
