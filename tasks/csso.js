/*
 * grunt-csso
 * http://github.com/t32k/grunt-csso
 * http://en.t32k.me
 *
 * Copyright (c) 2012 Koji Ishimoto
 * Licensed under the MIT license.
 */
 
'use strict';

module.exports = function (grunt) {

    // Install node modules
    var fs = require('fs'),
        gzip = require('gzip-js'),
        csso = require('csso');


    // Tasks
    // ==========================================================================

    grunt.registerMultiTask('csso', 'Minification task with CSSO.', function () {

        grunt.log.subhead('Optimizing with CSSO...');

        var minBuf,
            inputDir  = this.file.src,
            outputDir = this.file.dest,
            inputBuf  = grunt.file.read(inputDir),
            inputSize = fs.statSync(inputDir).size,
            isOption  = (this.data.restructure === false) ? false : true;

        // Override if `src` only
        if (outputDir === undefined) {
            outputDir = inputDir;
        }

        // Check restructure option
        if (isOption) {
            minBuf = csso.justDoIt(inputBuf);
        } else {
            minBuf = csso.justDoIt(inputBuf, true);
        }

        // Generate minified file
        grunt.file.write(outputDir, minBuf);

        // Output log of result
        printInfo(inputSize, outputDir, minBuf);

    });


    // Helpers
    // ==========================================================================

    // Return gzipped source.
    var getGzip = function (buf) {
        return buf ? gzip.zip(buf, {}) : '';
    };

    // Output some size info about a file.
    var printInfo = function (oSize, mdir, mbuf) {
        var fileName = String(mdir).green,
            origSize = String(oSize).green,
            minSize  = String(fs.statSync(mdir).size).green,
            gzipSize = String(getGzip(mbuf).length).green;
        grunt.log.writeln(' File "' + fileName + '" created.');
        grunt.log.writeln(' Uncompressed size: ' + origSize + ' bytes.');
        grunt.log.writeln(' Compressed size: ' + gzipSize + ' bytes gzipped ( ' + minSize + ' bytes minified ).');
    };

};