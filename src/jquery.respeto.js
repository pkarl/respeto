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

          disableRetina: false, // don't append _x2, even if it's available
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

      this._reSource($targets, label);
    },

    _reSource: function(targets, label) {
      var _this = this;

      targets.each(function() {
        var $t = $(this);
        var userImg = $t.data(_this.settings.imageDataAttribute);

        if(!userImg) {
          return;
        }

        var path = $t.data(_this.settings.imagePathAttribute) || _this.settings.imagePath;

        var imgExt = userImg.slice(-4);
        var imgBase = userImg.slice(0,-4);

        var imgSrc = path + imgBase + '_' + label + (_this.settings.disableRetina ? '' : _this.settings.retinaSuffix) + imgExt;

        if($t.is('img')) {
          $t.attr('src', imgSrc);
        } else {
          $t.css('background-image', 'url(' + imgSrc + ')');
        }
      });
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