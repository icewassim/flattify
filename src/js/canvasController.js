import ImgCanvas from './ImgCanvas';

class canvasController {
  constructor(canvasId, iconId, options) {
    this.canvas = document.getElementById(canvasId);
    this.icon = document.getElementById(iconId);

    //default options
    this.options = {
      margin: Math.max(this.icon.height,this.icon.width)/2,
      backgroundColor: {
        r: 0,
        g: 184,
        b: 255,
        a: 255
      },
      selectedColor :null,
      shape: "circle",
      radius: null,
      shadow: 1
    };

    if (typeof(options) === "object") {
      for (let i in options) {
        if (options.hasOwnProperty(i))
          this.options[i] = options[i];
      }
    }
  }

  init() {
    let imgData;

    this.width = parseInt(this.icon.width) + this.options.margin;
    this.height = parseInt(this.icon.height) + this.options.margin;
    this.ctx = this.canvas.getContext("2d");
    this.canvas.height = this.icon.height + this.options.margin;
    this.canvas.width = this.icon.width + this.options.margin;
    this.initBackground();
    this.ctx.drawImage(this.icon, this.options.margin / 2, this.options.margin / 2);
    imgData = this.ctx.getImageData(0, 0, this.height + this.options.margin, this.width + this.options.margin);
    this.iconCanvas = new ImgCanvas(imgData);
    this.iconCanvas.init(this.options.backgroundColor);
    switch (this.options.shadow) {
      case 1:
        this.iconCanvas.shadowfy();
        break;
      case 2:
          this.iconCanvas.halfMaterial(this.options.margin);
          break;
      case 0:
          break;
      default:
    }
    this.ctx.putImageData(this.iconCanvas.imgData, 0, 0);
  }

  initBackground() {
    let centerX = this.canvas.width / 2,
      centerY = this.canvas.height / 2,
      cornerRadius = 20,
      radius = this.options.radius || Math.max(this.icon.height, this.icon.width) - this.icon.height/4,
      colorStyleStr = "rgba(" +
      this.options.backgroundColor.r + "," +
      this.options.backgroundColor.g + "," +
      this.options.backgroundColor.b + "," +
      "1)";

    this.ctx.fillStyle = colorStyleStr;
    this.ctx.strokeStyle = colorStyleStr;
    this.ctx.beginPath();
    if (this.options.shape === "rect") {
      console.log(this.options.margin);
      this.ctx.rect(0, 0, this.canvas.height + this.options.margin, this.canvas.width +this.options.margin, false);
    } else if (this.options.shape === "round-rect") {
      this.ctx.lineJoin = "round";
      this.ctx.lineWidth = cornerRadius;
      this.ctx.strokeRect(0 + (cornerRadius / 2), 0 + (cornerRadius / 2), this.canvas.width - cornerRadius, this.canvas.height - cornerRadius);
      this.ctx.fillRect(0 + (cornerRadius / 2), 0 + (cornerRadius / 2), this.canvas.width - cornerRadius, this.canvas.height - cornerRadius);
    } else if (this.options.shape === "circle") {
      this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    } else if (this.options.shape === "hexagone") {
      this.drawPolygone(6, centerX, centerY, radius);
    }
    this.ctx.fill();
  }

  setMargin(margin) {
      this.options.radius = margin - this.icon.height/4;
      this.options.margin = margin;
  }

  getRadius() {
    return this.options.radius ||  Math.max(this.icon.height, this.icon.width) - this.icon.height/4;
  }

  setRadius(radius) {
    this.options.radius = radius;
  }
  setBackgroundShape(shape) {
    if (typeof(shape) === "string" && shape.length > 0)
      this.options.shape = shape;
  }

  setBackgroundColor(color) {
    let pixel = this.hexToRgb(color);

    if (this.isValidPixel(pixel) === false) {
      console.error("invalid color");
      return false;
    }
    this.options.backgroundColor = pixel;
  }

  reloadCanvas(reloadBackground) {
    let imgData,
        mouseXOffset = 0,
        mouseYOffset = 0;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.height = this.icon.height + this.options.margin;
    this.canvas.width = this.icon.width + this.options.margin;
    this.initBackground();
    this.ctx.drawImage(this.icon, this.options.margin / 2 + mouseXOffset, this.options.margin / 2 + mouseYOffset);
      imgData = this.ctx.getImageData(0, 0, this.height + this.options.margin , this.width + this.options.margin);
    if(reloadBackground === true) {
      this.iconCanvas = new ImgCanvas(imgData);
    }
    this.iconCanvas.init(this.options.backgroundColor);
    switch (this.options.shadow) {
      case 1:
        this.iconCanvas.shadowfy();
        break;
      case 2:
          this.iconCanvas.halfMaterial(this.options.margin);
          break;
      case 0:
          break;
      default:
    }
    this.ctx.putImageData(this.iconCanvas.imgData, 0, 0);
  }

  hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
      a: 255
    } : null;
  }

  rgbaToPixel(rgbaColor) {
    let rgbaTab = rgbaColor.replace("rgba(", "").replace(")", "").split(",");
    return {
      r: parseInt(rgbaTab[0]),
      g: parseInt(rgbaTab[1]),
      b: parseInt(rgbaTab[2]),
      a: 255
    };
  }

  isValidPixel(pixel) {
    let count = 0;
    if (typeof(pixel) !== "object")
      return false;

    for (let i in pixel) {
      count++;
      if (typeof(pixel[i]) !== "number" || pixel[i] > 255 || pixel[i] < 0)
        return false;
    }

    if (count != 4)
      return false;

    return true;

  }

  selectColor(color) {
    if(this.isValidPixel(color) === false ) {
      console.error("Invalid color !! ",c);
      return false;
    }
    this.options.selectedColor = color;
  }

 reloadColors(color) {
   let pixel = this.hexToRgb(color);

   if (this.isValidPixel(pixel) === false) {
     console.error("invalid color");
     return false;
   }
   this.iconCanvas.reloadColors(this.options.selectedColor,pixel);
 }

  drawPolygone(numberOfSides, centerX, centerY, radius) {
    this.ctx.beginPath();
    this.ctx.moveTo(centerX + radius * Math.cos(0), centerY + radius * Math.sin(0));
    for (var i = 1; i <= numberOfSides; i += 1) {
      this.ctx.lineTo(centerX + radius * Math.cos(i * 2 * Math.PI / numberOfSides), centerY + radius * Math.sin(i * 2 * Math.PI / numberOfSides));
    }
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
  }

  setShadow(shadowType) {
    this.options.shadow = shadowType;
  }

  toDataURL() {
    return this.canvas.toDataURL('image/png');
  }
}

export default canvasController;
