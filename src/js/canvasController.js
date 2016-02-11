import ImgCanvas from './ImgCanvas';

class canvasController {
  constructor(canvasId, iconId,options) {
    this.canvas = document.getElementById(canvasId);
    this.icon = document.getElementById(iconId);
    //default options

    this.options = {
      margin : 100,
      backgroundColor : {
              r: 0,
              g: 184,
              b: 255,
              a: 255
      },
      shape : "rect"
    };

    if(typeof(options) === "object") {
      for(let i in options) {
        if(options.hasOwnProperty(i))
          this.options[i] = options[i];
      }
    }
  }

  init() {
    let imgData;
    console.log(this.options)
    this.width = parseInt(this.icon.width);
    this.height = parseInt(this.icon.height);
    this.ctx = this.canvas.getContext("2d");
    imgData = this.ctx.getImageData(0, 0, this.height + this.options.margin, this.width + this.options.margin);
    this.iconCanvas = new ImgCanvas(imgData);
    //this.initBackground();
    //this.iconCanvas.init(this.options.backgroundColor);
    //this.iconCanvas.shadowfy();
    this.iconCanvas.init({
      r: 0,
      g: 184,
      b: 255,
      a: 255
    });
    console.log(this.iconCanvas.imgData);
    this.ctx.putImageData(this.iconCanvas.imgData, 0, 0);
  }

  initBackground() {
    let centerX = this.canvas.width / 2,
        centerY = this.canvas.height / 2,
        radius = Math.max(this.icon.height, this.icon.width) - 90;

    this.ctx.beginPath();
    if (this.shape === "rect") {
      this.ctx.rect(0, 0, this.canvas.height, this.canvas.width, false);
    } else if (this.shape === "circle") {
      this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    }

    this.ctx.fillStyle = 'rgba(0, 184, 255, 1)';
    /*this.ctx.fillStyle = "rgba("+this.options.backgroundColor.r+","+
                                  this.options.backgroundColor.g+","+
                                  this.options.backgroundColor.b+","+
                                  "1,);";*/
    this.ctx.fill();
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
