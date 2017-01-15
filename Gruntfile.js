/*
 * grunt-csso
 * http://github.com/t32k/grunt-csso
 *
 * Copyright (c) 2013-2016 Koji Ishimoto
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['tmp']
    },

    // Configuration to be run (and then tested).
    csso: {
      compress: {
        options: {
          report: 'gzip'
        },
        files: {
          'tmp/output.css': ['test/fixtures/input.css']
        }
      },
      sourcemap: {
        options: {
            sourceMap: true
        },
        files: {
          'tmp/sourcemap.css': ['test/fixtures/autoprefixer.css']
        }
      },
      restructure: {
        options: {
          restructure: false,
          report: 'min'
        },
        files: {
          'tmp/restructure-off.css': ['test/fixtures/input.css']
        }
      },
      banner: {
        options: {
          banner: '/* Copyleft */'
        },
        files: {
          'tmp/banner.css': ['test/fixtures/input.css']
        }
      },
      empty: {
        files: {
          'tmp/idontexist.css': ['test/fixtures/idontexist.css']
        }
      },
      shortcut: {
        src: 'test/fixtures/override.css'
      },
      dynamicMappings: {
        files: [{
          expand: true,
          cwd: 'test/fixtures',
          src: ['*.css', '!*.min.css'], //must *
          dest: 'tmp/dest/',
          ext: '.min.css'
        }]
      },
      plugins: {
        options: {
          beforeCompress: function (ast, options, csso) {
            require('fs').writeFileSync('tmp/beforeCompress', 'beforeCompress');
          },
          afterCompress: [function (ast, options, csso) {
            require('fs').writeFileSync('tmp/afterCompress', 'afterCompress');
          }]
        },
        files: {
          'tmp/plugins.css': 'test/fixtures/input.css'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*-test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('default', ['test']);
  grunt.registerTask('test', ['clean', 'csso', 'nodeunit']);

};
