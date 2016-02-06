 import ImgCanvas from '../src/js/ImgCanvas';
 import * as testLib from './testLib';

const fs = require("fs"),
  assert = require('assert');

describe('ImgCanvas test', function() {
  let imgData = {};
  before(function(done) {
    fs.readFile(__dirname + '/ImgDataTwitter.json', function(err, content) {
      if (err) {
        console.error("cant read file ", err);
      }
      imgData = JSON.parse(content.toString());
      ImgCanvas.prototype.getAttributes = testLib.getPrivAttr;
      done();
    });
  });

  it("should not create a empty object", function() {
    let iconCanvas = new ImgCanvas(imgData);
    assert.equal(testLib.isEmptyObj(iconCanvas), false);

  });
  it('should have the correct height and width', function() {
    let iconCanvas = new ImgCanvas(imgData);
    assert.equal(iconCanvas.getAttributes().height,imgData.height);
    assert.equal(iconCanvas.getAttributes().width,imgData.width);
  });

  it('should return false if imgData is empty', function () {
    let iconCanvas = new ImgCanvas();
    assert.equal(testLib.isEmptyObj(iconCanvas),true);
  });

  it('should transform imageData to Matrix', function() {
    let iconCanvas;
    let imgMatrix;

    iconCanvas = new ImgCanvas(imgData);
    iconCanvas.imgDataToMatrix();
    imgMatrix = iconCanvas.getAttributes().imgMatrix;

    assert.equal(imgMatrix.constructor, Array);
    assert.equal(imgMatrix.length,imgData.width);
    assert.equal(imgMatrix[1].length,imgData.height);
  });

});
