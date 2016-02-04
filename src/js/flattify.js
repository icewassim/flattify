import ImgCanvas from './ImgCanvas';

let canvas = document.getElementById('canvas');
let outputCanvas = document.getElementById('canvasOutput');
let ctx = canvas.getContext('2d');

console.log("flattify");
function draw() {
  ctx.drawImage(document.getElementById('source'),0,0);
}
  
window.onload = function() {
    draw();
    let height = 500;
    let width = 500;
    let imgData = ctx.getImageData(0,0,height,width);
    let iconCanvas = new ImgCanvas(imgData);
    iconCanvas.init();
    iconCanvas.shadowfy();
    console.log(iconCanvas.imgData);
    ctx.putImageData(iconCanvas.imgData,0,0);
  //   //  var ImgCanvas = new ImgCanvas(ImgCanvas);

  //   var imgMatrixg = imgDataToMatrix(imgData,height,width);
  //   var shared = markBackground({r:0},{r:0},imgMatrixg);
  //   shared = shaderdMatrix( markBackground({r:200},{r:255},imgMatrixg,24) );
  //   //var halfShadowed = halfShadow(imgDataToMatrix(imgData,height,width));
  //   var newImageData = MatrixToImgData(shared,imgData);
  // /*
  //     0 -> 2000 (4 * width)
  //     2000 -> 4000 (4*with * 2)
  //     4000 -> 6000 (4*with * 3)
  // */
    console.log("hello3",imgData);
 };