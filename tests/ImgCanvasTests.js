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

   it("should return an iconCanvas Object", function() {
     let iconCanvas = new ImgCanvas(imgData);
     assert.equal(testLib.isEmptyObj(iconCanvas), false);

   });

   it('should have valid dimensions ', function() {
     let iconCanvas = new ImgCanvas(imgData);
     assert.equal(iconCanvas.getAttributes().height, imgData.height);
     assert.equal(iconCanvas.getAttributes().width, imgData.width);
   });

   it('should return an empty object if imgData is missing', function() {
     let iconCanvas = new ImgCanvas();
     assert.equal(testLib.isEmptyObj(iconCanvas), true);
   });

   it('should transform imageData to a Matrix with valid dimensions', function() {
     let iconCanvas,
       imgMatrix;

     iconCanvas = new ImgCanvas(imgData);
     iconCanvas.imgDataToMatrix();
     imgMatrix = iconCanvas.getAttributes().imgMatrix;

     assert.equal(imgMatrix.constructor, Array);
     assert.equal(imgMatrix.length, imgData.width);
     assert.equal(imgMatrix[1].length, imgData.height);
   });

 });
