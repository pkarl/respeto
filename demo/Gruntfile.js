/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    responsive_images: {
      demo: {
        options: {
          separator: '_',
          sizes: [{
            name: 'small',
            width: 320,
            quality: 0.6
          },{
            name: 'large',
            width: 640,
            quality: 0.6
          },{
            name: "large",
            width: 1024,
            suffix: "_x2",
            quality: 0.45
          }]
        },
        files: [{
          expand: true,
          src: ['**.{jpg,gif,png}'],
          cwd: 'src/images',
          dest: 'img'
        }]
      }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-responsive-images');
  
  // Default task.
  grunt.registerTask('default', ['responsive_images']);

};
