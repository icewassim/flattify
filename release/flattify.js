!function t(i,a,n){function e(r,s){if(!a[r]){if(!i[r]){var h="function"==typeof require&&require;if(!s&&h)return h(r,!0);if(o)return o(r,!0);var c=new Error("Cannot find module '"+r+"'");throw c.code="MODULE_NOT_FOUND",c}var u=a[r]={exports:{}};i[r][0].call(u.exports,function(t){var a=i[r][1][t];return e(a?a:t)},u,u.exports,t,i,a,n)}return a[r].exports}for(var o="function"==typeof require&&require,r=0;r<n.length;r++)e(n[r]);return e}({1:[function(t,i,a){"use strict";function n(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var e=function(){function t(t,i){for(var a=0;a<i.length;a++){var n=i[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(i,a,n){return a&&t(i.prototype,a),n&&t(i,n),i}}(),o=4,r=function(){function t(i){return n(this,t),i?(this._imgData=i,this.height=i.height,this.width=i.width,void(this.imgMatrix=[])):!1}return e(t,[{key:"init",value:function(t){this.background=t||{r:0,g:0,b:0,a:0},this.imgDataToMatrix(),this.flagBackgroundPixels()}},{key:"matrixToImgData",value:function(){for(var t=0,i=0;i<this.imgMatrix.length;i++)for(var a=0;a<this.imgMatrix[i].length;a++)this._imgData.data[t]=this.imgMatrix[i][a].r,this._imgData.data[t+1]=this.imgMatrix[i][a].g,this._imgData.data[t+2]=this.imgMatrix[i][a].b,this._imgData.data[t+3]=this.imgMatrix[i][a].a,t+=o}},{key:"imgDataToMatrix",value:function(){for(var t=0;t<this.height;t++){for(var i=[],a=0;a<this.width*o;a+=o)i.push(this.getPixelFromImgData(t,a));this.imgMatrix.push(i)}}},{key:"setShadowPixel",value:function(t,i,a){this.imgMatrix[t+a][i+a].r=this.background.r-50,this.imgMatrix[t+a][i+a].g=this.background.g-50,this.imgMatrix[t+a][i+a].b=this.background.b-50,this.imgMatrix[t+a][i+a].a=this.background.a}},{key:"getPixelFromImgData",value:function(t,i){var a={};return a.r=this._imgData.data[i+t*this.width*o],a.g=this._imgData.data[i+1+t*this.width*o],a.b=this._imgData.data[i+2+t*this.width*o],a.a=this._imgData.data[i+3+t*this.width*o],a}},{key:"shadowfy",value:function(){for(var t=0;t<this.imgMatrix.length;t++)for(var i=0;i<this.imgMatrix[t].length;i++)if(this.imgMatrix[t][i].isBackground===!1)for(var a=1;a+t<this.imgMatrix.length&&a+i<this.imgMatrix[t+a].length;a++)this.imgMatrix[t+a][i+a].isBackground===!0&&this.setShadowPixel(t,i,a)}},{key:"halfMaterial",value:function(){for(var t=0;t<this.imgMatrix.length;t++)for(var i=this.imgMatrix[t].length/2;i<this.imgMatrix[t].length;i++)this.imgMatrix[t][i].g=this.imgMatrix[t][i].g-20}},{key:"flagBackgroundPixels",value:function(){for(var t=0;t<this.imgMatrix.length;t++)for(var i=0;i<this.imgMatrix[t].length;i++)this.isPixelEqual(this.imgMatrix[t][i],this.background)===!0?this.imgMatrix[t][i].isBackground=!0:255===this.imgMatrix[t][i].a&&(this.imgMatrix[t][i].isBackground=!1)}},{key:"isPixelEqual",value:function(t,i){return t.r==i.r&&t.g==i.g&&t.b==i.b&&t.a==i.a}},{key:"imgData",get:function(){return this.matrixToImgData(),this._imgData}}]),t}();a["default"]=r},{}],2:[function(t,i,a){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function e(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},r=function(){function t(t,i){for(var a=0;a<i.length;a++){var n=i[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(i,a,n){return a&&t(i.prototype,a),n&&t(i,n),i}}(),s=t("./ImgCanvas"),h=n(s),c=function(){function t(i,a,n){if(e(this,t),this.canvas=document.getElementById(i),this.icon=document.getElementById(a),this.options={margin:Math.max(this.icon.height,this.icon.width)/2,backgroundColor:{r:0,g:184,b:255,a:255},shape:"rect",isShadowfied:!0},"object"===("undefined"==typeof n?"undefined":o(n)))for(var r in n)n.hasOwnProperty(r)&&(this.options[r]=n[r])}return r(t,[{key:"init",value:function(){var t=void 0;this.width=parseInt(this.icon.width)+this.options.margin,this.height=parseInt(this.icon.height)+this.options.margin,this.ctx=this.canvas.getContext("2d"),this.canvas.height=this.icon.height+this.options.margin,this.canvas.width=this.icon.width+this.options.margin,this.initBackground(),this.ctx.drawImage(this.icon,this.options.margin/2,this.options.margin/2),t=this.ctx.getImageData(0,0,this.height+this.options.margin,this.width+this.options.margin),this.iconCanvas=new h["default"](t),this.iconCanvas.init(this.options.backgroundColor),this.options.isShadowfied===!0&&this.iconCanvas.shadowfy(),this.ctx.putImageData(this.iconCanvas.imgData,0,0)}},{key:"initBackground",value:function(){var t=this.canvas.width/2,i=this.canvas.height/2,a=20,n=Math.max(this.icon.height,this.icon.width)-this.icon.height/4,e="rgba("+this.options.backgroundColor.r+","+this.options.backgroundColor.g+","+this.options.backgroundColor.b+",1)";this.ctx.fillStyle=e,this.ctx.strokeStyle=e,this.ctx.beginPath(),"rect"===this.options.shape?this.ctx.rect(0,0,this.canvas.height+this.options.margin,this.canvas.width+this.options.margin,!1):"round-rect"===this.options.shape?(this.ctx.lineJoin="round",this.ctx.lineWidth=a,this.ctx.strokeRect(0+a/2,0+a/2,this.canvas.width-a,this.canvas.height-a),this.ctx.fillRect(0+a/2,0+a/2,this.canvas.width-a,this.canvas.height-a)):"circle"===this.options.shape?this.ctx.arc(t,i,n,0,2*Math.PI,!1):"hexagone"===this.options.shape&&this.drawPolygone(6,t,i,n),this.ctx.fill()}},{key:"setBackgroundShape",value:function(t){"string"==typeof t&&t.length>0&&(this.options.shape=t)}},{key:"setBackgroundColor",value:function(t){var i=this.hexToRgb(t);return this.isValidPixel(i)===!1?(console.error("invalid color"),!1):void(this.options.backgroundColor=i)}},{key:"reloadCanvas",value:function(){var t=void 0;this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.initBackground(),this.ctx.drawImage(this.icon,this.options.margin/2,this.options.margin/2),t=this.ctx.getImageData(0,0,this.height+this.options.margin,this.width+this.options.margin),this.iconCanvas=new h["default"](t),this.iconCanvas.init(this.options.backgroundColor),this.options.isShadowfied===!0&&this.iconCanvas.shadowfy(),this.ctx.putImageData(this.iconCanvas.imgData,0,0)}},{key:"hexToRgb",value:function(t){var i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return i?{r:parseInt(i[1],16),g:parseInt(i[2],16),b:parseInt(i[3],16),a:255}:null}},{key:"rgbaToPixel",value:function(t){var i=t.replace("rgba(","").replace(")","").split(",");return{r:parseInt(i[0]),g:parseInt(i[1]),b:parseInt(i[2]),a:255}}},{key:"isValidPixel",value:function(t){var i=0;if("object"!==("undefined"==typeof t?"undefined":o(t)))return!1;for(var a in t)if(i++,"number"!=typeof t[a]||t[a]>255||t[a]<0)return!1;return 4==i}},{key:"drawPolygone",value:function(t,i,a,n){this.ctx.beginPath(),this.ctx.moveTo(i+n*Math.cos(0),a+n*Math.sin(0));for(var e=1;t>=e;e+=1)this.ctx.lineTo(i+n*Math.cos(2*e*Math.PI/t),a+n*Math.sin(2*e*Math.PI/t));this.ctx.lineWidth=1,this.ctx.stroke()}},{key:"unsetShadow",value:function(){this.options.isShadowfied=!1}},{key:"setShadow",value:function(){this.options.isShadowfied=!0}},{key:"shadowfy",value:function(){this.iconCanvas.shadowfy()}},{key:"toDataURL",value:function(){return this.canvas.toDataURL("image/png")}}]),t}();a["default"]=c},{"./ImgCanvas":1}],3:[function(t,i,a){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}var e=t("./canvasController"),o=n(e);window.onload=function(){var t=new o["default"]("canvas","source");t.init(),document.getElementById("rect").onclick=function(){t.setBackgroundShape("rect"),t.reloadCanvas()},document.getElementById("circular").onclick=function(){t.setBackgroundShape("circle"),t.reloadCanvas()},document.getElementById("round-rect").onclick=function(){t.setBackgroundShape("round-rect"),t.reloadCanvas()},document.getElementById("colorPicker").onchange=function(){var i=document.getElementById("colorPicker").value;document.getElementById("backgroundColorValue").value=i,t.setBackgroundColor(i),t.reloadCanvas()},document.getElementById("no-shadow").onclick=function(){t.unsetShadow(),t.reloadCanvas()},document.getElementById("long-shadow").onclick=function(){t.setShadow(),t.reloadCanvas()},document.getElementById("download-canvas").onclick=function(){this.href=t.toDataURL()}}},{"./canvasController":2}]},{},[3]);