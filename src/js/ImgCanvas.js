const RGBA_COUNT = 4;
class ImgCanvas {

  constructor(imgData) {
    this._imgData = imgData;
    this.height = imgData.height;
    this.width = imgData.width;
    this.imgMatrix = [];
  }

  init() {
    this.imgDataToMatrix();
    this.flagBackgroundPixels();
  }

  get imgData() {
    this.matrixToImgData();
    return this._imgData;
  }

  matrixToImgData() {
    let RGBIndex = 0;
    for (let i = 0; i < this.imgMatrix.length; i++) {
      for (let j = 0; j < this.imgMatrix[i].length; j++) {
        this._imgData.data[RGBIndex] = this.imgMatrix[i][j].r;
        this._imgData.data[RGBIndex + 1] = this.imgMatrix[i][j].g;
        this._imgData.data[RGBIndex + 2] = this.imgMatrix[i][j].b;
        this._imgData.data[RGBIndex + 3] = this.imgMatrix[i][j].a;
        RGBIndex = RGBIndex + RGBA_COUNT;
      }
    }
  }

  imgDataToMatrix() {
    for (let i = 0; i < this.height; i++) {
      let lines = [];
      for (let j = 0; j < this.width * RGBA_COUNT; j = j + RGBA_COUNT) {
        lines.push(this.getPixelFromImgData(i,j));
      }
      this.imgMatrix.push(lines);
    }
  }

  setShadowPixel(linesIndex, columnsIndex,shadowOffset, r, g, b, a) {
    this.imgMatrix[linesIndex + shadowOffset][columnsIndex + shadowOffset].r = r;
    this.imgMatrix[linesIndex + shadowOffset][columnsIndex + shadowOffset].g = g;
    this.imgMatrix[linesIndex + shadowOffset][columnsIndex + shadowOffset].b = b;
    this.imgMatrix[linesIndex + shadowOffset][columnsIndex + shadowOffset].a = a;
  }

  getPixelFromImgData(linesIndex,columnsIndex) {
    let pixel = {};
    pixel.r = this._imgData.data[columnsIndex + (linesIndex * this.width * RGBA_COUNT)];
    pixel.g = this._imgData.data[columnsIndex + 1 + (linesIndex * this.width * RGBA_COUNT)];
    pixel.b = this._imgData.data[columnsIndex + 2 + (linesIndex * this.width * RGBA_COUNT)];
    pixel.a = this._imgData.data[columnsIndex + 3 + (linesIndex * this.width * RGBA_COUNT)];
    return pixel;
  }

  shadowfy() {
    for (let i = 0; i < this.imgMatrix.length; i++) {
      for (let j = 0; j < this.imgMatrix[i].length; j++) {
        if (this.imgMatrix[i][j].background !== true) {
          for (let shadowOffset = 1; shadowOffset + i < this.imgMatrix.length && shadowOffset + j < this.imgMatrix.length; shadowOffset++) {
            if (this.imgMatrix[i + shadowOffset][j + shadowOffset].background === true) {
              this.setShadowPixel(i ,j ,shadowOffset , 0, 0, 0, 70);
            }
          }
        }
      }
    }
  }

  halfMaterial() {
    for (let i = 0; i < imgMatrix.length; i++) {
      for (let j = imgMatrix[i].length / 2; j < imgMatrix[i].length; j++) {
        imgMatrix[i][j].g = imgMatrix[i][j].g - 20;
      }
    }
  }

  flagBackgroundPixels() {
    for (let i = 0; i < this.imgMatrix.length; i++) {
      for (let j = 0; j < this.imgMatrix[i].length; j++) {
        this.imgMatrix[i][j].background = (this.imgMatrix[i][j].a === 0);
      }
    }
  }

}
export default ImgCanvas;
