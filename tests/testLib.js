export function isEmptyObj(obj) {
  'use strict';
  if (obj.length > 0)
    return false;

  if (!obj || obj.length === 0)
    return true;

  for (let key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
}

export function getPrivAttr() {
  'use strict';
  //TODO check How its private attributes are tested
  return {
    height: this.height,
    width: this.width,
    imgMatrix: this.imgMatrix,
  }
}

export function generateDummyImageData(imgData) {
  'use strict';
  let str = JSON.stringify(imgData.data),
    newImgData = {};

  newImgData.data = str.split(',').map(function(a) {
    return a.split(":")[1];
  });
  newImgData.height = imgData.height;
  newImgData.width = imgData.width;
  return newImgData;
}
