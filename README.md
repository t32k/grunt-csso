# grunt-csso [![Build Status](https://secure.travis-ci.org/t32k/grunt-csso.svg?branch=master)](http://travis-ci.org/t32k/grunt-csso) [![Dependency Status](https://david-dm.org/t32k/grunt-csso.svg)](https://david-dm.org/t32k/grunt-csso)

> Minify CSS files with CSSO.

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

Choices: `false`, `true`, `'min'`, `'gzip'`  
Default: `false`

Either report only minification result or report minification and gzip results. This is useful to see exactly how well clean-css is performing but using `'gzip'` will make the task take 5-10x longer to complete. [Example output](https://github.com/sindresorhus/maxmin#readme).


#### beforeCompress

Type: `(ast, options, csso) => {}`, `[(ast, options, csso) => {}]`  
Default: `null`

Allows registering one or many `beforeCompress` functions. This is useful to add manipulate the AST before compression is made by csso.

#### afterCompress

Type: `(ast, options, csso) => {}`, `[(ast, options, csso) => {}]`  
Default: `null`

Allows registering one or many `afterCompress` functions. This is useful to add manipulate the AST after compression is made by csso.

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
