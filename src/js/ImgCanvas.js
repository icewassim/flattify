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
    this.background = background || {
      r: 0,
      g: 0,
      b: 0,
      a: 0
    };
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
        lines.push(this.getPixelFromImgData(i, j));
      }
      this.imgMatrix.push(lines);
    }
  }

  setShadowPixelRight(linesIndex, columnsIndex, shadowOffset, shadowColor) {
    this.imgMatrix[linesIndex + shadowOffset][columnsIndex + shadowOffset].r = shadowColor.r !== null? shadowColor.r : this.background.r - 50;
    this.imgMatrix[linesIndex + shadowOffset][columnsIndex + shadowOffset].g = shadowColor.g !== null? shadowColor.g : this.background.g - 50;
    this.imgMatrix[linesIndex + shadowOffset][columnsIndex + shadowOffset].b = shadowColor.b !== null? shadowColor.b : this.background.b - 50;
    this.imgMatrix[linesIndex + shadowOffset][columnsIndex + shadowOffset].a = shadowColor.a !== null? shadowColor.a : this.background.a;
  }

  setShadowPixelLeft(linesIndex, columnsIndex, shadowOffset, shadowColor) {
    this.imgMatrix[linesIndex + shadowOffset][columnsIndex - shadowOffset].r = shadowColor.r !== null? shadowColor.r : this.background.r - 50;
    this.imgMatrix[linesIndex + shadowOffset][columnsIndex - shadowOffset].g = shadowColor.g !== null? shadowColor.g : this.background.g - 50;
    this.imgMatrix[linesIndex + shadowOffset][columnsIndex - shadowOffset].b = shadowColor.b !== null? shadowColor.b : this.background.b - 50;
    this.imgMatrix[linesIndex + shadowOffset][columnsIndex - shadowOffset].a = shadowColor.a !== null? shadowColor.a : this.background.a;
  }

  getPixelFromImgData(linesIndex, columnsIndex) {
    let pixel = {};
    pixel.r = this._imgData.data[columnsIndex + (linesIndex * this.width * RGBA_COUNT)];
    pixel.g = this._imgData.data[columnsIndex + 1 + (linesIndex * this.width * RGBA_COUNT)];
    pixel.b = this._imgData.data[columnsIndex + 2 + (linesIndex * this.width * RGBA_COUNT)];
    pixel.a = this._imgData.data[columnsIndex + 3 + (linesIndex * this.width * RGBA_COUNT)];
    return pixel;
  }

  shadowfyRight(shadowColor) {
    for (let i = 0; i < this.imgMatrix.length; i++) {
      for (let j = 0; j < this.imgMatrix[i].length; j++) {
        //if (this.imgMatrix[i][j].isBackground !== true && this.imgMatrix[i][j].a !== 0) {
        if (this.imgMatrix[i][j].isBackground === false) {
          //if(this.imgMatrix[i][j].r == 255 && this.imgMatrix[i][j].g == 255 && this.imgMatrix[i][j].b == 255){
          for (let shadowOffset = 1; shadowOffset + i < this.imgMatrix.length && shadowOffset + j < this.imgMatrix[i + shadowOffset].length; shadowOffset++) {
            if (this.imgMatrix[i + shadowOffset][j + shadowOffset].isBackground === true) {
              this.setShadowPixelRight(i, j, shadowOffset,shadowColor);
            }
          }
        }
      }
    }
  }

  shadowfyLeft(shadowColor) {
    for (let i =  this.imgMatrix.length -1; i > 0; i--) {
      for (let j =  this.imgMatrix.length -1; j > 0; j--) {
        //if (this.imgMatrix[i][j].isBackground !== true && this.imgMatrix[i][j].a !== 0) {
        if (this.imgMatrix[i][j].isBackground === false) {
          //if(this.imgMatrix[i][j].r == 255 && this.imgMatrix[i][j].g == 255 && this.imgMatrix[i][j].b == 255){
          for (let shadowOffset = 1;j - shadowOffset>0 && shadowOffset + i < this.imgMatrix.length && shadowOffset + j < this.imgMatrix[i + shadowOffset].length; shadowOffset++) {
            if (this.imgMatrix[i + shadowOffset][j - shadowOffset].isBackground === true) {
              this.setShadowPixelLeft(i, j, shadowOffset,shadowColor);
            }
          }
        }
      }
    }
  }

  halfMaterial(margin) {
    var contrast = -20;
    var factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

    for (let i = 0; i < this.imgMatrix.length ; i++) {
      for (let j = this.width /2  - margin/2; j < this.imgMatrix[i].length; j++) {
        this.imgMatrix[i][j].r = factor * (this.imgMatrix[i][j].r - 128) + 128;
        this.imgMatrix[i][j].g = factor * (this.imgMatrix[i][j].g - 128) + 128;
        this.imgMatrix[i][j].b = factor * (this.imgMatrix[i][j].b - 128) + 128;
      }
    }
  }

  flagBackgroundPixels() {
    for (let i = 0; i < this.imgMatrix.length; i++) {
      for (let j = 0; j < this.imgMatrix[i].length; j++) {
        if (this.isPixelEqual(this.imgMatrix[i][j], this.background) === true) {
          this.imgMatrix[i][j].isBackground = true;
        } else if (this.imgMatrix[i][j].a === 255) {
          this.imgMatrix[i][j].isBackground = false;
        }
      }
    }
  }

  reloadColors(selectedPixel, newPixel) {
    console.log(selectedPixel);
    console.log(newPixel);
    for (let i = 0; i < this.imgMatrix.length; i++) {
      for (let j = 0; j < this.imgMatrix[i].length; j++) {
        if (this.isAlmostEqual(this.imgMatrix[i][j],selectedPixel,10)) {
          this.imgMatrix[i][j].r = newPixel.r;
          this.imgMatrix[i][j].g = newPixel.g;
          this.imgMatrix[i][j].b = newPixel.b;
          this.imgMatrix[i][j].a = newPixel.a;
        }
      }
    }
  }

  isAlmostEqual(pixel1, pixel2, tolerance) {
    if (Math.abs(pixel1.r - pixel2.r) < tolerance &&
      Math.abs(pixel1.g - pixel2.g) < tolerance &&
      Math.abs(pixel1.b - pixel2.b) < tolerance) {
      return true;
    }
    return false;
  }

  isPixelEqual(pixel1, pixel2) {
    return (
      pixel1.r == pixel2.r &&
      pixel1.g == pixel2.g &&
      pixel1.b == pixel2.b &&
      pixel1.a == pixel2.a
    );
  }
}
export default ImgCanvas;
