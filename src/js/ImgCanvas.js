const RGBA_COUNT = 4;
class ImgCanvas {

  constructor(imgData) {
    if (!imgData) {
      return false;
    }
    this._imgData = imgData;
    this.height = imgData.height;
    this.width = imgData.width;
    this.imgMatrix = [];
  }

  init(background) {
    this.background = background ||  {r:0, g:0,b:0 ,a:0};
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
    for (let i = 0; i < this.height ; i++) {
      let lines = [];
      for (let j = 0; j < this.width * RGBA_COUNT; j = j + RGBA_COUNT) {
        lines.push(this.getPixelFromImgData(i, j));
      }
      this.imgMatrix.push(lines);
    }
  }

  setShadowPixel(linesIndex, columnsIndex, shadowOffset) {
    this.imgMatrix[linesIndex + shadowOffset][columnsIndex + shadowOffset].r = this.background.r -50;
    this.imgMatrix[linesIndex + shadowOffset][columnsIndex + shadowOffset].g = this.background.g -50;
    this.imgMatrix[linesIndex + shadowOffset][columnsIndex + shadowOffset].b = this.background.b -50;
    this.imgMatrix[linesIndex + shadowOffset][columnsIndex + shadowOffset].a = this.background.a;
  }

  getPixelFromImgData(linesIndex, columnsIndex) {
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
        //if (this.imgMatrix[i][j].isBackground !== true && this.imgMatrix[i][j].a !== 0) {
        if (this.imgMatrix[i][j].isBackground === false) {
        //if(this.imgMatrix[i][j].r == 255 && this.imgMatrix[i][j].g == 255 && this.imgMatrix[i][j].b == 255){
          for (let shadowOffset = 1; shadowOffset + i < this.imgMatrix.length && shadowOffset + j < this.imgMatrix.length; shadowOffset++) {
            if (this.imgMatrix[i + shadowOffset][j + shadowOffset].isBackground === true) {
              this.setShadowPixel(i, j, shadowOffset);
            }
          }
        }
      }
    }
  }

  halfMaterial() {
    for (let i = 0; i < this.imgMatrix.length; i++) {
      for (let j = this.imgMatrix[i].length / 2; j < this.imgMatrix[i].length; j++) {
        this.imgMatrix[i][j].g = this.imgMatrix[i][j].g - 20;
      }
    }
  }

  flagBackgroundPixels() {
    for (let i = 0; i < this.imgMatrix.length; i++) {
      for (let j = 0; j < this.imgMatrix[i].length; j++) {
        if(this.isPixelEqual(this.imgMatrix[i][j],this.background) === true) {
            this.imgMatrix[i][j].isBackground = true;
        }else if(this.imgMatrix[i][j].a === 255){
            this.imgMatrix[i][j].isBackground = false;
        }
      }
    }
  }

  isPixelEqual(pixel1,pixel2){
      return (
        pixel1.r == pixel2.r &&
        pixel1.g == pixel2.g &&
        pixel1.b == pixel2.b &&
        pixel1.a == pixel2.a
      );
  }
}
export default ImgCanvas;
