const RGBA = 4;
class ImgCanvas {

  constructor(imgData) {
    this.imgData = imgData;
    this.height = imgData.height;
    this.width = imgData.width;
  }

  init() {
    imgDataToMatrix();
    markBackground();
  }

  imgDataToMatrix() {
    for (let i = 0; i < this.height; i++) {
      let lines = [];
      for (let j = 0; j < this.width * RGBA; j = j + RGBA) {
        let pixel = {};
        pixel.r = imgData.data[j + (i * this.width * RGBA)];
        pixel.g = imgData.data[j + 1 + (i * this.width * RGBA)];
        pixel.b = imgData.data[j + 2 + (i * this.width * RGBA)];
        pixel.a = imgData.data[j + 3 + (i * this.width * RGBA)];
        lines.push(pixel);
      }
      imgMatrix.push(lines);
    }
  }

  markBackground() {
    for (let i = 0; i < this.imgMatrixg.length; i++) {
      for (let j = 0; j < this.imgMatrixg[i].length; j++) {
        this.imgMatrixg[i][j].background = (this.imgMatrixg[i][j].a === 0);
      }
    }
  }

}
export default ImgCanvas;
