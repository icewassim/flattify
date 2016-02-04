const RGBA = 4;
class ImgCanvas {

  constructor(imgData) {
    this._imgData = imgData;
    this.height = imgData.height;
    this.width = imgData.width;
    this.imgMatrix = [];
  }

  init() {
    this.imgDataToMatrix();
    this.markBackground();
  }

  get imgData() {
    return this._imgData;
  }

  imgDataToMatrix() {
    for (let i = 0; i < this.height; i++) {
      let lines = [];
      for (let j = 0; j < this.width * RGBA; j = j + RGBA) {
        let pixel = {};
        pixel.r = this._imgData.data[j + (i * this.width * RGBA)];
        pixel.g = this._imgData.data[j + 1 + (i * this.width * RGBA)];
        pixel.b = this._imgData.data[j + 2 + (i * this.width * RGBA)];
        pixel.a = this._imgData.data[j + 3 + (i * this.width * RGBA)];
        lines.push(pixel);
      }
      this.imgMatrix.push(lines);
    }
  }

  shadowfy() {
    for (let i = 0; i < this.imgMatrix.length; i++) {
      for (let j= 0; j < this.imgMatrix[i].length; j++) {
        if(this.imgMatrix[i][j].background !== true) {
          for (let decrease = 1; decrease + i < this.imgMatrix.length && decrease + j < this.imgMatrix.length ; decrease++) {
            if(this.imgMatrix[i+decrease][j+decrease].background === true) {
                this.imgMatrix[i + decrease][j+decrease].r = 0;
                this.imgMatrix[i + decrease][j+decrease].g = 0;
                this.imgMatrix[i + decrease][j+decrease].b = 0;
                this.imgMatrix[i + decrease][j+decrease].a = 70;
              }
            }
          }
        }
      }
  }

  halfMaterial() {
    for (let i = 0; i < imgMatrix.length; i++) {
      for (let j = imgMatrix[i].length/2; j < imgMatrix[i].length; j++) {
        imgMatrix[i][j].g  = imgMatrix[i][j].g - 20;
      }
    }
  }

  markBackground() {
    for (let i = 0; i < this.imgMatrix.length; i++) {
      for (let j = 0; j < this.imgMatrix[i].length; j++) {
        this.imgMatrix[i][j].background = (this.imgMatrix[i][j].a === 0);
      }
    }
  }

}
export default ImgCanvas;
