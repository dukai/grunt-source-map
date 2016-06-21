/*
 * grunt-source-map
 * https://github.com/dukai/grunt-source-map
 *
 * Copyright (c) 2016 dukai
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var config = {
    dist: 'test',
    testroot: 'test',
    javaFile: 'test/resource'
  };

  // Project configuration.
  grunt.initConfig({
    config: config,
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    source_map: {
      bust:{
        options:{
          dist: '<%= config.dist%>',
          java: '<%= config.javaFile%>'
        },
        files: [{
          expand: true, 
          cwd: '<%= config.dist %>',
          src: ['grunt-cache-bust.json', 'resource-map.json'], 
          dest: '<%= config.dist %>'
        }]
      },

      debug: {
        options: {
          nomap: true,
          java: '<%= config.javaFile%>',
          filename: 'source-map.json'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'source_map:bust', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
