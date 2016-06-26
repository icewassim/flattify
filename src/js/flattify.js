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

  document.getElementById('canvas').onmousedown = function(e) {
    canvasController.setMouseOffset(e);
    canvasController.reloadCanvas(true);
  };

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

  $('input[type=file]').change(function(e){
    $("#fake-form").submit();
  });

  $('#preview-icons-container img').click(function() {
    $("#source").attr("src",this.getAttribute("src"));
    canvasController.reloadCanvas(true);
  });

  document.getElementById("download-canvas").onclick = function() {
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

  const fontsAwesomeArray = ["american-sign-language-interpreting","assistive-listening-systems","audio-description","blind","braille","deaf","envira","font-awesome","first-order","gitlab","glide","glide-g","google-plus-official","instagram","low-vision","pied-piper","question-circle-o","sign-language","snapchat","snapchat-ghost","snapchat-square","themeisle","universal-access","viadeo","viadeo-square","volume-control-phone","wheelchair-alt","wpbeginner","wpforms","yoast","adjust","anchor","archive","area-chart","arrows","arrows-h","arrows-v","asterisk","at","car","balance-scale","ban","university","bar-chart","barcode","bars","battery-empty","battery-quarter","battery-half","battery-three-quarters","battery-full","bed","beer","bell","bell-o","bell-slash","bell-slash-o","bicycle","binoculars","birthday-cake","bluetooth","bluetooth-b","bolt","bomb","book","bookmark","bookmark-o","briefcase","bug","building","building-o","bullhorn","bullseye","bus","taxi","calculator","calendar","calendar-check-o","calendar-minus-o","calendar-o","calendar-plus-o","calendar-times-o","camera","camera-retro","caret-square-o-down","caret-square-o-left","caret-square-o-right","caret-square-o-up","cart-arrow-down","cart-plus","cc","certificate","check","check-circle","check-circle-o","check-square","check-square-o","child","circle","circle-o","circle-o-notch","circle-thin","clock-o","clone","times","cloud","cloud-download","cloud-upload","code","code-fork","coffee","cog","cogs","comment","comment-o","commenting","commenting-o","comments","comments-o","compass","copyright","creative-commons","credit-card","credit-card-alt","crop","crosshairs","cube","cubes","cutlery","tachometer","database","desktop","diamond","dot-circle-o","download","pencil-square-o","ellipsis-h","ellipsis-v","envelope","envelope-o","envelope-square","eraser","exchange","exclamation","exclamation-circle","exclamation-triangle","external-link","external-link-square","eye","eye-slash","eyedropper","fax","rss","female","fighter-jet","file-archive-o","file-audio-o","file-code-o","file-excel-o","file-image-o","file-video-o","file-pdf-o","file-powerpoint-o","file-word-o","film","filter","fire","fire-extinguisher","flag","flag-checkered","flag-o","flask","folder","folder-o","folder-open","folder-open-o","frown-o","futbol-o","gamepad","gavel","gift","glass","globe","graduation-cap","users","hand-rock-o","hand-lizard-o","hand-paper-o","hand-peace-o","hand-pointer-o","hand-scissors-o","hand-spock-o","hashtag","hdd-o","headphones","heart","heart-o","heartbeat","history","home","hourglass","hourglass-start","hourglass-half","hourglass-end","hourglass-o","i-cursor","picture-o","inbox","industry","info","info-circle","key","keyboard-o","language","laptop","leaf","lemon-o","level-down","level-up","life-ring","lightbulb-o","line-chart","location-arrow","lock","magic","magnet","share","reply","reply-all","male","map","map-marker","map-o","map-pin","map-signs","meh-o","microphone","microphone-slash","minus","minus-circle","minus-square","minus-square-o","mobile","money","moon-o","motorcycle","mouse-pointer","music","newspaper-o","object-group","object-ungroup","paint-brush","paper-plane","paper-plane-o","paw","pencil","pencil-square","percent","phone","phone-square","pie-chart","plane","plug","plus","plus-circle","plus-square","plus-square-o","power-off","print","puzzle-piece","qrcode","question","question-circle","quote-left","quote-right","random","recycle","refresh","registered","retweet","road","rocket","rss-square","search","search-minus","search-plus","server","share-alt","share-alt-square","share-square","share-square-o","shield","ship","shopping-bag","shopping-basket","shopping-cart","sign-in","sign-out","signal","sitemap","sliders","smile-o","sort","sort-alpha-asc","sort-alpha-desc","sort-amount-asc","sort-amount-desc","sort-asc","sort-desc","sort-numeric-asc","sort-numeric-desc","space-shuttle","spinner","spoon","square","square-o","star","star-half","star-half-o","star-o","sticky-note","sticky-note-o","street-view","suitcase","sun-o","tablet","tag","tags","tasks","television","terminal","thumb-tack","thumbs-down","thumbs-o-down","thumbs-o-up","thumbs-up","ticket","times-circle","times-circle-o","tint","toggle-off","toggle-on","trademark","trash","trash-o","tree","trophy","truck","tty","umbrella","unlock","unlock-alt","upload","user","user-plus","user-secret","user-times","video-camera","volume-down","volume-off","volume-up","wheelchair","wifi","wrench","hand-o-down","hand-o-left","hand-o-right","hand-o-up","ambulance","subway","train","genderless","transgender","mars","mars-double","mars-stroke","mars-stroke-h","mars-stroke-v","mercury","neuter","transgender-alt","venus","venus-double","venus-mars","file","file-o","file-text","file-text-o","cc-amex","cc-diners-club","cc-discover","cc-jcb","cc-mastercard","cc-paypal","cc-stripe","cc-visa","google-wallet","paypal","btc","jpy","usd","eur","gbp","gg","gg-circle","ils","inr","krw","rub","try","align-center","align-justify","align-left","align-right","bold","link","chain-broken","clipboard","columns","files-o","scissors","outdent","floppy-o","font","header","indent","italic","list","list-alt","list-ol","list-ul","paperclip","paragraph","repeat","undo","strikethrough","subscript","superscript","table","text-height","text-width","th","th-large","th-list","underline","angle-double-down","angle-double-left","angle-double-right","angle-double-up","angle-down","angle-left","angle-right","angle-up","arrow-circle-down","arrow-circle-left","arrow-circle-o-down","arrow-circle-o-left","arrow-circle-o-right","arrow-circle-o-up","arrow-circle-right","arrow-circle-up","arrow-down","arrow-left","arrow-right","arrow-up","arrows-alt","caret-down","caret-left","caret-right","caret-up","chevron-circle-down","chevron-circle-left","chevron-circle-right","chevron-circle-up","chevron-down","chevron-left","chevron-right","chevron-up","long-arrow-down","long-arrow-left","long-arrow-right","long-arrow-up","backward","compress","eject","expand","fast-backward","fast-forward","forward","pause","pause-circle","pause-circle-o","play","play-circle","play-circle-o","step-backward","step-forward","stop","stop-circle","stop-circle-o","youtube-play","500px","adn","amazon","android","angellist","apple","behance","behance-square","bitbucket","bitbucket-square","black-tie","buysellads","chrome","codepen","codiepie","connectdevelop","contao","css3","dashcube","delicious","deviantart","digg","dribbble","dropbox","drupal","edge","empire","expeditedssl","facebook","facebook-official","facebook-square","firefox","flickr","fonticons","fort-awesome","forumbee","foursquare","get-pocket","git","git-square","github","github-alt","github-square","gratipay","google","google-plus","google-plus-square","hacker-news","houzz","html5","internet-explorer","ioxhost","joomla","jsfiddle","lastfm","lastfm-square","leanpub","linkedin","linkedin-square","linux","maxcdn","meanpath","medium","mixcloud","modx","odnoklassniki","odnoklassniki-square","opencart","openid","opera","optin-monster","pagelines","pied-piper-alt","pied-piper-pp","pinterest","pinterest-p","pinterest-square","product-hunt","qq","rebel","reddit","reddit-alien","reddit-square","renren","safari","scribd","sellsy","shirtsinbulk","simplybuilt","skyatlas","skype","slack","slideshare","soundcloud","spotify","stack-exchange","stack-overflow","steam","steam-square","stumbleupon","stumbleupon-circle","tencent-weibo","trello","tripadvisor","tumblr","tumblr-square","twitch","twitter","twitter-square","usb","viacoin","vimeo","vimeo-square","vine","vk","weixin","weibo","whatsapp","wikipedia-w","windows","wordpress","xing","xing-square","y-combinator","yahoo","yelp","youtube","youtube-square","h-square","hospital-o","medkit","stethoscope","user-md"];
  var finalHtml = "";
  for (var i = 0; i < fontsAwesomeArray.length; i++) {
    finalHtml += "<a href='/icon/"+fontsAwesomeArray[i]+"'><i class='fa fa-"+fontsAwesomeArray[i]+" fa-3x' ></i></a>";
  }
  $("#icon-content")[0].innerHTML = finalHtml;
}

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000,"linear");
        return false;
      }
    }
  });
});
