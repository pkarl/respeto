/*global console:false, jQuery:false */
/*jshint strict:false */

/*
 * Respeto 0.1+ - Responsive Image Loader
 * http://TBD
 *
 * Copyright 2013, Pete Karl, Upstatement
 * http://peterthelion.com/
 * http://upstatement.com/
 *
 * Licensed under MIT
 *
 * Updated on: TBD
*/
var Respeto = function (options) {

    // Create the defaults once
    var defaults = {
          imageDataAttribute: 'rsp-img',
          imagePathAttribute: 'rsp-path',

          imagePath: '',

          retina: false, // don't append retina suffix
          retinaSuffix: '_x2',

          // searchTags: ['img','div'] // FUTURE, assumes img + div for now
          // scaleCSSPrefix: 'rsp-scale-', // FUTURE
          // autoConserve: false, // FUTURE
        };

    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;

    this._pixelRatio = (window.hasOwnProperty('devicePixelRatio') ? window.devicePixelRatio : 1);
    this._scale = 100;

    if(this._pixelRatio > 1) {
      this._scale = 1 / this._pixelRatio;
    }
};

Respeto.prototype = {
    load: function(label, options) {
      if(!options) {
        options = {};
      }
      
      var $targets = this._fetchTargets(
        options.match || undefined, 
        options.exclude || undefined, 
        options.context || document
      );

      var retina = options.retina || this.settings.retina;

      this._reSource($targets, label, retina);
    },

    _reSource: function(targets, label, retina) {
      var _this = this;

      targets.each(function() {
        var $t = $(this);
        var userImg = $t.data(_this.settings.imageDataAttribute);

        if(!userImg) {
          return;
        }

        var path = $t.data(_this.settings.imagePathAttribute) || _this.settings.imagePath;

        var imgSrc = _this._buildImagePath(path, userImg, label, retina, _this._pixelRatio)

        if($t.is('img')) {
          $t.attr('src', imgSrc);
        } else {
          $t.css('background-image', 'url(' + imgSrc + ')');
        }
      });
    },

    _buildImagePath: function(path, imgData, label, retina, pixelRatio) {

      console.log(path, imgData, label, retina, pixelRatio);

      var imgExt = imgData.slice(-4);
      var imgBase = imgData.slice(0,-4);

      var retinaSuffix = '';
      if(retina === true && pixelRatio > 1){
        retinaSuffix = this.settings.retinaSuffix;
      }

      return path + imgBase + (label ? '_' + label : '') + retinaSuffix + imgExt;
    },

    _fetchTargets: function(match, exclude, scope) {
      if(match) {
        return $(scope).find(match).not(exclude);
      }

      var selector = '';
      for(var x in this.settings.searchTags) {
        selector += this.settings.searchTags[x] + '[data-' + this.settings.imageDataAttribute + ']';
      }

      return $(scope).find('img[data-rsp-img],div[data-rsp-img]').not(exclude);
    }
};

if ( typeof( module ) !== 'undefined' ) {
  module.exports = Respeto;
}