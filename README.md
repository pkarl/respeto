# Respeto

Respeto is a deferred image loader made to support responsive image workflows. It was borne of fire and steel (and some semicolons). This requires [jQuery](http://jquery.org)

## About

que?

## Features

## Usage

1. create a new Respeto object
2. run the `load()` method
3. `src` is set on all of your images based on the data attributes

```javascript
	var rsp = new Respeto();

	// see the AFTER html below to see what happens when `load('large')` runs
	rsp.load('large');
```

```html
	<!-- BEFORE -->

	<img src="kitten.jpg" 	 data-rsp-img="cat.jpg" data-rsp-path="images/cats/">
	<img src="puppy.jpg" 	 data-rsp-img="dog.jpg">
	<img src="baby_fish.jpg" data-rsp-img="fish.jpg">
	<img src="bunny.jpg" 	 data-rsp-img="rabbit.jpg" data-rsp-path="images/wildlife/">
	<img src="kit.jpg" 		 data-rsp-img="fox.jpg" data-rsp-path="images/wildlife/">

	// note: no src on this one
	<img data-rsp-img="wolf.jpg">


	<!-- AFTER -->

	<img src="images/cats/cat_large.jpg" data-rsp-img="cat.jpg" data-rsp-path="images/cats/">
	<img src="dog_large.jpg" data-rsp-img="dog.jpg">
	<img src="fish_large.jpg" data-rsp-img="fish.jpg">
	<img src="images/wildlife/rabbit_large.jpg" data-rsp-img="rabbit.jpg" data-rsp-path="images/wildlife/">
	<img src="images/wildlife/fox_large.jpg" data-rsp-img="fox.jpg" data-rsp-path="images/wildlife/">

	// note: no src on this one
	<img src="wolf.jpg" data-rsp-img="wolf.jpg">
```

## API

### new Respeto(_options_)

* options - _object , optional_ . Respeto parameters, see below

### option

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