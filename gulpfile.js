'use strict';

var browserify = require('browserify'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    del = require('del');

var dependencies = require('./package.json').dependencies;

var config =  {
		compiledScriptsPath: 'build',
		compiledScriptName: 'bundle.js',
		compiledVendorScriptName: 'vendor.js'
  } 

// Browserify script files
gulp.task('browserify', function() {
    var b = browserify({
      entries: ['scripts/app.js'],
      fullPaths: false, 
      debug:false
    });

  // mark vendor libraries defined in package.json as an external library,
  // so that it does not get bundled with main.js.
  // instead, we will load vendor libraries from vendor.js bundle
  for(var k in dependencies){
  	if(dependencies.hasOwnProperty(k)){
  		b.external(k);
  	}
  } 

  return b.bundle()
    .on('error', notify.onError(function(err) {
      console.log(err.message);
      return "Error compiling";
    }))
    .pipe(source(config.compiledScriptName))
    .pipe(gulp.dest(config.compiledScriptsPath))
});


//make vendor file
gulp.task('vendor', function() {
  var b = browserify({debug: false});

  for(var k in dependencies){
  	if(dependencies.hasOwnProperty(k)){
  		b.require(k);
  	}
  } 

  return b.bundle()
    .pipe(source(config.compiledVendorScriptName))
    .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
    .pipe(uglify()) // now gulp-uglify works 
    .pipe(gulp.dest(config.compiledScriptsPath))
});


// Build
gulp.task('build', ['vendor', 'browserify'], function() {
    console.log('build finished');
		process.exit();
});


// Watch
gulp.task('watch', ['browserify'], function () {
    // Watch .js & json files
    gulp.watch(['scripts/**/*.js'], ['browserify']);

});

