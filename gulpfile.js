// Plugins
var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    jshint        = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish'),
    browserSync   = require('browser-sync'),
    gulpIf        = require('gulp-if'),
    copy          = require('gulp-copy'),
    clean         = require('gulp-clean'),
    useref        = require('gulp-useref'),
    ngAnnotate    = require('gulp-ng-annotate'),
    plumber       = require('gulp-plumber'),
    autoprefixer  = require('gulp-autoprefixer'),
    runSequence   = require('run-sequence'),
    uglify        = require('gulp-uglify'),
    minifyCss     = require('gulp-minify-css');

// Variables
var toCopy = [
  './app/data/*.json',
  './app/directives/**/**',
  './app/directives/**/**/**',
  './app/views/*.html',
  './assets/img/**'
]

// Tasks
gulp.task('sass', function(){
  return gulp.src(['./assets/scss/**/*.scss','./assets/scss/**/**/*.scss'])
            .pipe(plumber())
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({
              browsers: ['not ie <= 8','last 2 versions'],
              cascade: false
            }))
            .pipe(gulp.dest('./assets/css'));
});

gulp.task('jshint', function(){
  gulp.src('./assets/js/**/*.js')
      .pipe(plumber())
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('browser-sync', function(){
  browserSync.init({
    proxy: "dev.dataviz.local"
  });
});

gulp.task('clean', function(){
  return gulp.src('dist', {read: false})
            .pipe(clean('/dist'));
});

gulp.task('copy', function(){
  return gulp.src(toCopy, {base: './'})
            .pipe(gulpIf('*.css', minifyCss()))
            .pipe(gulp.dest('dist'));
});

gulp.task('prepare', ['sass', 'copy'], function(){
  var assets = useref.assets();
  return gulp.src('./index.html')
             .pipe(assets)
             .pipe(gulpIf('*.js', ngAnnotate()))
             .pipe(gulpIf('*.js', uglify()))
             .pipe(gulpIf('*.css', minifyCss()))
             .pipe(assets.restore())
             .pipe(useref())
             .pipe(gulp.dest('dist'));
});

gulp.task('build', function(callback) {
  runSequence('clean',
    'prepare',
    callback);
});

gulp.task('watch', ['browser-sync'], function(){
  gulp.watch('./assets/js/**/*.js', ['jshint']);
  gulp.watch(['./assets/scss/**/*.scss','./assets/scss/**/**/*.scss'], ['sass']);
  gulp.watch(['./index.html','./assets/css/**/*.css','./assets/js/**/*.js']).on('change', browserSync.reload);
});
