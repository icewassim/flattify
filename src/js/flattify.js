import CanvasController from './canvasController';

window.onload = function() {
  'use strict';

  let canvasController = new CanvasController("canvas", "source");
  canvasController.init();

  document.getElementById("rect").onclick = function() {
    canvasController.setBackgroundShape("rect");
    canvasController.reloadCanvas();
  };

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
    document.getElementById("backgroundColorValue").value = hexValue;
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
