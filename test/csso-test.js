'use strict';

const fs = require('fs');
const eol = require('os').EOL;

exports.csso = {
  main: function (test) {
    test.expect(1);

    test.equal(
      fs.readFileSync('test/expected/output.css', 'utf8'),
      fs.readFileSync('tmp/output.css', 'utf8'),
    'should minify');

    test.done();
  },
  sourcemap: function (test) {
    test.expect(2);

    test.equal(
      fs.readFileSync('test/expected/sourcemap.css', 'utf8'),
      fs.readFileSync('tmp/sourcemap.css', 'utf8'),
    'should create sourcemap');
    test.equal(
      fs.readFileSync('test/expected/sourcemap.css.map', 'utf8'),
      fs.readFileSync('tmp/sourcemap.css.map', 'utf8'),
    'should create sourcemap');

    test.done();
  },
  comments: function (test) {
    test.expect(1);

    test.equal(
      fs.readFileSync('test/expected/sourcemap.css', 'utf8'),
      fs.readFileSync('tmp/sourcemap.css', 'utf8'),
    'should minify and remove all but the first exclamation comment');

    test.done();
  },
  restructure: function (test) {
    test.expect(1);

    test.equal(
      fs.readFileSync('test/expected/restructure-off.css', 'utf8'),
      fs.readFileSync('tmp/restructure-off.css', 'utf8'),
      'should minify without restructure'
    );

    test.done();
  },
  banner: function (test) {
    test.expect(1);

    test.equal(
      fs.readFileSync('test/expected/banner.css', 'utf8'),
      fs.readFileSync('tmp/banner.css', 'utf8'),
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
  shortcut: function (test) {
    test.expect(1);

    test.equal(
      fs.readFileSync('test/expected/output.css', 'utf8'),
      fs.readFileSync('test/fixtures/override.css', 'utf8'),
      'should override minify'
    );

    test.done();
  },
  dynamicMappings: function (test) {
    test.expect(2);

    test.equal(
      fs.readFileSync('test/expected/output.css', 'utf8'),
      fs.readFileSync('tmp/dest/input.min.css', 'utf8'),
      'should minify with dynamic mappings'
    );

    test.equal(
      fs.readFileSync('test/expected/output2.css', 'utf8'),
      fs.readFileSync('tmp/dest/input2.min.css', 'utf8'),
      'should minify with dynamic mappings'
    );

    test.done();
  },
  plugins: function (test) {
    test.expect(2);

    test.equal(
      'beforeCompress',
      fs.readFileSync('tmp/beforeCompress', 'utf8'),
      'should create the beforeCompress file'
    );

    test.equal(
      'afterCompress',
      fs.readFileSync('tmp/afterCompress', 'utf8'),
      'should create the afterCompress file'
    );

    test.done();
  }
};
