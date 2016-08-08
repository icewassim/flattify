(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RGBA_COUNT = 4;

var ImgCanvas = function () {
  function ImgCanvas(imgData) {
    _classCallCheck(this, ImgCanvas);

    if (!imgData) {
      return false;
    }
    this._imgData = imgData;
    this.height = imgData.height;
    this.width = imgData.width;
    this.imgMatrix = [];
  }

  _createClass(ImgCanvas, [{
    key: "init",
    value: function init(background) {
      this.background = background || {
        r: 0,
        g: 0,
        b: 0,
        a: 0
      };
      this.imgDataToMatrix();
      this.flagBackgroundPixels();
    }
  }, {
    key: "matrixToImgData",
    value: function matrixToImgData() {
      var RGBIndex = 0;
      for (var i = 0; i < this.imgMatrix.length; i++) {
        for (var j = 0; j < this.imgMatrix[i].length; j++) {
          this._imgData.data[RGBIndex] = this.imgMatrix[i][j].r;
          this._imgData.data[RGBIndex + 1] = this.imgMatrix[i][j].g;
          this._imgData.data[RGBIndex + 2] = this.imgMatrix[i][j].b;
          this._imgData.data[RGBIndex + 3] = this.imgMatrix[i][j].a;
          RGBIndex = RGBIndex + RGBA_COUNT;
        }
      }
    }
  }, {
    key: "imgDataToMatrix",
    value: function imgDataToMatrix() {
      for (var i = 0; i < this.height; i++) {
        var lines = [];
        for (var j = 0; j < this.width * RGBA_COUNT; j = j + RGBA_COUNT) {
          lines.push(this.getPixelFromImgData(i, j));
        }
        this.imgMatrix.push(lines);
      }
    }
  }, {
    key: "setShadowPixelRight",
    value: function setShadowPixelRight(linesIndex, columnsIndex, shadowOffset, shadowColor) {
      this.imgMatrix[linesIndex + shadowOffset][columnsIndex + shadowOffset].r = shadowColor.r !== null ? shadowColor.r : this.background.r - 50;
      this.imgMatrix[linesIndex + shadowOffset][columnsIndex + shadowOffset].g = shadowColor.g !== null ? shadowColor.g : this.background.g - 50;
      this.imgMatrix[linesIndex + shadowOffset][columnsIndex + shadowOffset].b = shadowColor.b !== null ? shadowColor.b : this.background.b - 50;
      this.imgMatrix[linesIndex + shadowOffset][columnsIndex + shadowOffset].a = shadowColor.a !== null ? shadowColor.a : this.background.a;
    }
  }, {
    key: "setShadowPixelLeft",
    value: function setShadowPixelLeft(linesIndex, columnsIndex, shadowOffset, shadowColor) {
      this.imgMatrix[linesIndex + shadowOffset][columnsIndex - shadowOffset].r = shadowColor.r !== null ? shadowColor.r : this.background.r - 50;
      this.imgMatrix[linesIndex + shadowOffset][columnsIndex - shadowOffset].g = shadowColor.g !== null ? shadowColor.g : this.background.g - 50;
      this.imgMatrix[linesIndex + shadowOffset][columnsIndex - shadowOffset].b = shadowColor.b !== null ? shadowColor.b : this.background.b - 50;
      this.imgMatrix[linesIndex + shadowOffset][columnsIndex - shadowOffset].a = shadowColor.a !== null ? shadowColor.a : this.background.a;
    }
  }, {
    key: "getPixelFromImgData",
    value: function getPixelFromImgData(linesIndex, columnsIndex) {
      var pixel = {};
      pixel.r = this._imgData.data[columnsIndex + linesIndex * this.width * RGBA_COUNT];
      pixel.g = this._imgData.data[columnsIndex + 1 + linesIndex * this.width * RGBA_COUNT];
      pixel.b = this._imgData.data[columnsIndex + 2 + linesIndex * this.width * RGBA_COUNT];
      pixel.a = this._imgData.data[columnsIndex + 3 + linesIndex * this.width * RGBA_COUNT];
      return pixel;
    }
  }, {
    key: "shadowfyRight",
    value: function shadowfyRight(shadowColor) {
      for (var i = 0; i < this.imgMatrix.length; i++) {
        for (var j = 0; j < this.imgMatrix[i].length; j++) {
          //if (this.imgMatrix[i][j].isBackground !== true && this.imgMatrix[i][j].a !== 0) {
          if (this.imgMatrix[i][j].isBackground === false) {
            //if(this.imgMatrix[i][j].r == 255 && this.imgMatrix[i][j].g == 255 && this.imgMatrix[i][j].b == 255){
            for (var shadowOffset = 1; shadowOffset + i < this.imgMatrix.length && shadowOffset + j < this.imgMatrix[i + shadowOffset].length; shadowOffset++) {
              if (this.imgMatrix[i + shadowOffset][j + shadowOffset].isBackground === true) {
                this.setShadowPixelRight(i, j, shadowOffset, shadowColor);
              }
            }
          }
        }
      }
    }
  }, {
    key: "shadowfyLeft",
    value: function shadowfyLeft(shadowColor) {
      for (var i = this.imgMatrix.length - 1; i > 0; i--) {
        for (var j = this.imgMatrix.length - 1; j > 0; j--) {
          //if (this.imgMatrix[i][j].isBackground !== true && this.imgMatrix[i][j].a !== 0) {
          if (this.imgMatrix[i][j].isBackground === false) {
            //if(this.imgMatrix[i][j].r == 255 && this.imgMatrix[i][j].g == 255 && this.imgMatrix[i][j].b == 255){
            for (var shadowOffset = 1; j - shadowOffset > 0 && shadowOffset + i < this.imgMatrix.length && shadowOffset + j < this.imgMatrix[i + shadowOffset].length; shadowOffset++) {
              if (this.imgMatrix[i + shadowOffset][j - shadowOffset].isBackground === true) {
                this.setShadowPixelLeft(i, j, shadowOffset, shadowColor);
              }
            }
          }
        }
      }
    }
  }, {
    key: "halfMaterial",
    value: function halfMaterial(margin) {
      var contrast = -20;
      var factor = 259 * (contrast + 255) / (255 * (259 - contrast));

      for (var i = 0; i < this.imgMatrix.length; i++) {
        for (var j = this.width / 2 - margin / 2; j < this.imgMatrix[i].length; j++) {
          this.imgMatrix[i][j].r = factor * (this.imgMatrix[i][j].r - 128) + 128;
          this.imgMatrix[i][j].g = factor * (this.imgMatrix[i][j].g - 128) + 128;
          this.imgMatrix[i][j].b = factor * (this.imgMatrix[i][j].b - 128) + 128;
        }
      }
    }
  }, {
    key: "flagBackgroundPixels",
    value: function flagBackgroundPixels() {
      for (var i = 0; i < this.imgMatrix.length; i++) {
        for (var j = 0; j < this.imgMatrix[i].length; j++) {
          if (this.isPixelEqual(this.imgMatrix[i][j], this.background) === true) {
            this.imgMatrix[i][j].isBackground = true;
          } else if (this.imgMatrix[i][j].a === 255) {
            this.imgMatrix[i][j].isBackground = false;
          }
        }
      }
    }
  }, {
    key: "reloadColors",
    value: function reloadColors(selectedPixel, newPixel) {
      console.log(selectedPixel);
      console.log(newPixel);
      for (var i = 0; i < this.imgMatrix.length; i++) {
        for (var j = 0; j < this.imgMatrix[i].length; j++) {
          if (this.isAlmostEqual(this.imgMatrix[i][j], selectedPixel, 10)) {
            this.imgMatrix[i][j].r = newPixel.r;
            this.imgMatrix[i][j].g = newPixel.g;
            this.imgMatrix[i][j].b = newPixel.b;
            this.imgMatrix[i][j].a = newPixel.a;
          }
        }
      }
    }
  }, {
    key: "isAlmostEqual",
    value: function isAlmostEqual(pixel1, pixel2, tolerance) {
      if (Math.abs(pixel1.r - pixel2.r) < tolerance && Math.abs(pixel1.g - pixel2.g) < tolerance && Math.abs(pixel1.b - pixel2.b) < tolerance) {
        return true;
      }
      return false;
    }
  }, {
    key: "isPixelEqual",
    value: function isPixelEqual(pixel1, pixel2) {
      return pixel1.r == pixel2.r && pixel1.g == pixel2.g && pixel1.b == pixel2.b && pixel1.a == pixel2.a;
    }
  }, {
    key: "imgData",
    get: function get() {
      this.matrixToImgData();
      return this._imgData;
    }
  }]);

  return ImgCanvas;
}();

exports.default = ImgCanvas;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ImgCanvas = require("./ImgCanvas");

var _ImgCanvas2 = _interopRequireDefault(_ImgCanvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvasController = function () {
  function canvasController(canvasId, iconId, options) {
    _classCallCheck(this, canvasController);

    this.canvas = document.getElementById(canvasId);
    this.icon = document.getElementById(iconId);

    //default options
    this.options = {
      margin: Math.max(this.icon.height, this.icon.width) / 2,
      backgroundColor: {
        r: 0,
        g: 184,
        b: 255,
        a: 255
      },
      shadowColor: {
        r: null,
        g: null,
        b: null,
        a: null
      },
      fontAwesome: null,
      selectedColor: null,
      shape: "circle",
      radius: null,
      mouseXOffset: 0,
      mouseYOffset: 0,
      shadow: 1
    };

    if ((typeof options === "undefined" ? "undefined" : _typeof(options)) === "object") {
      for (var i in options) {
        if (options.hasOwnProperty(i)) this.options[i] = options[i];
      }
    }
  }

  _createClass(canvasController, [{
    key: "init",
    value: function init() {
      var imgData = void 0;

      this.width = parseInt(this.icon.width) + this.options.margin;
      this.height = parseInt(this.icon.height) + this.options.margin;
      this.ctx = this.canvas.getContext("2d");
      this.canvas.height = this.icon.height + this.options.margin;
      this.canvas.width = this.icon.width + this.options.margin;
      this.initBackground();
      if (this.options.fontAwesome) {
        this.ctx.fillStyle = "#" + this.options.fontAwesome.color;
        this.ctx.font = this.options.fontAwesome.dimension + 'px FontAwesome';
        this.ctx.fillText(String.fromCharCode("0x" + this.options.fontAwesome.font), 0 + this.canvas.height / 2 - this.options.fontAwesome.dimension / 2, (this.options.fontAwesome.dimension - 30) / 2 + this.canvas.width / 2);
        console.log(this.options.fontAwesome);
      } else {
        this.ctx.drawImage(this.icon, this.options.margin / 2, this.options.margin / 2);
      }
      imgData = this.ctx.getImageData(0, 0, this.height + this.options.margin, this.width + this.options.margin);
      this.iconCanvas = new _ImgCanvas2.default(imgData);
      this.iconCanvas.init(this.options.backgroundColor);
      switch (this.options.shadow) {
        case 1:
          this.iconCanvas.shadowfyRight(this.options.shadowColor);
          break;
        case 2:
          this.iconCanvas.halfMaterial(this.options.margin);
          break;
        case 3:
          this.iconCanvas.shadowfyLeft(this.options.shadowColor);
          break;
        case 0:
          break;
        default:
      }
      this.ctx.putImageData(this.iconCanvas.imgData, 0, 0);
    }
  }, {
    key: "initBackground",
    value: function initBackground() {
      var centerX = this.canvas.width / 2,
          centerY = this.canvas.height / 2,
          cornerRadius = 20,
          radius = this.options.radius || Math.max(this.icon.height, this.icon.width) - this.icon.height / 4,
          colorStyleStr = "rgba(" + this.options.backgroundColor.r + "," + this.options.backgroundColor.g + "," + this.options.backgroundColor.b + "," + "1)";

      this.ctx.fillStyle = colorStyleStr;
      this.ctx.strokeStyle = colorStyleStr;
      if (this.options.shape === "rect") {
        console.log(this.options.margin);
        this.ctx.rect(0, 0, this.canvas.height + this.options.margin, this.canvas.width + this.options.margin, false);
      } else if (this.options.shape === "round-rect") {
        this.ctx.lineJoin = "round";
        this.ctx.lineWidth = cornerRadius;
        this.ctx.strokeRect(0 + cornerRadius / 2, 0 + cornerRadius / 2, this.canvas.width - cornerRadius, this.canvas.height - cornerRadius);
        this.ctx.fillRect(0 + cornerRadius / 2, 0 + cornerRadius / 2, this.canvas.width - cornerRadius, this.canvas.height - cornerRadius);
      } else if (this.options.shape === "circle") {
        this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      } else if (this.options.shape === "hexagone") {
        this.drawPolygone(6, centerX, centerY, radius);
      }
      this.ctx.fill();
    }
  }, {
    key: "setMargin",
    value: function setMargin(margin) {
      this.options.radius = margin - this.icon.height / 4;
      this.options.margin = margin;
    }
  }, {
    key: "getRadius",
    value: function getRadius() {
      return this.options.radius || Math.max(this.icon.height, this.icon.width) - this.icon.height / 4;
    }
  }, {
    key: "setRadius",
    value: function setRadius(radius) {
      this.options.radius = radius;
    }
  }, {
    key: "setBackgroundShape",
    value: function setBackgroundShape(shape) {
      if (typeof shape === "string" && shape.length > 0) this.options.shape = shape;
    }
  }, {
    key: "setBackgroundColor",
    value: function setBackgroundColor(color) {
      var pixel = this.hexToRgb(color);

      if (this.isValidPixel(pixel) === false) {
        console.error("invalid color");
        return false;
      }
      this.options.backgroundColor = pixel;
    }
  }, {
    key: "setMouseOffset",
    value: function setMouseOffset(mouseEvent) {
      if (!mouseEvent) return true;

      this.options.mouseXOffset = mouseEvent.offsetX - this.icon.width / 2;
      this.options.mouseYOffset = mouseEvent.offsetY - this.icon.height / 2;
      console.log(this.options);
    }
  }, {
    key: "reloadCanvas",
    value: function reloadCanvas(reloadBackground) {
      var imgData = void 0;

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.canvas.height = this.icon.height + this.options.margin;
      this.canvas.width = this.icon.width + this.options.margin;
      this.initBackground();
      if (this.options.fontAwesome) {
        this.ctx.fillStyle = "#" + this.options.fontAwesome.color;
        this.ctx.font = this.options.fontAwesome.dimension + 'px FontAwesome';
        this.ctx.fillText(String.fromCharCode("0x" + this.options.fontAwesome.font), 0 + this.canvas.height / 2 - this.options.fontAwesome.dimension / 2, (this.options.fontAwesome.dimension - 30) / 2 + this.canvas.width / 2);
      } else {
        this.ctx.drawImage(this.icon, this.options.margin / 2 + this.options.mouseXOffset, this.options.margin / 2 + this.options.mouseYOffset);
      }
      imgData = this.ctx.getImageData(0, 0, this.height + this.options.margin, this.width + this.options.margin);
      if (reloadBackground === true) {
        this.iconCanvas = new _ImgCanvas2.default(imgData);
      }
      this.iconCanvas.init(this.options.backgroundColor);
      switch (this.options.shadow) {
        case 1:
          this.iconCanvas.shadowfyRight(this.options.shadowColor);
          break;
        case 2:
          this.iconCanvas.halfMaterial(this.options.margin);
          break;
        case 3:
          this.iconCanvas.shadowfyLeft(this.options.shadowColor);
          break;
        case 0:
          break;
        default:
      }
      this.ctx.putImageData(this.iconCanvas.imgData, 0, 0);
    }
  }, {
    key: "hexToRgb",
    value: function hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: 255
      } : null;
    }
  }, {
    key: "rgbaToPixel",
    value: function rgbaToPixel(rgbaColor) {
      var rgbaTab = rgbaColor.replace("rgba(", "").replace(")", "").split(",");
      return {
        r: parseInt(rgbaTab[0]),
        g: parseInt(rgbaTab[1]),
        b: parseInt(rgbaTab[2]),
        a: 255
      };
    }
  }, {
    key: "isValidPixel",
    value: function isValidPixel(pixel) {
      var count = 0;
      if ((typeof pixel === "undefined" ? "undefined" : _typeof(pixel)) !== "object") return false;

      for (var i in pixel) {
        count++;
        if (typeof pixel[i] !== "number" || pixel[i] > 255 || pixel[i] < 0) return false;
      }

      if (count != 4) return false;

      return true;
    }
  }, {
    key: "selectColor",
    value: function selectColor(color) {
      if (this.isValidPixel(color) === false) {
        console.error("Invalid color !! ", color);
        return false;
      }
      this.options.selectedColor = color;
    }
  }, {
    key: "reloadColors",
    value: function reloadColors(color) {
      var pixel = this.hexToRgb(color);

      if (this.isValidPixel(pixel) === false) {
        console.error("invalid color");
        return false;
      }
      this.iconCanvas.reloadColors(this.options.selectedColor, pixel);
    }
  }, {
    key: "drawPolygone",
    value: function drawPolygone(numberOfSides, centerX, centerY, radius) {
      this.ctx.beginPath();
      this.ctx.moveTo(centerX + radius * Math.cos(0), centerY + radius * Math.sin(0));
      for (var i = 1; i <= numberOfSides; i += 1) {
        this.ctx.lineTo(centerX + radius * Math.cos(i * 2 * Math.PI / numberOfSides), centerY + radius * Math.sin(i * 2 * Math.PI / numberOfSides));
      }
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    }
  }, {
    key: "setShadowColor",
    value: function setShadowColor(color) {
      var pixel = this.hexToRgb(color);

      if (this.isValidPixel(pixel) === false) {
        console.error("invalid color");
        return false;
      }
      this.options.shadowColor = pixel;
    }
  }, {
    key: "setShadow",
    value: function setShadow(shadowType) {
      this.options.shadow = shadowType;
    }
  }, {
    key: "toDataURL",
    value: function toDataURL() {
      return this.canvas.toDataURL('image/png');
    }
  }]);

  return canvasController;
}();

