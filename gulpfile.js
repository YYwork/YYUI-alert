'use strict';

var gulp = require('gulp'),
  path = require('path');

var sass = require('gulp-sass'),
  jade = require('gulp-jade'),
  compass = require('gulp-compass'),
  coffee = require('gulp-coffee');

var gutil = require('gulp-util'),
  clean = require('gulp-clean'),
  gulpSequence = require('gulp-sequence').use(gulp);


var livereload = require('gulp-livereload');

var inputDir = './',
  outputDir = './build';

var source = {
  sassDir: path.join(inputDir, 'sass'),
  jadeDir: path.join(inputDir, 'jade'),
  coffeeDir: path.join(inputDir, 'coffee'),

  sassFileDir: path.join(inputDir, 'sass/*.scss'),
  coffeeFileDir: path.join(inputDir, 'coffee/*.coffee'),
  jadeFileDir: path.join(inputDir, 'jade/*.jade'),
  jslibFileDir: path.join(inputDir, 'jslib/*.js')
}

var output = {
  cssDir: path.join(outputDir, 'css'),
  htmlDir: path.join(outputDir, 'html'),
  jsDir: path.join(outputDir, 'js'),
  jslibDir: path.join(outputDir, 'js')
}

gulp.task('clean', function() {
  gulp.src(outputDir, {
      read: false
    })
    .pipe(clean());
});

gulp.task('copy:jslib', function() {
  gulp.src(source.jslibFileDir)
    .pipe(gulp.dest(output.jslibDir));
});
gulp.task('copy', ['copy:jslib']);

gulp.task('sass', function() {
  gulp.src(source.sassFileDir)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(output.cssDir));
});

gulp.task('compass', function() {
  gulp.src(source.sassFileDir)
    .pipe(compass({
      config_file: './config.rb',
      sass: source.sassDir,
      css: output.cssDir
    }))
    .pipe(gulp.dest(output.cssDir));
});

gulp.task('jade', function() {
  gulp.src(source.jadeFileDir)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(output.htmlDir))
});


gulp.task('coffee', function() {
  gulp.src(source.coffeeFileDir)
    .pipe(coffee({
      bare: true
    }).on('error', gutil.log))
    .pipe(gulp.dest(output.jsDir))
});

gulp.task('compass:watch', function() {
  gulp.watch(source.sassFileDir, ['compass']);
});

gulp.task('jade:watch', function() {
  gulp.watch(source.jadeFileDir, ['jade']);
});

gulp.task('coffee:watch', function() {
  gulp.watch(source.coffeeFileDir, ['coffee']);
});

gulp.task('copy:jslib:watch', function() {
  gulp.watch(source.jslibFileDir, ['copy:jslib']);
});

gulp.task('build', [
  'copy',
  'compass',
  'jade',
  'coffee'
]);
gulp.task('watch', [
  'copy:jslib:watch',
  'compass:watch',
  'jade:watch',
  'coffee:watch'
]);

gulp.task('default', [
  'build',
  'watch'
]);
