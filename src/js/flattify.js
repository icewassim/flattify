class ImgCanvas {

	constructor(imgData) {
		this.imgData = imgData;
		this.height = imgData.height;
		this.width = imgData.width;
	}

	init() {

	}

	imgDataToMatrix() {
	    for (let i = 0; i < this.height; i++) {
	      let lines = [];
	       for (let j = 0; j < this.width*4 ;j = j+4) {
	          let pixel = {};
	          pixel.r = imgData.data[j+(i*this.width*4)];
	          pixel.g = imgData.data[j+1+(i*this.width*4)];
	          pixel.b = imgData.data[j+2+(i*this.width*4)];
	          pixel.a = imgData.data[j+3+(i*this.width*4)];
	          lines.push(pixel);
	        }
	        imgMatrix.push(lines);
	      }
	}


}