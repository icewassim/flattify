import ImgCanvas from './ImgCanvas';

function initCanvas(canvas, img, margin, backgroundColor) {
  let ctx = canvas.getContext('2d');

  canvas.height = img.height + margin;
  canvas.width = img.width + margin;
  circularCanvas(canvas, img, backgroundColor, ctx);
  ctx.drawImage(img, margin / 2, margin / 2);
  return ctx;
}

function circularCanvas(canvas, img, backgroundColor, ctx) {
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  var radius = Math.max(img.height, img.width) - 90;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = backgroundColor;
  ctx.fill();
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

  ctx = initCanvas(canvas, img, margin, 'rgba(0, 184, 255, 1)');
  imgData = ctx.getImageData(0, 0, height + margin, width + margin);
  iconCanvas = new ImgCanvas(imgData);
  iconCanvas.init({
    r: 0,
    g: 184,
    b: 255,
    a: 255
  });
  //iconCanvas.init();
  iconCanvas.shadowfy();
  ctx.putImageData(iconCanvas.imgData, 0, 0);
};
