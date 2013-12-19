'use strict';

var grunt = require('grunt');

exports.cssmin = {
  main: function (test) {
    test.expect(1);

    var expect = grunt.file.read('test/expected/output.css');
    var result = grunt.file.read('tmp/output.css');
    test.equal(expect, result, 'should minify');

    test.done();
  },
  restructure: function (test) {
    test.expect(1);

    var expect = grunt.file.read('test/expected/restructure.css');
    var result = grunt.file.read('tmp/restructure.css');
    test.equal(expect, result, 'should not structure minimization');

    test.done();
  },
  banner: function (test) {
    test.expect(1);

    var expect = grunt.file.read('test/expected/banner.css');
    var result = grunt.file.read('tmp/banner.css');
    test.equal(expect, result, 'should minify and prefix banner');

    test.done();
  },
  empty: function (test) {
    test.expect(1);

    test.ok(!grunt.file.exists('tmp/idontexist.css'), 'Empty minified file should not exist');

    test.done();
  },
  dynamic_mappings: function (test) {
    test.expect(2);

    var expect = grunt.file.read('test/expected/output.css');
    var result = grunt.file.read('tmp/dest/input.min.css');
    test.equal(expect, result, 'should minify with dynamic mappings');

    var expect2 = grunt.file.read('test/expected/output2.css');
    var result2 = grunt.file.read('tmp/dest/input2.min.css');
    test.equal(expect2, result2, 'should minify with dynamic mappings');

      test.done();
  }
};