# grunt-csso

This is a custom grunt.js multitask aka [gruntplugin](http://jsfiddle.net/cowboy/qzRjD/show/) that minification task with [CSSO](http://css.github.com/csso/) for you.

## Dependencies

You need to have [node.js](http://nodejs.org/), [grunt.js](https://github.com/cowboy/grunt), installed for this to work.

## Installation & Options

1. Install this grunt plugin next to your project's grunt.js gruntfile with: `npm install grunt-csso`.
2. Call `grunt.loadNpmTasks('grunt-csso')` in your gruntfile.
3. Configure `grunt csso` to minimizes your CSS file and call the task(s).
	e.g.:

	```javascript
    csso: {
      dist: {
        src: 'assets/css/core.css',
        dest:'assets/css/core.min.css'
      }
    }
	```

4. You can turns structure minimization off like this:

    ```javascript
    // Default value is true.
    restructure: false
    ```

# An Example Setup

This is the "full" format.

```javascript
csso: {
  dev: {
    src: '../files/css/dev/app.css',
    dest:'../files/css/dev/app.min.css',
    restructure: false
  }
  prod: {
    // Override 'src' if 'dest' is undefiend.
    src: '../files/css/app.css',
  }
}
```

You can write with the "compact" format.

```javascript
csso: {
  // 'dest' : 'src'
  'foo.min.css' : 'foo.css',
  'bar.min.css' : 'bar.css',
  'min.min.css' : 'baz.css'
}
```

# Release History

+ 2012/10/20 - v0.2.1 - Fix function to remove unnecessary argument,
+ 2012/10/20 - v0.2.0 - Changed CSSO task from the command line to from the npm module.
+ 2012/10/15 - v0.1.1 - Added keyword "gruntplugin" to package.json.
+ 2012/10/14 - v0.1.0 - Initial release.


# LICENSE MIT

Copyright (c) 2012 Koji Ishimoto

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