exports.default = canvasController;

},{"./ImgCanvas":1}],3:[function(require,module,exports){
'use strict';

var _canvasController = require('./canvasController');

var _canvasController2 = _interopRequireDefault(_canvasController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = function () {
  'use strict';
  // background = #6e8994

  var options = void 0;
  if (getParameterByName("font")) {
    options = {
      fontAwesome: {
        font: getParameterByName("font"),
        color: getParameterByName("color"),
        dimension: getParameterByName("dimension")
      }
    };
  }
  var canvasController = new _canvasController2.default("canvas", "source", options);
  canvasController.init();
  widgetsInit(canvasController);

  document.getElementById("rect").onclick = function () {
    canvasController.setBackgroundShape("rect");
    canvasController.reloadCanvas(true);
  };

  function findPos(obj) {
    var curleft = 0,
        curtop = 0;
    if (obj.offsetParent) {
      do {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;
        obj = obj.offsetParent;
      } while (obj);
      return {
        x: curleft,
        y: curtop
      };
    }
    return undefined;
  }

  function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
    return (r << 16 | g << 8 | b).toString(16);
  }

  document.getElementById('canvas').onmousedown = function (e) {
    canvasController.setMouseOffset(e);
    canvasController.reloadCanvas(true);
  };

  document.getElementById("circular").onclick = function () {
    canvasController.setBackgroundShape("circle");
    canvasController.reloadCanvas(true);
  };

  document.getElementById("round-rect").onclick = function () {
    canvasController.setBackgroundShape("round-rect");
    canvasController.reloadCanvas(true);
  };

  document.getElementById('colorPicker').onchange = function () {
    var hexValue = document.getElementById("colorPicker").value;
    //document.getElementById("backgroundColorValue").value = hexValue;
    canvasController.setBackgroundColor(hexValue);
    canvasController.reloadCanvas();
  };

  document.getElementById("long-shadow").onclick = function () {
    canvasController.setShadow(1);
    canvasController.reloadCanvas(true);
  };

  document.getElementById("long-shadow-left").onclick = function () {
    canvasController.setShadow(3);
    canvasController.reloadCanvas(true);
  };

  document.getElementById("half-shadow").onclick = function () {
    canvasController.setShadow(2);
    canvasController.reloadCanvas(true);
  };

  $('input[type=file]').change(function (e) {
    $("#fake-form").submit();
  });

  $('#preview-icons-container img').click(function () {
    $("#source").attr("src", this.getAttribute("src"));
    canvasController.reloadCanvas(true);
  });
/*
  document.getElementById("download-canvas").onclick = function () {
    this.href = canvasController.toDataURL();
  };
  
  document.getElementById("download-canvas-icon").onclick = function () {
    this.href = canvasController.toDataURL();
  };
*/
};

function widgetsInit(canvasController) {
  $('#toggle-one').bootstrapToggle().change(function () {
    if ($(this).prop('checked') === true) {
      canvasController.setShadow(1);
      canvasController.reloadCanvas(true);
    } else {
      canvasController.setShadow(0);
      canvasController.reloadCanvas(true);
    }
  });

  var mySlider = new Slider("#padding-slider", {});

  mySlider.on("slide", function (value) {
    canvasController.setMargin(value);
    canvasController.reloadCanvas(true);
  });

  //mySlider.setValue(canvasController.getRadius());
  mySlider.setValue(200);

  $('.demo2').colorpicker({
    customClass: 'colorpicker-2x',
    sliders: {
      saturation: {
        maxLeft: 200,
        maxTop: 200
      },
      hue: {
        maxTop: 200
      },
      alpha: {
        maxTop: 200
      }
    }
  }).on('changeColor.colorpicker', function (event) {
    canvasController.setBackgroundColor(event.color.toHex());
    canvasController.reloadCanvas(true);
  });

  $('.demo3').colorpicker({
    customClass: 'colorpicker-2x',
    sliders: {
      saturation: {
        maxLeft: 200,
        maxTop: 200
      },
      hue: {
        maxTop: 200
      },
      alpha: {
        maxTop: 200
      }
    }
  }).on('changeColor.colorpicker', function (event) {
    canvasController.setShadowColor(event.color.toHex());
    canvasController.reloadCanvas(true);
  });

  var fontsAwesomeArray = [{ content: "glass", unicode: "f000" }, { content: "music", unicode: "f001" }, { content: "search", unicode: "f002" }, { content: "envelope-o", unicode: "f003" }, { content: "heart", unicode: "f004" }, { content: "star", unicode: "f005" }, { content: "star-o", unicode: "f006" }, { content: "user", unicode: "f007" }, { content: "film", unicode: "f008" }, { content: "th-large", unicode: "f009" }, { content: "th", unicode: "f00a" }, { content: "th-list", unicode: "f00b" }, { content: "check", unicode: "f00c" }, { content: "times", unicode: "f00d" }, { content: "search-plus", unicode: "f00e" }, { content: "search-minus", unicode: "f010" }, { content: "power-off", unicode: "f011" }, { content: "signal", unicode: "f012" }, { content: "cog", unicode: "f013" }, { content: "trash-o", unicode: "f014" }, { content: "home", unicode: "f015" }, { content: "file-o", unicode: "f016" }, { content: "clock-o", unicode: "f017" }, { content: "road", unicode: "f018" }, { content: "download", unicode: "f019" }, { content: "arrow-circle-o-down", unicode: "f01a" }, { content: "arrow-circle-o-up", unicode: "f01b" }, { content: "inbox", unicode: "f01c" }, { content: "play-circle-o", unicode: "f01d" }, { content: "repeat", unicode: "f01e" }, { content: "refresh", unicode: "f021" }, { content: "list-alt", unicode: "f022" }, { content: "lock", unicode: "f023" }, { content: "flag", unicode: "f024" }, { content: "headphones", unicode: "f025" }, { content: "volume-off", unicode: "f026" }, { content: "volume-down", unicode: "f027" }, { content: "volume-up", unicode: "f028" }, { content: "qrcode", unicode: "f029" }, { content: "barcode", unicode: "f02a" }, { content: "tag", unicode: "f02b" }, { content: "tags", unicode: "f02c" }, { content: "book", unicode: "f02d" }, { content: "bookmark", unicode: "f02e" }, { content: "print", unicode: "f02f" }, { content: "camera", unicode: "f030" }, { content: "font", unicode: "f031" }, { content: "bold", unicode: "f032" }, { content: "italic", unicode: "f033" }, { content: "text-height", unicode: "f034" }, { content: "text-width", unicode: "f035" }, { content: "align-left", unicode: "f036" }, { content: "align-center", unicode: "f037" }, { content: "align-right", unicode: "f038" }, { content: "align-justify", unicode: "f039" }, { content: "list", unicode: "f03a" }, { content: "outdent", unicode: "f03b" }, { content: "indent", unicode: "f03c" }, { content: "video-camera", unicode: "f03d" }, { content: "picture-o", unicode: "f03e" }, { content: "pencil", unicode: "f040" }, { content: "map-marker", unicode: "f041" }, { content: "adjust", unicode: "f042" }, { content: "tint", unicode: "f043" }, { content: "pencil-square-o", unicode: "f044" }, { content: "share-square-o", unicode: "f045" }, { content: "check-square-o", unicode: "f046" }, { content: "arrows", unicode: "f047" }, { content: "step-backward", unicode: "f048" }, { content: "fast-backward", unicode: "f049" }, { content: "backward", unicode: "f04a" }, { content: "play", unicode: "f04b" }, { content: "pause", unicode: "f04c" }, { content: "stop", unicode: "f04d" }, { content: "forward", unicode: "f04e" }, { content: "fast-forward", unicode: "f050" }, { content: "step-forward", unicode: "f051" }, { content: "eject", unicode: "f052" }, { content: "chevron-left", unicode: "f053" }, { content: "chevron-right", unicode: "f054" }, { content: "plus-circle", unicode: "f055" }, { content: "minus-circle", unicode: "f056" }, { content: "times-circle", unicode: "f057" }, { content: "check-circle", unicode: "f058" }, { content: "question-circle", unicode: "f059" }, { content: "info-circle", unicode: "f05a" }, { content: "crosshairs", unicode: "f05b" }, { content: "times-circle-o", unicode: "f05c" }, { content: "check-circle-o", unicode: "f05d" }, { content: "ban", unicode: "f05e" }, { content: "arrow-left", unicode: "f060" }, { content: "arrow-right", unicode: "f061" }, { content: "arrow-up", unicode: "f062" }, { content: "arrow-down", unicode: "f063" }, { content: "share", unicode: "f064" }, { content: "expand", unicode: "f065" }, { content: "compress", unicode: "f066" }, { content: "plus", unicode: "f067" }, { content: "minus", unicode: "f068" }, { content: "asterisk", unicode: "f069" }, { content: "exclamation-circle", unicode: "f06a" }, { content: "gift", unicode: "f06b" }, { content: "leaf", unicode: "f06c" }, { content: "fire", unicode: "f06d" }, { content: "eye", unicode: "f06e" }, { content: "eye-slash", unicode: "f070" }, { content: "exclamation-triangle", unicode: "f071" }, { content: "plane", unicode: "f072" }, { content: "calendar", unicode: "f073" }, { content: "random", unicode: "f074" }, { content: "comment", unicode: "f075" }, { content: "magnet", unicode: "f076" }, { content: "chevron-up", unicode: "f077" }, { content: "chevron-down", unicode: "f078" }, { content: "retweet", unicode: "f079" }, { content: "shopping-cart", unicode: "f07a" }, { content: "folder", unicode: "f07b" }, { content: "folder-open", unicode: "f07c" }, { content: "arrows-v", unicode: "f07d" }, { content: "arrows-h", unicode: "f07e" }, { content: "bar-chart", unicode: "f080" }, { content: "twitter-square", unicode: "f081" }, { content: "facebook-square", unicode: "f082" }, { content: "camera-retro", unicode: "f083" }, { content: "key", unicode: "f084" }, { content: "cogs", unicode: "f085" }, { content: "comments", unicode: "f086" }, { content: "thumbs-o-up", unicode: "f087" }, { content: "thumbs-o-down", unicode: "f088" }, { content: "star-half", unicode: "f089" }, { content: "heart-o", unicode: "f08a" }, { content: "sign-out", unicode: "f08b" }, { content: "linkedin-square", unicode: "f08c" }, { content: "thumb-tack", unicode: "f08d" }, { content: "external-link", unicode: "f08e" }, { content: "sign-in", unicode: "f090" }, { content: "trophy", unicode: "f091" }, { content: "github-square", unicode: "f092" }, { content: "upload", unicode: "f093" }, { content: "lemon-o", unicode: "f094" }, { content: "phone", unicode: "f095" }, { content: "square-o", unicode: "f096" }, { content: "bookmark-o", unicode: "f097" }, { content: "phone-square", unicode: "f098" }, { content: "twitter", unicode: "f099" }, { content: "facebook", unicode: "f09a" }, { content: "github", unicode: "f09b" }, { content: "unlock", unicode: "f09c" }, { content: "credit-card", unicode: "f09d" }, { content: "rss", unicode: "f09e" }, { content: "hdd-o", unicode: "f0a0" }, { content: "bullhorn", unicode: "f0a1" }, { content: "bell", unicode: "f0f3" }, { content: "certificate", unicode: "f0a3" }, { content: "hand-o-right", unicode: "f0a4" }, { content: "hand-o-left", unicode: "f0a5" }, { content: "hand-o-up", unicode: "f0a6" }, { content: "hand-o-down", unicode: "f0a7" }, { content: "arrow-circle-left", unicode: "f0a8" }, { content: "arrow-circle-right", unicode: "f0a9" }, { content: "arrow-circle-up", unicode: "f0aa" }, { content: "arrow-circle-down", unicode: "f0ab" }, { content: "globe", unicode: "f0ac" }, { content: "wrench", unicode: "f0ad" }, { content: "tasks", unicode: "f0ae" }, { content: "filter", unicode: "f0b0" }, { content: "briefcase", unicode: "f0b1" }, { content: "arrows-alt", unicode: "f0b2" }, { content: "users", unicode: "f0c0" }, { content: "link", unicode: "f0c1" }, { content: "cloud", unicode: "f0c2" }, { content: "flask", unicode: "f0c3" }, { content: "scissors", unicode: "f0c4" }, { content: "files-o", unicode: "f0c5" }, { content: "paperclip", unicode: "f0c6" }, { content: "floppy-o", unicode: "f0c7" }, { content: "square", unicode: "f0c8" }, { content: "bars", unicode: "f0c9" }, { content: "list-ul", unicode: "f0ca" }, { content: "list-ol", unicode: "f0cb" }, { content: "strikethrough", unicode: "f0cc" }, { content: "underline", unicode: "f0cd" }, { content: "table", unicode: "f0ce" }, { content: "magic", unicode: "f0d0" }, { content: "truck", unicode: "f0d1" }, { content: "pinterest", unicode: "f0d2" }, { content: "pinterest-square", unicode: "f0d3" }, { content: "google-plus-square", unicode: "f0d4" }, { content: "google-plus", unicode: "f0d5" }, { content: "money", unicode: "f0d6" }, { content: "caret-down", unicode: "f0d7" }, { content: "caret-up", unicode: "f0d8" }, { content: "caret-left", unicode: "f0d9" }, { content: "caret-right", unicode: "f0da" }, { content: "columns", unicode: "f0db" }, { content: "sort", unicode: "f0dc" }, { content: "sort-desc", unicode: "f0dd" }, { content: "sort-asc", unicode: "f0de" }, { content: "envelope", unicode: "f0e0" }, { content: "linkedin", unicode: "f0e1" }, { content: "undo", unicode: "f0e2" }, { content: "gavel", unicode: "f0e3" }, { content: "tachometer", unicode: "f0e4" }, { content: "comment-o", unicode: "f0e5" }, { content: "comments-o", unicode: "f0e6" }, { content: "bolt", unicode: "f0e7" }, { content: "sitemap", unicode: "f0e8" }, { content: "umbrella", unicode: "f0e9" }, { content: "clipboard", unicode: "f0ea" }, { content: "lightbulb-o", unicode: "f0eb" }, { content: "exchange", unicode: "f0ec" }, { content: "cloud-download", unicode: "f0ed" }, { content: "cloud-upload", unicode: "f0ee" }, { content: "user-md", unicode: "f0f0" }, { content: "stethoscope", unicode: "f0f1" }, { content: "suitcase", unicode: "f0f2" }, { content: "bell-o", unicode: "f0a2" }, { content: "coffee", unicode: "f0f4" }, { content: "cutlery", unicode: "f0f5" }, { content: "file-text-o", unicode: "f0f6" }, { content: "building-o", unicode: "f0f7" }, { content: "hospital-o", unicode: "f0f8" }, { content: "ambulance", unicode: "f0f9" }, { content: "medkit", unicode: "f0fa" }, { content: "fighter-jet", unicode: "f0fb" }, { content: "beer", unicode: "f0fc" }, { content: "h-square", unicode: "f0fd" }, { content: "plus-square", unicode: "f0fe" }, { content: "angle-double-left", unicode: "f100" }, { content: "angle-double-right", unicode: "f101" }, { content: "angle-double-up", unicode: "f102" }, { content: "angle-double-down", unicode: "f103" }, { content: "angle-left", unicode: "f104" }, { content: "angle-right", unicode: "f105" }, { content: "angle-up", unicode: "f106" }, { content: "angle-down", unicode: "f107" }, { content: "desktop", unicode: "f108" }, { content: "laptop", unicode: "f109" }, { content: "tablet", unicode: "f10a" }, { content: "mobile", unicode: "f10b" }, { content: "circle-o", unicode: "f10c" }, { content: "quote-left", unicode: "f10d" }, { content: "quote-right", unicode: "f10e" }, { content: "spinner", unicode: "f110" }, { content: "circle", unicode: "f111" }, { content: "reply", unicode: "f112" }, { content: "github-alt", unicode: "f113" }, { content: "folder-o", unicode: "f114" }, { content: "folder-open-o", unicode: "f115" }, { content: "smile-o", unicode: "f118" }, { content: "frown-o", unicode: "f119" }, { content: "meh-o", unicode: "f11a" }, { content: "gamepad", unicode: "f11b" }, { content: "keyboard-o", unicode: "f11c" }, { content: "flag-o", unicode: "f11d" }, { content: "flag-checkered", unicode: "f11e" }, { content: "terminal", unicode: "f120" }, { content: "code", unicode: "f121" }, { content: "reply-all", unicode: "f122" }, { content: "star-half-o", unicode: "f123" }, { content: "location-arrow", unicode: "f124" }, { content: "crop", unicode: "f125" }, { content: "code-fork", unicode: "f126" }, { content: "chain-broken", unicode: "f127" }, { content: "question", unicode: "f128" }, { content: "info", unicode: "f129" }, { content: "exclamation", unicode: "f12a" }, { content: "superscript", unicode: "f12b" }, { content: "subscript", unicode: "f12c" }, { content: "eraser", unicode: "f12d" }, { content: "puzzle-piece", unicode: "f12e" }, { content: "microphone", unicode: "f130" }, { content: "microphone-slash", unicode: "f131" }, { content: "shield", unicode: "f132" }, { content: "calendar-o", unicode: "f133" }, { content: "fire-extinguisher", unicode: "f134" }, { content: "rocket", unicode: "f135" }, { content: "maxcdn", unicode: "f136" }, { content: "chevron-circle-left", unicode: "f137" }, { content: "chevron-circle-right", unicode: "f138" }, { content: "chevron-circle-up", unicode: "f139" }, { content: "chevron-circle-down", unicode: "f13a" }, { content: "html5", unicode: "f13b" }, { content: "css3", unicode: "f13c" }, { content: "anchor", unicode: "f13d" }, { content: "unlock-alt", unicode: "f13e" }, { content: "bullseye", unicode: "f140" }, { content: "ellipsis-h", unicode: "f141" }, { content: "ellipsis-v", unicode: "f142" }, { content: "rss-square", unicode: "f143" }, { content: "play-circle", unicode: "f144" }, { content: "ticket", unicode: "f145" }, { content: "minus-square", unicode: "f146" }, { content: "minus-square-o", unicode: "f147" }, { content: "level-up", unicode: "f148" }, { content: "level-down", unicode: "f149" }, { content: "check-square", unicode: "f14a" }, { content: "pencil-square", unicode: "f14b" }, { content: "external-link-square", unicode: "f14c" }, { content: "share-square", unicode: "f14d" }, { content: "compass", unicode: "f14e" }, { content: "caret-square-o-down", unicode: "f150" }, { content: "caret-square-o-up", unicode: "f151" }, { content: "caret-square-o-right", unicode: "f152" }, { content: "eur", unicode: "f153" }, { content: "gbp", unicode: "f154" }, { content: "usd", unicode: "f155" }, { content: "inr", unicode: "f156" }, { content: "jpy", unicode: "f157" }, { content: "rub", unicode: "f158" }, { content: "krw", unicode: "f159" }, { content: "btc", unicode: "f15a" }, { content: "file", unicode: "f15b" }, { content: "file-text", unicode: "f15c" }, { content: "sort-alpha-asc", unicode: "f15d" }, { content: "sort-alpha-desc", unicode: "f15e" }, { content: "sort-amount-asc", unicode: "f160" }, { content: "sort-amount-desc", unicode: "f161" }, { content: "sort-numeric-asc", unicode: "f162" }, { content: "sort-numeric-desc", unicode: "f163" }, { content: "thumbs-up", unicode: "f164" }, { content: "thumbs-down", unicode: "f165" }, { content: "youtube-square", unicode: "f166" }, { content: "youtube", unicode: "f167" }, { content: "xing", unicode: "f168" }, { content: "xing-square", unicode: "f169" }, { content: "youtube-play", unicode: "f16a" }, { content: "dropbox", unicode: "f16b" }, { content: "stack-overflow", unicode: "f16c" }, { content: "instagram", unicode: "f16d" }, { content: "flickr", unicode: "f16e" }, { content: "adn", unicode: "f170" }, { content: "bitbucket", unicode: "f171" }, { content: "bitbucket-square", unicode: "f172" }, { content: "tumblr", unicode: "f173" }, { content: "tumblr-square", unicode: "f174" }, { content: "long-arrow-down", unicode: "f175" }, { content: "long-arrow-up", unicode: "f176" }, { content: "long-arrow-left", unicode: "f177" }, { content: "long-arrow-right", unicode: "f178" }, { content: "apple", unicode: "f179" }, { content: "windows", unicode: "f17a" }, { content: "android", unicode: "f17b" }, { content: "linux", unicode: "f17c" }, { content: "dribbble", unicode: "f17d" }, { content: "skype", unicode: "f17e" }, { content: "foursquare", unicode: "f180" }, { content: "trello", unicode: "f181" }, { content: "female", unicode: "f182" }, { content: "male", unicode: "f183" }, { content: "gratipay", unicode: "f184" }, { content: "sun-o", unicode: "f185" }, { content: "moon-o", unicode: "f186" }, { content: "archive", unicode: "f187" }, { content: "bug", unicode: "f188" }, { content: "vk", unicode: "f189" }, { content: "weibo", unicode: "f18a" }, { content: "renren", unicode: "f18b" }, { content: "pagelines", unicode: "f18c" }, { content: "stack-exchange", unicode: "f18d" }, { content: "arrow-circle-o-right", unicode: "f18e" }, { content: "arrow-circle-o-left", unicode: "f190" }, { content: "caret-square-o-left", unicode: "f191" }, { content: "dot-circle-o", unicode: "f192" }, { content: "wheelchair", unicode: "f193" }, { content: "vimeo-square", unicode: "f194" }, { content: "try", unicode: "f195" }, { content: "plus-square-o", unicode: "f196" }, { content: "space-shuttle", unicode: "f197" }, { content: "slack", unicode: "f198" }, { content: "envelope-square", unicode: "f199" }, { content: "wordpress", unicode: "f19a" }, { content: "openid", unicode: "f19b" }, { content: "university", unicode: "f19c" }, { content: "graduation-cap", unicode: "f19d" }, { content: "yahoo", unicode: "f19e" }, { content: "google", unicode: "f1a0" }, { content: "reddit", unicode: "f1a1" }, { content: "reddit-square", unicode: "f1a2" }, { content: "stumbleupon-circle", unicode: "f1a3" }, { content: "stumbleupon", unicode: "f1a4" }, { content: "delicious", unicode: "f1a5" }, { content: "digg", unicode: "f1a6" }, { content: "pied-piper-pp", unicode: "f1a7" }, { content: "pied-piper-alt", unicode: "f1a8" }, { content: "drupal", unicode: "f1a9" }, { content: "joomla", unicode: "f1aa" }, { content: "language", unicode: "f1ab" }, { content: "fax", unicode: "f1ac" }, { content: "building", unicode: "f1ad" }, { content: "child", unicode: "f1ae" }, { content: "paw", unicode: "f1b0" }, { content: "spoon", unicode: "f1b1" }, { content: "cube", unicode: "f1b2" }, { content: "cubes", unicode: "f1b3" }, { content: "behance", unicode: "f1b4" }, { content: "behance-square", unicode: "f1b5" }, { content: "steam", unicode: "f1b6" }, { content: "steam-square", unicode: "f1b7" }, { content: "recycle", unicode: "f1b8" }, { content: "car", unicode: "f1b9" }, { content: "taxi", unicode: "f1ba" }, { content: "tree", unicode: "f1bb" }, { content: "spotify", unicode: "f1bc" }, { content: "deviantart", unicode: "f1bd" }, { content: "soundcloud", unicode: "f1be" }, { content: "database", unicode: "f1c0" }, { content: "file-pdf-o", unicode: "f1c1" }, { content: "file-word-o", unicode: "f1c2" }, { content: "file-excel-o", unicode: "f1c3" }, { content: "file-powerpoint-o", unicode: "f1c4" }, { content: "file-image-o", unicode: "f1c5" }, { content: "file-archive-o", unicode: "f1c6" }, { content: "file-audio-o", unicode: "f1c7" }, { content: "file-video-o", unicode: "f1c8" }, { content: "file-code-o", unicode: "f1c9" }, { content: "vine", unicode: "f1ca" }, { content: "codepen", unicode: "f1cb" }, { content: "jsfiddle", unicode: "f1cc" }, { content: "life-ring", unicode: "f1cd" }, { content: "circle-o-notch", unicode: "f1ce" }, { content: "rebel", unicode: "f1d0" }, { content: "empire", unicode: "f1d1" }, { content: "git-square", unicode: "f1d2" }, { content: "git", unicode: "f1d3" }, { content: "hacker-news", unicode: "f1d4" }, { content: "tencent-weibo", unicode: "f1d5" }, { content: "qq", unicode: "f1d6" }, { content: "weixin", unicode: "f1d7" }, { content: "paper-plane", unicode: "f1d8" }, { content: "paper-plane-o", unicode: "f1d9" }, { content: "history", unicode: "f1da" }, { content: "circle-thin", unicode: "f1db" }, { content: "header", unicode: "f1dc" }, { content: "paragraph", unicode: "f1dd" }, { content: "sliders", unicode: "f1de" }, { content: "share-alt", unicode: "f1e0" }, { content: "share-alt-square", unicode: "f1e1" }, { content: "bomb", unicode: "f1e2" }, { content: "futbol-o", unicode: "f1e3" }, { content: "tty", unicode: "f1e4" }, { content: "binoculars", unicode: "f1e5" }, { content: "plug", unicode: "f1e6" }, { content: "slideshare", unicode: "f1e7" }, { content: "twitch", unicode: "f1e8" }, { content: "yelp", unicode: "f1e9" }, { content: "newspaper-o", unicode: "f1ea" }, { content: "wifi", unicode: "f1eb" }, { content: "calculator", unicode: "f1ec" }, { content: "paypal", unicode: "f1ed" }, { content: "google-wallet", unicode: "f1ee" }, { content: "cc-visa", unicode: "f1f0" }, { content: "cc-mastercard", unicode: "f1f1" }, { content: "cc-discover", unicode: "f1f2" }, { content: "cc-amex", unicode: "f1f3" }, { content: "cc-paypal", unicode: "f1f4" }, { content: "cc-stripe", unicode: "f1f5" }, { content: "bell-slash", unicode: "f1f6" }, { content: "bell-slash-o", unicode: "f1f7" }, { content: "trash", unicode: "f1f8" }, { content: "copyright", unicode: "f1f9" }, { content: "at", unicode: "f1fa" }, { content: "eyedropper", unicode: "f1fb" }, { content: "paint-brush", unicode: "f1fc" }, { content: "birthday-cake", unicode: "f1fd" }, { content: "area-chart", unicode: "f1fe" }, { content: "pie-chart", unicode: "f200" }, { content: "line-chart", unicode: "f201" }, { content: "lastfm", unicode: "f202" }, { content: "lastfm-square", unicode: "f203" }, { content: "toggle-off", unicode: "f204" }, { content: "toggle-on", unicode: "f205" }, { content: "bicycle", unicode: "f206" }, { content: "bus", unicode: "f207" }, { content: "ioxhost", unicode: "f208" }, { content: "angellist", unicode: "f209" }, { content: "cc", unicode: "f20a" }, { content: "ils", unicode: "f20b" }, { content: "meanpath", unicode: "f20c" }, { content: "buysellads", unicode: "f20d" }, { content: "connectdevelop", unicode: "f20e" }, { content: "dashcube", unicode: "f210" }, { content: "forumbee", unicode: "f211" }, { content: "leanpub", unicode: "f212" }, { content: "sellsy", unicode: "f213" }, { content: "shirtsinbulk", unicode: "f214" }, { content: "simplybuilt", unicode: "f215" }, { content: "skyatlas", unicode: "f216" }, { content: "cart-plus", unicode: "f217" }, { content: "cart-arrow-down", unicode: "f218" }, { content: "diamond", unicode: "f219" }, { content: "ship", unicode: "f21a" }, { content: "user-secret", unicode: "f21b" }, { content: "motorcycle", unicode: "f21c" }, { content: "street-view", unicode: "f21d" }, { content: "heartbeat", unicode: "f21e" }, { content: "venus", unicode: "f221" }, { content: "mars", unicode: "f222" }, { content: "mercury", unicode: "f223" }, { content: "transgender", unicode: "f224" }, { content: "transgender-alt", unicode: "f225" }, { content: "venus-double", unicode: "f226" }, { content: "mars-double", unicode: "f227" }, { content: "venus-mars", unicode: "f228" }, { content: "mars-stroke", unicode: "f229" }, { content: "mars-stroke-v", unicode: "f22a" }, { content: "mars-stroke-h", unicode: "f22b" }, { content: "neuter", unicode: "f22c" }, { content: "genderless", unicode: "f22d" }, { content: "facebook-official", unicode: "f230" }, { content: "pinterest-p", unicode: "f231" }, { content: "whatsapp", unicode: "f232" }, { content: "server", unicode: "f233" }, { content: "user-plus", unicode: "f234" }, { content: "user-times", unicode: "f235" }, { content: "bed", unicode: "f236" }, { content: "viacoin", unicode: "f237" }, { content: "train", unicode: "f238" }, { content: "subway", unicode: "f239" }, { content: "medium", unicode: "f23a" }, { content: "y-combinator", unicode: "f23b" }, { content: "optin-monster", unicode: "f23c" }, { content: "opencart", unicode: "f23d" }, { content: "expeditedssl", unicode: "f23e" }, { content: "battery-full", unicode: "f240" }, { content: "battery-three-quarters", unicode: "f241" }, { content: "battery-half", unicode: "f242" }, { content: "battery-quarter", unicode: "f243" }, { content: "battery-empty", unicode: "f244" }, { content: "mouse-pointer", unicode: "f245" }, { content: "i-cursor", unicode: "f246" }, { content: "object-group", unicode: "f247" }, { content: "object-ungroup", unicode: "f248" }, { content: "sticky-note", unicode: "f249" }, { content: "sticky-note-o", unicode: "f24a" }, { content: "cc-jcb", unicode: "f24b" }, { content: "cc-diners-club", unicode: "f24c" }, { content: "clone", unicode: "f24d" }, { content: "balance-scale", unicode: "f24e" }, { content: "hourglass-o", unicode: "f250" }, { content: "hourglass-start", unicode: "f251" }, { content: "hourglass-half", unicode: "f252" }, { content: "hourglass-end", unicode: "f253" }, { content: "hourglass", unicode: "f254" }, { content: "hand-rock-o", unicode: "f255" }, { content: "hand-paper-o", unicode: "f256" }, { content: "hand-scissors-o", unicode: "f257" }, { content: "hand-lizard-o", unicode: "f258" }, { content: "hand-spock-o", unicode: "f259" }, { content: "hand-pointer-o", unicode: "f25a" }, { content: "hand-peace-o", unicode: "f25b" }, { content: "trademark", unicode: "f25c" }, { content: "registered", unicode: "f25d" }, { content: "creative-commons", unicode: "f25e" }, { content: "gg", unicode: "f260" }, { content: "gg-circle", unicode: "f261" }, { content: "tripadvisor", unicode: "f262" }, { content: "odnoklassniki", unicode: "f263" }, { content: "odnoklassniki-square", unicode: "f264" }, { content: "get-pocket", unicode: "f265" }, { content: "wikipedia-w", unicode: "f266" }, { content: "safari", unicode: "f267" }, { content: "chrome", unicode: "f268" }, { content: "firefox", unicode: "f269" }, { content: "opera", unicode: "f26a" }, { content: "internet-explorer", unicode: "f26b" }, { content: "television", unicode: "f26c" }, { content: "contao", unicode: "f26d" }, { content: "500px", unicode: "f26e" }, { content: "amazon", unicode: "f270" }, { content: "calendar-plus-o", unicode: "f271" }, { content: "calendar-minus-o", unicode: "f272" }, { content: "calendar-times-o", unicode: "f273" }, { content: "calendar-check-o", unicode: "f274" }, { content: "industry", unicode: "f275" }, { content: "map-pin", unicode: "f276" }, { content: "map-signs", unicode: "f277" }, { content: "map-o", unicode: "f278" }, { content: "map", unicode: "f279" }, { content: "commenting", unicode: "f27a" }, { content: "commenting-o", unicode: "f27b" }, { content: "houzz", unicode: "f27c" }, { content: "vimeo", unicode: "f27d" }, { content: "black-tie", unicode: "f27e" }, { content: "fonticons", unicode: "f280" }, { content: "reddit-alien", unicode: "f281" }, { content: "edge", unicode: "f282" }, { content: "credit-card-alt", unicode: "f283" }, { content: "codiepie", unicode: "f284" }, { content: "modx", unicode: "f285" }, { content: "fort-awesome", unicode: "f286" }, { content: "usb", unicode: "f287" }, { content: "product-hunt", unicode: "f288" }, { content: "mixcloud", unicode: "f289" }, { content: "scribd", unicode: "f28a" }, { content: "pause-circle", unicode: "f28b" }, { content: "pause-circle-o", unicode: "f28c" }, { content: "stop-circle", unicode: "f28d" }, { content: "stop-circle-o", unicode: "f28e" }, { content: "shopping-bag", unicode: "f290" }, { content: "shopping-basket", unicode: "f291" }, { content: "hashtag", unicode: "f292" }, { content: "bluetooth", unicode: "f293" }, { content: "bluetooth-b", unicode: "f294" }, { content: "percent", unicode: "f295" }, { content: "gitlab", unicode: "f296" }, { content: "wpbeginner", unicode: "f297" }, { content: "wpforms", unicode: "f298" }, { content: "envira", unicode: "f299" }, { content: "universal-access", unicode: "f29a" }, { content: "wheelchair-alt", unicode: "f29b" }, { content: "question-circle-o", unicode: "f29c" }, { content: "blind", unicode: "f29d" }, { content: "audio-description", unicode: "f29e" }, { content: "volume-control-phone", unicode: "f2a0" }, { content: "braille", unicode: "f2a1" }, { content: "assistive-listening-systems", unicode: "f2a2" }, { content: "american-sign-language-interpreting", unicode: "f2a3" }, { content: "deaf", unicode: "f2a4" }, { content: "glide", unicode: "f2a5" }, { content: "glide-g", unicode: "f2a6" }, { content: "sign-language", unicode: "f2a7" }, { content: "low-vision", unicode: "f2a8" }, { content: "viadeo", unicode: "f2a9" }, { content: "viadeo-square", unicode: "f2aa" }, { content: "snapchat", unicode: "f2ab" }, { content: "snapchat-ghost", unicode: "f2ac" }, { content: "snapchat-square", unicode: "f2ad" }, { content: "pied-piper", unicode: "f2ae" }, { content: "first-order", unicode: "f2b0" }, { content: "yoast", unicode: "f2b1" }, { content: "themeisle", unicode: "f2b2" }, { content: "google-plus-official", unicode: "f2b3" }, { content: "font-awesome", unicode: "f2b4" }];
  var finalHtml = "";
  for (var i = 0; i < fontsAwesomeArray.length; i++) {
    finalHtml += "<a href='/?font=" + fontsAwesomeArray[i].unicode + "&dimension=140&color=fff#container'><i class='fa fa-" + fontsAwesomeArray[i].content + " fa-3x' ></i></a>";
  }
  $("#icon-content")[0].innerHTML = finalHtml;
}

$(function () {
  $('a[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, "linear");
        return false;
      }
    }
  });
});

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

},{"./canvasController":2}]},{},[3]);
