'use strict';

var fs = require('fs');

exports.csso = {
  main: function (test) {
    test.expect(1);

    test.equal(
      fs.readFileSync('test/expected/output.css', {encoding: 'utf8'}),
      fs.readFileSync('tmp/output.css', {encoding: 'utf8'}),
    'should minify');

    test.done();
  },
  restructure: function (test) {
    test.expect(1);

    test.equal(
      fs.readFileSync('test/expected/restructure.css', {encoding: 'utf8'}),
      fs.readFileSync('tmp/restructure.css', {encoding: 'utf8'}),
      'should minify with restructure'
    );

    test.done();
  },
  banner: function (test) {
    test.expect(1);

    test.equal(
      fs.readFileSync('test/expected/banner.css', {encoding: 'utf8'}),
      fs.readFileSync('tmp/banner.css', {encoding: 'utf8'}),
      'should minify css and prepend prefix banner'
    );

    test.done();
  },
  empty: function (test) {
    test.expect(1);

    test.ok(
      !fs.existsSync('tmp/idontexist.css'),
      'Empty minified file should not exist'
    );

    test.done();
  },
  dynamicMappings: function (test) {
    test.expect(2);

    test.equal(
      fs.readFileSync('test/expected/output.css', {encoding: 'utf8'}),
      fs.readFileSync('tmp/dest/input.min.css', {encoding: 'utf8'}),
      'should minify with dynamic mappings'
    );

    test.equal(
      fs.readFileSync('test/expected/output2.css', {encoding: 'utf8'}),
      fs.readFileSync('tmp/dest/input2.min.css', {encoding: 'utf8'}),
      'should minify with dynamic mappings'
    );

    test.done();
  }
};