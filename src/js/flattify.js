import ImgCanvas from './ImgCanvas';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
// Draw slice
function draw() {
  ctx.drawImage(document.getElementById('source'),0,0);
}

window.onload = function() {
      alert('hello');
      draw();
      var height = 500;
      var width = 500;
      var imgData = ctx.getImageData(0,0,height,width);
      let iconCanvas = new ImgCanvas();
}
