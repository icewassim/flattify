import CanvasController from './canvasController';

window.onload = function() {
  'use strict';

  let canvasController = new CanvasController("canvas","source");
  canvasController.init();

  document.getElementById("rect").onclick = function() {
    canvasController.setBackgroundShape("rect");
    canvasController.reloadCanvas();
  };

  document.getElementById("circular").onclick = function() {
    canvasController.setBackgroundShape("circle");
    canvasController.reloadCanvas();
  };

  document.getElementById('backgroundColor').onclick = function() {
    let color = document.getElementById("backgroundColorValue").value;
    canvasController.setBackgroundColor(color);
    canvasController.reloadCanvas();
  };

  };