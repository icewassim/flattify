import ImgCanvas from './ImgCanvas';

class canvasController {
  constructor(canvasId, iconId, margin, backgroundColor, shape) {
    let imgData;

    this.canvas = document.getElementById(canvasId);
    this.icon = document.getElementById(iconId);
    this.margin = margin;
    this.width = parseInt(img.width);
    this.height = parseInt(img.height);
    this.ctx = this.canvas.getContext("2d");
    imgData = this.ctx.getImageData(0, 0, this.height + this.margin, this.width + this.margin);
    this.iconCanvas = new ImgCanvas(imgData);
    this.backgroundColor = backgroundColor || {
      r: 0,
      g: 184,
      b: 255,
      a: 255
    }
    this.shape = shape || "rect";
  }

  init() {
    this.initBackground();
    this.iconCanvas.init(this.backgroundColor);
  }

  setBackground(shape) {
    this.shape = shape;
    this.reloadCanvas();
  }

  shadowfy() {
    this.iconCanvas.shadowfy();
  }
}

export default canvasController;
