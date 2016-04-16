import CanvasController from './canvasController';

window.onload = function() {
  'use strict';
  // background = #6e8994
  let canvasController = new CanvasController("canvas", "source");
  canvasController.init();
  widgetsInit(canvasController);

  document.getElementById("rect").onclick = function() {
    canvasController.setBackgroundShape("rect");
    canvasController.reloadCanvas(true);
  };

  document.getElementById("canvas").onclick = function(e) {
    var pos = findPos(this);
    var x = e.pageX - pos.x;
    var y = e.pageY - pos.y;
    var coord = "x=" + x + ", y=" + y;
    var c = this.getContext('2d');
    var p = c.getImageData(x, y, 1, 1).data;
    var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
    canvasController.selectColor({
      r: p[0],
      g: p[1],
      b: p[2],
      a: 1
    });
    $('.demo3').colorpicker("show");
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
    if (r > 255 || g > 255 || b > 255)
      throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
  }
  /*
    document.getElementById('canvas').onmousedown = function (e) {
      canvasController.reloadCanvas(e);
    };
  */
  document.getElementById("circular").onclick = function() {
    canvasController.setBackgroundShape("circle");
    canvasController.reloadCanvas(true);
  };

  document.getElementById("round-rect").onclick = function() {
    canvasController.setBackgroundShape("round-rect");
    canvasController.reloadCanvas(true);
  };

  document.getElementById('colorPicker').onchange = function() {
    let hexValue = document.getElementById("colorPicker").value;
    //document.getElementById("backgroundColorValue").value = hexValue;
    canvasController.setBackgroundColor(hexValue);
    canvasController.reloadCanvas();
  };

  document.getElementById("long-shadow").onclick = function() {
    canvasController.setShadow(1);
    canvasController.reloadCanvas(true);
  };

  document.getElementById("long-shadow-left").onclick = function() {
    canvasController.setShadow(3);
    canvasController.reloadCanvas(true);
  };

  document.getElementById("half-shadow").onclick = function() {
    canvasController.setShadow(2);
    canvasController.reloadCanvas(true);
  };

  document.getElementById("download-canvas").onclick = function() {
    console.log("dsqds");
    this.href = canvasController.toDataURL();
  };

  document.getElementById("download-canvas-icon").onclick = function() {
    this.href = canvasController.toDataURL();
  };

};

function widgetsInit(canvasController) {
  $('#toggle-one').bootstrapToggle().change(function() {
    if ($(this).prop('checked') === true) {
      canvasController.setShadow(1);
      canvasController.reloadCanvas(true);
    } else {
      canvasController.setShadow(0);
      canvasController.reloadCanvas(true);
    }
  });

  var mySlider = new Slider("#padding-slider", {

  });

  mySlider.on("slide", function(value) {
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
  }).on('changeColor.colorpicker', function(event) {
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
  }).on('changeColor.colorpicker', function(event) {
    canvasController.setShadowColor(event.color.toHex());
    canvasController.reloadCanvas(true);
  });

}
