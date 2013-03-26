'use strict';

var grunt = require('grunt');

exports.cssmin = {
  main: function(test) {
    test.expect(1);

    var expect = grunt.file.read('test/expected/output.css');
    var result = grunt.file.read('tmp/output.css');
    test.equal(expect, result, 'should minify');

    test.done();
  },
  restructure: function(test) {
    test.expect(1);

    var expect = grunt.file.read('test/expected/restructure.css');
    var result = grunt.file.read('tmp/restructure.css');
    test.equal(expect, result, 'should not structure minimization');

    test.done();
  },
  banner: function(test) {
    test.expect(1);

    var expect = grunt.file.read('test/expected/banner.css');
    var result = grunt.file.read('tmp/banner.css');
    test.equal(expect, result, 'should minify and prefix banner');

    test.done();
  },
  empty: function(test) {
    test.expect(1);

    test.ok(!grunt.file.exists('tmp/idontexist.css'), 'Empty minified file should not exist');

    test.done();
  }
};