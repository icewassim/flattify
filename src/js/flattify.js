import ImgCanvas from './ImgCanvas';

function initCanvas(canvas, img, margin) {
  let ctx = canvas.getContext('2d');

  canvas.height = img.height + margin;
  canvas.width = img.width + margin;
  ctx.drawImage(img, margin / 2, margin / 2);
  return ctx;
}

window.onload = function() {
  let img = document.getElementById("source"),
    canvas = document.getElementById('canvas'),
    width = parseInt(img.width),
    height = parseInt(img.height),
    imgData,
    iconCanvas,
    margin = 100,
    ctx;

  ctx = initCanvas(canvas, img, margin);
  imgData = ctx.getImageData(0, 0, height+margin, width+margin);
  iconCanvas = new ImgCanvas(imgData);
  iconCanvas.init();
  iconCanvas.shadowfy();
  ctx.putImageData(iconCanvas.imgData, 0, 0);
};
