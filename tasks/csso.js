/*
 * grunt-csso
 * http://github.com/t32k/grunt-csso
 *
 * Copyright (c) 2013 Koji Ishimoto
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function (grunt) {

  var fs = require('fs');
  var path = require('path');

  var csso = require('csso');
  var chalk = require('chalk');
  var maxmin = require('maxmin');

  grunt.registerMultiTask('csso', 'Minify CSS files with CSSO.', function () {

    var options = this.options({
      restructure: true,
      banner: '',
      report: false
    });

    // Process banner.
    var banner = grunt.template.process(options.banner);

    this.files.forEach(function (file) {
      var dest = file.dest || file.src[0];

      // 1. check existence
      // 2. check file extension
      // 3. load and concatenate css files
      var original = file.src.filter(function (p) {
        if (!fs.existsSync(p)) {
          grunt.log.warn('Source file "' + p + '" is not found.');
          return false;
        } else {
          return true;
        }
      }).filter(function (p) {
        if (path.extname(p) !== '.css') {
          grunt.log.warn('Source file "' + p + '" is not css.');
          return false;
        } else {
          return true;
        }
      }).map(function (p) {
        return fs.readFileSync(p, {
          encoding: 'utf8'
        });
      }).join(grunt.util.normalizelf(grunt.util.linefeed));

      // reverse flag
      var proceed = csso.justDoIt(original, !options.restructure);

      if (proceed.length === 0) {
        grunt.log.warn('Destination is not created because minified CSS was empty.');
      } else {
        // add banner.
        proceed = banner + proceed;

        grunt.file.write(dest, proceed);
        if (options.report) {
          var report = maxmin(original, proceed, options.report === 'gzip');
        }
        grunt.log.writeln('File ' + chalk.cyan(dest) + ' created' + ((report) ? ': ' + report : '.'));
      }
    });
  });
};