/*
 * grunt-source-map
 * https://github.com/dukai/grunt-source-map
 *
 * Copyright (c) 2016 dukai
 * Licensed under the MIT license.
 */

'use strict';
var sep = require('path').sep;

module.exports = function(grunt) {

  grunt.registerMultiTask('source_map', 'grub grunt-cache-bust.json and resource-map.json, parse and generate source map for java velocity', function() {
    grunt.log.writeln('Currently running the "default" task.');

    var options = Object.assign({
      dist: null,
      java: null,
      mergeFiles: [],
      filename: 'source-map.json',
      nomap: false,
      format: false
    }, this.options());


    if(options.nomap){
      require('fs').writeFileSync([options.java, options.filename].join(sep), "{}");
      return;
    }

    var map = {};

    this.files.forEach(function(f){
      grunt.log.debug(JSON.stringify(f));
      if (!grunt.file.exists(f.src[0])) {
        grunt.log.warn('Source file "' + f.src[0] + '" not found.');
      } else {
        var src = grunt.file.read(f.src[0]);
        map = Object.assign(map, JSON.parse(src));
      }
    });

    var newMap = {};

    for(var key in map){
      var newKey;
      grunt.log.debug(newKey = key.replace(/^\.+\//, ''));
      newMap[newKey] = map[key].replace(/^\.+\//, '');
    }

    var out = JSON.stringify(newMap);
    if(options.format){
      out = JSON.stringify(newMap, null, 4);
    }
    grunt.file.write([this.options().dist, options.filename].join(sep), out);
    require('fs').writeFileSync([this.options().java, options.filename].join(sep), out);

  });

};
