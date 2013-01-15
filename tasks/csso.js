/*
 * grunt-csso
 * http://github.com/t32k/grunt-csso
 * http://en.t32k.me
 *
 * Copyright (c) 2012 Koji Ishimoto
 * Licensed under the MIT license.
 */
module.exports = function (grunt) {

    'use strict';

    // Install node modules
    var fs   = require('fs'),
        gzip = require('gzip-js'),
        csso = require('csso'),
        path = require('path');


    // Tasks
    // ==========================================================================

    grunt.registerMultiTask('csso', 'Minification task with CSSO.', function () {

        grunt.log.subhead('Optimizing with CSSO...');

        var helpers = require('grunt-lib-contrib').init(grunt),
            options = helpers.options(this, {
                basePath: false,
                flatten: false
            }),
            isOption = options.restructure !== false;

        this.files = this.files || helpers.normalizeMultiTaskFiles(this.data, this.target);

        this.files.forEach(function(file) {
            file.dest    = path.normalize(file.dest);
            var srcFiles = grunt.file.expand(file.src),
                basePath;

            // output to specific dir
            if (helpers.isIndividualDest(file.dest)) {
                basePath = helpers.findBasePath(srcFiles, options.basePath);

                srcFiles.forEach(function(srcFile) {
                    var newFileDest = helpers.buildIndividualDest(file.dest, srcFile, basePath, options.flatten);
                    processCSSO(srcFile, newFileDest, isOption);
                });

            // output to each dest file
            } else {
                srcFiles.forEach(function(srcFile) {
                    processCSSO(srcFile, file.dest, isOption);
                });
            }
        });
    });


    // Helpers
    // ==========================================================================

    /**
     * Process CSSO minification
     * @param {String} src
     * @param {String} dest
     * @param {Boolean} isOption
     */
    var processCSSO = function (src, dest, isOption) {
        var inputBuf = grunt.file.read(src),
            inputSize = fs.statSync(src).size,
            minBuf;

        // Check restructure option
        if (isOption) {
            minBuf = csso.justDoIt(inputBuf);
        } else {
            minBuf = csso.justDoIt(inputBuf, true);
        }

        // Generate minified file
        grunt.file.write(dest, minBuf);

        // Output log of result
        printInfo(inputSize, dest, minBuf);
    };

    /**
     * Return gzipped source.
     *
     * @param {Buffer} buf
     */
    var getGzip = function (buf) {
        return buf ? gzip.zip(buf, {}) : '';
    };

    /**
     * Output some size info about a file.
     *
     * @param {Number} oSize
     * @param {String} mdir
     * @param {Buffer} mbuf
     */
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