/*
 * grunt-watchalive
 * https://github.com/whitecolor/grunt-watchalive
 *
 * Copyright (c) 2014 Whitecolor
 * Licensed under the MIT license.
 */

'use strict';


module.exports = function(grunt) {

    grunt.registerMultiTask('watchalive', 'Watchalive sever grunt plugin', function() {

        var watchalive,
            done = this.async(),
            options = this.options()

        if (!options.useGlobal){
            try {
                watchalive = require('watchalive')
            } catch (e){
                console.log('Could not find local watchalive.')
            }
        }

        if (!watchalive || options.useGlobal) {
            console.log('Using global watchalive module.')
            var tmpDir = require('os').tmpdir()

            var salt = (Math.random()*10).toFixed(),
                configFile = require('path').resolve(tmpDir, 'watchem' + salt + '.json')
            require('fs').writeFileSync(configFile, JSON.stringify(this.options()))

            // TODO: clean up temp config file? Don't know how.
            var child = grunt.util.spawn({
                cmd: 'watchalive',
                args: [configFile]
            }, done)

            process.stdin.pipe(child.stdin);
            child.stdout.pipe(process.stdout);
            child.stderr.pipe(process.stderr);
        } else {
            watchalive(options)
        }

    });

};
