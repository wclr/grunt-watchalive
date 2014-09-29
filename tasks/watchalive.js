/*
 * grunt-watchalive
 * https://github.com/whitecolor/grunt-watchalive
 *
 * Copyright (c) 2014 Whitecolor
 * Licensed under the MIT license.
 */

'use strict';

var watchalive

try {
    watchalive = require('watchalive')
} catch (e){
    console.log('Could not find local watchalive')
}


module.exports = function(grunt) {

    grunt.registerMultiTask('watchalive', 'Watchalive sever grunt plugin', function() {

        var done = this.async(),
            options = this.options()

        if (!watchalive || options.useGlobal) {
            var tmpDir = require('os').tmpdir()

            var salt = (Math.random()*10).toFixed(),
                configFile = require('path').resolve(tmpDir, 'watchem' + salt + '.json')
            require('fs').writeFileSync(configFile, JSON.stringify(this.options()))

            // TODO: clean up temp config file? Don't know how.
            var child = grunt.util.spawn({
                cmd: 'watchalive',
                args: [configFile]
            }, done)

            child.stdout.pipe(process.stdout);
            child.stderr.pipe(process.stderr);
        } else {
            watchalive(options)
        }

    });

};
