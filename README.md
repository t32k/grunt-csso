# grunt-csso  v0.6.1

[![Build Status](https://secure.travis-ci.org/t32k/grunt-csso.png?branch=master)](http://travis-ci.org/t32k/grunt-csso)
[![NPM version](https://badge.fury.io/js/grunt-csso.png)](http://badge.fury.io/js/grunt-csso)
[![Dependency Status](https://david-dm.org/t32k/grunt-csso.png)](https://david-dm.org/t32k/grunt-csso)
[![devDependency Status](https://david-dm.org/t32k/grunt-csso/dev-status.png)](https://david-dm.org/t32k/grunt-csso#info=devDependencies)


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

## Release History

+ 2014/03/18 - v0.6.1 - Bug fix several bugs.
+ 2014/03/02 - v0.6.0 - Update dependencies modules.
+ 2013/12/19 - v0.5.3 - Bump v0.5.3
+ 2013/11/25 - v0.5.2 - Bump v0.5.2
+ 2013/11/25 - v0.5.1 - Update CSSO.
+ 2013/03/26 - v0.5.0 - Add 'report' option (false by default).
+ 2013/02/25 - v0.4.1 - Add 'banner' option. 
+ 2013/02/17 - v0.4.0 - Support compatibility with Grunt 0.4.
+ 2013/01/17 - v0.3.0 - Improve file handling.
+ 2012/10/20 - v0.2.1 - Fix function to remove unnecessary argument.
+ 2012/10/20 - v0.2.0 - Changed CSSO task from the command line to from the npm module.
+ 2012/10/15 - v0.1.1 - Added keyword "gruntplugin" to package.json.
+ 2012/10/14 - v0.1.0 - Initial release.

## Contributors

Many thanks!

+ [Tyler Kellen](https://github.com/tkellen)
+ [Ayumu Sato](https://github.com/ahomu)
+ [Artem Sapegin](https://github.com/sapegin)

## License

Code is released under [the MIT license](LICENSE).

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/t32k/grunt-csso/trend.png)](https://bitdeli.com/free "Bitdeli Badge")