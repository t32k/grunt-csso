# grunt-csso

[![Build Status](https://secure.travis-ci.org/t32k/grunt-csso.svg?branch=master)](http://travis-ci.org/t32k/grunt-csso)
[![Dependency Status](https://david-dm.org/t32k/grunt-csso.svg)](https://david-dm.org/t32k/grunt-csso)

> Minify CSS files with CSSO.

## Getting Started
This plugin requires Grunt `>=0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-csso --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of js:

```js
grunt.loadNpmTasks('grunt-csso');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4).*


## CSSO task

Run this task with the `grunt csso` command.

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

Files are compressed with [csso](http://css.github.io/csso/).


### Options

#### restructure

Type: `Boolean`  
Default: `true`

You can turns __[structural optimizations](http://bem.info/tools/optimizers/csso/description/)__ off.

#### banner

Type: `String`  
Default: `null`

Prefix the compressed source with the given banner, with a linebreak inbetween.


#### report

Choise: `false`, `'min'`, `'gzip'`  
Default: `false`

Either report only minification result or report minification and gzip results. This is useful to see exactly how well clean-css is performing but using `'gzip'` will make the task take 5-10x longer to complete. [Example output](https://github.com/sindresorhus/maxmin#readme).


### Usage Examples

```js
csso: {
  compress: {
    options: {
      report: 'gzip'
    },
    files: {
      'output.css': ['input.css']
    }
  },
  restructure: {
    options: {
      restructure: false,
      report: 'min'
    },
    files: {
      'restructure.css': ['input.css']
    }
  },
  banner: {
    options: {
      banner: '/* Copyleft */'
    },
    files: {
      'banner.css': ['input.css']
    }
  },
  shortcut: {
    src: 'override.css'
  }
}
```

#### Minify all contents of a release directory and add a `.min.css` extension

```js
csso: {
  dynamic_mappings: {
    expand: true,
    cwd: '/css/',
    src: ['*.css', '!*.min.css'],
    dest: 'dest/css/',
    ext: '.min.css'
  }
}
```

## License

Code is released under [the MIT license](LICENSE).