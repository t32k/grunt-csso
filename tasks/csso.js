module.exports = function( grunt ) {

    // Create a new multi task.
    grunt.registerMultiTask( 'csso', 'This triggers the `csso` command.', function() {

        // Tell grunt this task is asynchronous.
        var done = this.async(),
            exec = require('child_process').exec,
            command = "csso",
            src = undefined,
            dest = undefined,
            restructure = this.data.restructure;

        if ( this.data.src !== undefined ) {
            src = grunt.template.process(this.data.src);
        }

        if ( this.data.dest !== undefined ) {
            dest = grunt.template.process(this.data.dest);
        }

        if ( src !== undefined && dest !== undefined ) {
            command += ' ' + src + ' ' + dest;
        }
        if ( src !== undefined && dest === undefined ) {
            command += ' ' + src;
        }
        if ( restructure === false ) {
            command += ' -off ';
        }
        if ( src === undefined && dest === undefined ) {
            grunt.log.error();
            grunt.log.write( 'CSSO `src` is undefined.\n' );
            return false;
        }
        
        function puts( error, stdout, stderr ) {
            grunt.log.write( '\n\nCSSO output:\n' );
            grunt.log.write( stdout );
            if ( error !== null ) {
                grunt.log.error( error );
                done(false);
            }
            else {
                done(true);
            }
        }
        exec( command, puts );
        grunt.log.write( '`' + command + '` was initiated.' );
    });
};
