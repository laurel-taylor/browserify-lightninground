'use strict';

var browserify = require('browserify'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    notify = require('gulp-notify');

var config =  {
	compiledScriptsPath: 'build',
	compiledScriptName: 'bundle.js'
  } 

// Bundle script files with browserify
gulp.task('browserify', function() {
    var b = browserify({
        entries: ['scripts/app.js'],
        fullPaths: false, 
        debug:false
    });

  return b.bundle()
    .on('error', notify.onError(function(err) {
        console.log(err.message);
        return "Error compiling";
    }))
    .pipe(source(config.compiledScriptName))
    .pipe(gulp.dest(config.compiledScriptsPath))
});

// Watch
gulp.task('watch', ['browserify'], function () {
    // Watch .js files
    gulp.watch(['scripts/**/*.js'], ['browserify']);

});

