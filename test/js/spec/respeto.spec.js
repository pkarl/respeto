//  /*global confirm, mocha */
//  mocha.globals(["confirm"]);

console.log('tests must be run on port 8000 right now, sorry!');

describe('Respeto: A Deferred Image Loader', function () {

  var $fixture =  '<div id="retina-test"   data-rsp-img="cat.jpg"                   ></div>' + 
                  '<div                    data-rsp-img="cat.jpg" class="test-match"></div>' + 
                  '<img src="kitten3.jpg"  data-rsp-img="cat.jpg"                       data-rsp-path="/custom/">' + 
                  '<img src="kitten4.jpg"  data-rsp-img="cat.jpg"                       data-rsp-path="/custom/">' + 
                  '<img src="cat.jpg"                             class="test-include">' + 
                  '<img src="cat.jpg"                             class="test-include">' + 
                  '<div id="test-context">' +
                    '<img                  data-rsp-img="cat.jpg">' + 
                    '<div                  data-rsp-img="cat.jpg" class="test-match test-exclude"></div>' + 
                  '</div>' + 
                  '<img                    data-rsp-img="cat.jpg" class="test-match">' + 
                  '<img src="kitten10.jpg" data-rsp-img="cat.jpg" class="test-exclude">' + 
                  '<div                    data-rsp-img="cat.jpg" class="test-exclude"></div>' + 

  beforeEach(function () {
    $("#fixtures").append($fixture);
  });

  afterEach(function () {
    $("#fixtures").empty();
  });

  describe("module creation, configuration, and destruction", function() {

    // that this creates an accessible object
    it("exists", function() {
      expect(Respeto).to.be.a("function");
    });

    r1 = new Respeto();

    it("has defaults that exist on creation", function() {
      expect(r1).to.be.an("object");
    });

    var r2 = new Respeto({
      retina: true
    });

    // // that the object can be fed options
    it("can have its config overridden", function() {
      expect(r2.settings.retina).to.not.equal(r1.settings.retina);
    });

    it("can have its global retina overridden at load time", function() {
      var src1 = r2._buildImagePath('test/', 'cat.jpg', 'small', true, 2.0);
      var src2 = r2._buildImagePath('test/', 'cat.jpg', 'small', false, 2.0);

      expect(src1).to.have.string(r2.settings.retinaSuffix);
      expect(src1).not.to.equal(src2);
      expect(src2).not.to.have.string(r2.settings.retinaSuffix);
    });

    it("calculates pixel density upon creation", function() {
      var s2 = new Respeto();

      expect(s2._pixelRatio).to.not.equal(undefined);
      expect(s2._pixelRatio).to.not.equal(null);
      expect(s2._pixelRatio).to.not.equal(0);
    });

  });


  describe("Respeto respects a variety of loading methods and configurations", function() {

    var rsp = new Respeto({
      imagePath: 'img/',
      retina: true
    });

    // label load only
    it("respects custom path", function () {

      rsp.load('test0');

      var t0_count = 0;
      $('img[data-rsp-img],div[data-rsp-img],section[data-rsp-img]').each(function() {
        if($(this).attr('src') == '/custom/cat-test0.jpg' || 
           $(this).css('background-image') === 'url(http://127.0.0.1:8000/test/custom/cat-test0.jpg)') {
          t0_count++;
        }
      });

      expect(t0_count).to.equal(2);

    });

    // label load only
    it("respects string load", function () {

      rsp.load('test1');

      var t1_count = 0;
      $('img[data-rsp-img],div[data-rsp-img],section[data-rsp-img]').each(function() {

        console.log('string load, test 1', $(this).attr('src'), $(this).css('background-image'));

        if($(this).attr('src') == 'img/cat-test1.jpg' || 
           $(this).css('background-image') === 'url(http://127.0.0.1:8000/test/img/cat-test1.jpg)') {
          t1_count++;
        }
      });

      expect(t1_count).to.equal(7);

    });

    // context
    it("respects string load with context", function () {

      rsp.load('test2', { context:'#test-context' } );

      var t2_count = 0;
      $('img[data-rsp-img],div[data-rsp-img],section[data-rsp-img]').each(function() {
        if($(this).attr('src') == 'img/cat-test2.jpg' || 
           $(this).css('background-image') === 'url(http://127.0.0.1:8000/test/img/cat-test2.jpg)') {
          t2_count++;
        }
      });

      expect(t2_count).to.equal(2);

    });

    // match & context
    it("respects string load with context and selector match", function () {

      rsp.load('test3', { context: '#test-context', match: '.test-match' });

      var t3_count = 0;
      $('img[data-rsp-img],div[data-rsp-img],section[data-rsp-img]').each(function() {
        if($(this).attr('src') == 'img/cat-test3.jpg' || 
           $(this).css('background-image') === 'url(http://127.0.0.1:8000/test/img/cat-test3.jpg)') {
          t3_count++;
        }
      });

      expect(t3_count).to.equal(1);

    });

    // match only
    it("respects string load with selector match", function () {

      rsp.load('test4', { match: '.test-match' });

      var t4_count = 0;
      $('img[data-rsp-img],div[data-rsp-img],section[data-rsp-img]').each(function() {
        if($(this).attr('src') == 'img/cat-test4.jpg' || 
           $(this).css('background-image') === 'url(http://127.0.0.1:8000/test/img/cat-test4.jpg)') {
          t4_count++;
        }
      });

      expect(t4_count).to.equal(3);

    });

    // exclusion -- this doesn't work with jquery .not(), which only uses the first selector
    // it("respects string load with multiple exclusions", function () {

    //   rsp.load('test5', { exclude: '.test-match, .text-exclude' });

    //   var t5_count = 0;
    //   $('img[data-rsp-img],div[data-rsp-img],section[data-rsp-img]').each(function() {
    //     if($(this).attr('src') == 'img/cat-test5.jpg' || 
    //        $(this).css('background-image') === 'url(http://127.0.0.1:8000/test/img/cat-test5.jpg)') {
    //       t5_count++;
    //     }
    //   });

    //   expect(t5_count).to.equal(9);
    // });

    it("respects string load with match and exclusion", function () {
      rsp.load('test5.1', { match: '.test-match', exclude: '.test-exclude' });

      var t5_1_count = 0;
      $('img[data-rsp-img],div[data-rsp-img],section[data-rsp-img]').each(function() {
        if($(this).attr('src') == 'img/cat-test5.1.jpg' || 
           $(this).css('background-image') === 'url(http://127.0.0.1:8000/test/img/cat-test5.1.jpg)') {
          t5_1_count++;
        }
      });

      expect(t5_1_count).to.equal(2);

    });

    it("respects string load with simple exclusion", function () {

      rsp.load('test5.2', { exclude: '.text-exclude' });

      var t5_2_count = 0;
      $('img[data-rsp-img],div[data-rsp-img],section[data-rsp-img]').each(function() {
        if($(this).attr('src') == 'img/cat-test5.2.jpg' || 
           $(this).css('background-image') === 'url(http://127.0.0.1:8000/test/img/cat-test5.2.jpg)') {
          t5_2_count++;
        }
      });

      expect(t5_2_count).to.equal(7);

    });

  });

});