import CanvasController from './canvasController';

window.onload = function() {
  'use strict';

  let canvasController = new CanvasController("canvas", "source");
  canvasController.init();

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
        }).on('changeColor.colorpicker', function(event){
    //canvasController.reloadColors(event.color.toHex());
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
        }).on('changeColor.colorpicker', function(event){
    canvasController.reloadColors(event.color.toHex());
    canvasController.reloadCanvas(false);
  });

  document.getElementById("rect").onclick = function() {
    canvasController.setBackgroundShape("rect");
    canvasController.reloadCanvas();
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
                        r:p[0],
                        g:p[1],
                        b:p[2],
                        a:1
                    });
    $('.demo3').colorpicker("show");
};

function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
            obj = obj.offsetParent;
        } while (obj);
        return { x: curleft, y: curtop };
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
    canvasController.reloadCanvas();
  };

  document.getElementById("round-rect").onclick = function() {
    canvasController.setBackgroundShape("round-rect");
    canvasController.reloadCanvas();
  };

  document.getElementById('colorPicker').onchange = function() {
    let hexValue = document.getElementById("colorPicker").value;
    //document.getElementById("backgroundColorValue").value = hexValue;
    console.log(hexValue);
    canvasController.setBackgroundColor(hexValue);
    canvasController.reloadCanvas();
  };

  document.getElementById("no-shadow").onclick = function() {
    canvasController.unsetShadow();
    canvasController.reloadCanvas();
  };

  document.getElementById("long-shadow").onclick = function() {
    canvasController.setShadow();
    canvasController.reloadCanvas();
  };

  document.getElementById("download-canvas").onclick = function() {
    this.href = canvasController.toDataURL();
  };

};
