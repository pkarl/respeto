# Respeto

Respeto is a deferred image loader made to support responsive image workflows. It was borne of fire and steel (and some semicolons). This requires [jQuery](http://jquery.org)

## About

que?

## Features

## Usage

This can be used by itself, or with a responsive state manager like [Simple State Manager](https://github.com/SimpleStateManager/SimpleStateManager). I recommend the latter, and will provide documentation to support that implementation.

1 - Download the latest version of Respeto [here](NEED_DOWNLOAD_LINK)
 * It depends on jQuery and I recommend you use Simple State Manager, too

2 - Add respeto.js to your HTML document (I recommend putting this at the bottom, before your closing `</body>` tag)

```html
	...
	<script src="path_to_js/respeto.js"></script>
</body>
```

3 - Add Respeto data attributes where you want to manage image loading

```html
<img src="lincoln_fallback.jpg" data-rsp-img="portrait_lincoln.jpg">
<img data-rsp-img="portrait_washington.jpg">
<img data-rsp-img="portrait_obama.jpg" data-rsp-path="custom/path/">
```

4 - Create a Respeto object and run the `load()` method

```javascript
$(function() { // jQuery.on('ready')

	var rsp = new Respeto();
	rsp.load('tablet');

});
```

5 - ...and your `img` elements get their `src` attributes set, and new images will load

```html
<img src="portrait_lincoln.jpg" data-rsp-img="portrait_lincoln.jpg">
<img src="portrait_washington.jpg" data-rsp-img="portrait_washington.jpg">
<img src="custom/path/portrait_obama.jpg" data-rsp-img="portrait_obama.jpg" data-rsp-path="custom/path/">
```

6 - [optional] Simple State Manager configuration

```javascript
ssm.addState({
    id: 'mobile',
    maxWidth: 480,
    onEnter: function(){
        rsp.load('small');
    }
});

ssm.addState({
    id: 'tablet',
    minWidth: 480,
    maxWidth: 1023,
    onEnter: function(){
        rsp.load(''); // resets cat_small.jpg to cat.jpg
    }
});

ssm.addState({
    id: 'desktop',
    minWidth: 1024,
    onEnter: function(){
        rsp.load('large');
    }
});
```

## API

### new Respeto(_options_)

* options - _object , optional_ . Respeto parameters, see below

#### Usage

```javascript
var rsp = new Respeto();
```

Returns the object with the following methods:

* rsp.load(label, _options_) - processes targets that contain Respeto data attributes and assigns `src` or `style` properties as necessary. `options` is an optional object where you may specify a context, a selector to match, and/or a selector to exclude:
 * *context*: a jQuery selector that limits the scope of what you're loading. Useful if you're working in a single-page app, and you only want to load images inside a specific container.
 * *match*: a jQuery selector that limits the scope of what you're loading to elements that match this option.
 * *exclude*: a single jQuery selector (not comma-delimited)

### options

<table border="0" cellspacing="0">
    <thead>
    	<td align="center"><strong>Parameter</strong></td>
    	<td align="center"><strong>Type</strong></td>
    	<td align="center"><strong>Default Value</strong></td>
    	<td align="center"><strong>Example</strong></td>
    	<td align="center"><strong>Description</strong></td>
  	</thead>
  	<tr>
  		<td><strong>imageDataAttribute</strong></td>
  		<td>string</td>
  		<td>'rsp-img'</td>
  		<td>'image-source'</td>
  		<td>This translates into a <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_data_attributes">data attribute</a> that contains a source image. Using the default, it will look like this: <code>&lt;img data-rsp-img=&ldquo;your_image_here.jpg&rdquo;&gt;</code></td>
  	</tr>
  	<tr>
  		<td><strong>imagePathAttribute</strong></td>
  		<td>string</td>
  		<td>'rsp-path'</td>
  		<td>'custom-path'</td>
  		<td>This is the data attribute with will contain paths for each image that wishes to override the global <code>imagePath</code>.</td>
  	</tr>
  	<tr>
  		<td><strong>imagePath</strong></td>
  		<td>string</td>
  		<td>''</td>
  		<td>'images/'</td>
  		<td>This path will be prefixed onto every source image. If a <code>data-rsp-path</code> is present, imagePath will be ignored.</td>
  	</tr>
  	<tr>
  		<td><strong>disableRetina</strong></td>
  		<td>boolean</td>
  		<td>true</td>
  		<td>false</td>
  		<td>If you wish to enable retina suffixes (for instance, if you are generating retina alternatives), set this to <code>false</code>.</td>
  	</tr>
  	<tr>
  		<td><strong>retinaSuffix</strong></td>
  		<td>string</td>
  		<td>'_x2'</td>
  		<td>'@2'</td>
  		<td><code>retinaSuffix</code> determines the suffix that will be attached when <code>disableRetina</code> is false, and users are accessing your site on a retina-friendly device.</td>
  	</tr>
</table>

### Minimizing Requests/Bandwidth vs. JavaScript support

TBD

### Advanced

#### Loading images based on class matching

```javascript
var rsp = new Respeto();
rsp.load('small', {
	match: '.load-me'
});
```

```html

<!-- BEFORE -->
<img class="load-me" data-rsp-img="dog.jpg">
<img class="load-me" data-rsp-img="fish.jpg">
<img data-rsp-img="cat.jpg">
<img data-rsp-img="monkey.jpg">
<img class="load-me" data-rsp-img="elephant.jpg">
<img data-rsp-img="giraffe.jpg">

<!-- AFTER -->
<img src="dog_small.jpg" class="load-me" data-rsp-img="dog.jpg">
<img src="fish_small.jpg" class="load-me" data-rsp-img="fish.jpg">
<img data-rsp-img="cat.jpg">
<img data-rsp-img="monkey.jpg">
<img src="elephant_small.jpg" class="load-me" data-rsp-img="elephant.jpg">
<img data-rsp-img="giraffe.jpg">
	
```

#### Contextual image-loading

```javascript
var rsp = new Respeto();
rsp.load('large', {
	context: '#page-1'
});
```

```html

<!-- BEFORE -->
<section id="#page-1">
	<img data-rsp-img="dog.jpg">
	<img data-rsp-img="fish.jpg">
</section>

<section id="#page-2">
	<img data-rsp-img="cat.jpg">
	<img data-rsp-img="monkey.jpg">
</section>

<section id="#page-3">
	<img data-rsp-img="elephant.jpg">
	<img data-rsp-img="giraffe.jpg">
</section>

<!-- AFTER -->
<section id="#page-1">
	<img src="dog_large.jpg" data-rsp-img="dog.jpg">
	<img src="fish_large.jpg" data-rsp-img="fish.jpg">
</section>

<section id="#page-2">
	<img data-rsp-img="cat.jpg">
	<img data-rsp-img="monkey.jpg">
</section>

<section id="#page-3">
	<img data-rsp-img="elephant.jpg">
	<img data-rsp-img="giraffe.jpg">
</section>
	
```