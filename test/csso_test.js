'use strict';

var grunt = require('grunt');

exports.cssmin = {
  main: function(test) {
    test.expect(1);

    var expect = grunt.file.read('test/expected/output.css');
    var result = grunt.file.read('tmp/output.css');
    test.equal(expect, result, 'should concat and minify an array of css files in order using clean-css');

    test.done();
  }
};