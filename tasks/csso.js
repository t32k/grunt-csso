/*
 * grunt-csso
 * http://github.com/t32k/grunt-csso
 *
 * Copyright (c) 2013 - 2014 Koji Ishimoto
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function(grunt) {

  var fs = require('fs');
  var csso = require('csso');
  var chalk = require('chalk');
  var maxmin = require('maxmin');

  grunt.registerMultiTask('csso', 'Minify CSS files with CSSO.', function() {

    var options = this.options({
      restructure: true,
      banner: '',
      report: false
    });

    // Process banner.
    var banner = grunt.template.process(options.banner);

    this.files.forEach(function (file) {
      var original = file.src.filter(function (path) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!fs.existsSync(path)) {
          grunt.log.warn('Source file "' + path + '" is not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (path) {
        return fs.readFileSync(path, {
          encoding: 'utf8'
        });
      }).join(grunt.util.normalizelf(grunt.util.linefeed));

      var proceed = csso.justDoIt(original, !options.restructure);
      if (proceed.length < 1) {
        grunt.log.warn('Destination is not created because minified CSS was empty.');
      } else {
        // Add banner.
        proceed = banner + proceed;

        grunt.file.write(file.dest, proceed);
        grunt.log.writeln('File ' + chalk.green(file.dest) + ' created.');
        if (options.report) {
          grunt.log.writeln(maxmin(original, proceed, options.report === 'gzip'));
        }
      }
    });
  });
};