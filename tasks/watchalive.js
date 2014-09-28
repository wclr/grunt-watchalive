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
        // Merge task-specific and/or target-specific options with these defaults.
        var done = this.async();

        if (watchalive) {
            watchalive(this.options())
        } else {
            // TODO: use global module
            done()
        }

    });

};
