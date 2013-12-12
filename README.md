# Respeto

Respeto is a deferred image loader made to support responsive image workflows. It was borne of fire and steel (and some semicolons).

## TODO

* finish explaining what this is
* remove SSM from the explanation because it's unreliable
* explain bandwidth vs. JS support implications
* nod to the ongoing responsive image standards conversation

## Usage

This can be used by itself, or with a responsive state manager like [Simple State Manager](https://github.com/SimpleStateManager/SimpleStateManager). I recommend the latter, and will provide documentation to support that implementation.

**1** - Download the latest version of Respeto [here](NEED_DOWNLOAD_LINK)

> Respeto depends on [jQuery](https://jquery.org/)

**2** - Add respeto.js to your HTML document (I recommend putting this at the bottom, before your closing `</body>` tag)

```html
	...
	<script src="path_to_js/respeto.js"></script>
</body>
```

**3** - Add Respeto data attributes where you want to manage image loading

```html
<img src="lincoln_fallback.jpg" data-rsp-img="portrait_lincoln.jpg">
<img data-rsp-img="portrait_washington.jpg">
<img data-rsp-img="portrait_obama.jpg" data-rsp-path="custom/path/">
<div data-rsp-img="portrait_obama.jpg"></div>
```

**4** - Create a Respeto object and run the `load()` method

```javascript
$(function() { // jQuery.on('ready')

	var rsp = new Respeto();
	rsp.load('tablet');

});
```

**5** - ...and your `img` elements get their `src` attributes set, and new images will load

```html
<img src="portrait_lincoln_tablet.jpg" data-rsp-img="portrait_lincoln.jpg">
<img src="portrait_washington_tablet.jpg" data-rsp-img="portrait_washington.jpg">
<img src="custom/path/portrait_obama_tablet.jpg" data-rsp-img="portrait_obama.jpg" data-rsp-path="custom/path/">
<div style="background-image: url(http://your_site.com/portrait_obama_tablet.jpg)" data-rsp-img="portrait_obama.jpg"></div>
```

**6** - [optional] Simple state-based usage

```javascript

// this should be inside of a jQuery $.ready() function

var rsp = new Respeto();

var width = $(window).width();

if(width <= 480) {
  rsp.load('small'); // loads images with _small suffix
}

if(width > 480 && width <= 1024) {
  rsp.load('large'); // sets image sources with _large suffix
}

if(width > 1024) {
  rsp.load('huge'); // loads images with _huge suffix
}
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

##### Before running `rsp.load()`:
```html
<img class="load-me" data-rsp-img="dog.jpg">
<img class="load-me" data-rsp-img="fish.jpg">
<img data-rsp-img="cat.jpg">
<img data-rsp-img="monkey.jpg">
<img class="load-me" data-rsp-img="elephant.jpg">
<img data-rsp-img="giraffe.jpg">
```

##### After running `rsp.load()`:
```html
<img src="dog_small.jpg" class="load-me" data-rsp-img="dog.jpg"> <!-- match! -->
<img src="fish_small.jpg" class="load-me" data-rsp-img="fish.jpg"> <!-- match! -->
<img data-rsp-img="cat.jpg">
<img data-rsp-img="monkey.jpg">
<img src="elephant_small.jpg" class="load-me" data-rsp-img="elephant.jpg"> <!-- match! -->
<img data-rsp-img="giraffe.jpg">
	
```

#### Contextual image-loading

```javascript

var rsp = new Respeto();

// load our "large" images inside of elements with id of 'page-1'
rsp.load('large', {
	context: '#page-1'
});
```

##### Before running `load()`:
```html
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
```

##### After running `load()`:
```html
<section id="#page-1">
	<img src="dog_large.jpg" data-rsp-img="dog.jpg"> <!-- match! -->
	<img src="fish_large.jpg" data-rsp-img="fish.jpg"> <!-- match! -->
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