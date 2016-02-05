import ImgCanvas from './ImgCanvas';

function initCanvas(canvas,img,margin) {
  let ctx = canvas.getContext('2d');

  canvas.height = img.height +margin;
  canvas.width = img.width +margin;
  ctx.drawImage(img, margin/2, margin/2);
  return ctx;
}

window.onload = function() {
  let img = document.getElementById("source"),
  	  canvas = document.getElementById('canvas'),
  	  width = parseInt(img.width),
  	  height = parseInt(img.height),
  	  imgData,
  	  iconCanvas,
  	  ctx;

  ctx = initCanvas(canvas ,img ,0);
  imgData = ctx.getImageData(0, 0, height, width);
  iconCanvas = new ImgCanvas(imgData);
  iconCanvas.init();
  iconCanvas.shadowfy();
  ctx.putImageData(iconCanvas.imgData, 0, 0);
};