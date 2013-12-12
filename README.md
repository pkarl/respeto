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