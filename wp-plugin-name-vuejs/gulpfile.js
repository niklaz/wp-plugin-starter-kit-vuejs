// Defining requirements
//'use strict';

var browserify = require('browserify');
var babelify = require('babelify');
var vueify = require('vueify');
var esmify = require('esmify')
var log = require('gulplog');
var gulp = require('gulp');
var webpack = require('webpack-stream');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var postcss = require('gulp-postcss');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var ignore = require('gulp-ignore');
var rimraf = require('gulp-rimraf');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var del = require('del');
var cleanCSS = require('gulp-clean-css');
//var gulpSequence = require('gulp-sequence');
//var replace = require('gulp-replace');
var autoprefixer = require('autoprefixer');

// Configuration file to keep your code DRY
var cfg = require('./gulpconfig.json');
var paths = cfg.paths;

// Run:
// gulp sass
// Compiles SCSS files in CSS
gulp.task('sass', function() {
    var stream = gulp
        .src(paths.sass + '/*.scss')
        .pipe(
            plumber({
                errorHandler: function(err) {
                    console.log(err);
                    this.emit('end');
                }
            })
        )
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sass({ errLogToConsole: true }))
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write(undefined, { sourceRoot: null }))
        .pipe(gulp.dest(paths.css));
    return stream;
});

// Run:
// gulp watch
// Starts watcher. Watcher runs gulp sass task on changes
gulp.task('watch', function(done) {
    gulp.watch(`${paths.sass}/**/*.scss`, gulp.series('styles'));
    gulp.watch(
        [
            `${paths.devjs}/js/**/*.js`,
            'js/**/*.js',
            '!src/js/components/**/*.js',
            '!src/js/main.js',
            '!src/js/admin.js',
            '!js/main.js',
            '!js/main.min.js',
            '!js/admin.js',
            '!js/admin.min.js',
            '!js/custom.js',
            '!js/custom.min.js'
        ],
        gulp.series('scripts')
    );
    gulp.watch(
        [
            `${paths.devjs}/js/main.js`,
            `${paths.devjs}/js/admin.js`,
            `${paths.devjs}/js/components/*`,
        ],
        gulp.series('webpack')
    );

    //Inside the watch task.
    gulp.watch(`${paths.imgsrc}/**`, gulp.series('imagemin-watch'));
    done();
});

// Run:
// gulp imagemin
// Running image optimizing task
gulp.task('imagemin', function() {
    gulp
        .src(`${paths.imgsrc}/**`)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.img));
});

/**
 * Ensures the 'imagemin' task is complete before reloading browsers
 * @verbose
 */
gulp.task(
    'imagemin-watch',
    gulp.series('imagemin', function() {
        browserSync.reload();
    })
);

// Run:
// gulp cssnano
// Minifies CSS files
gulp.task('cssnano', function() {
    return gulp
        .src(paths.css + '/main.css')
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(
            plumber({
                errorHandler: function(err) {
                    console.log(err);
                    this.emit('end');
                }
            })
        )
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano({ discardComments: { removeAll: true } }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.css));
});

gulp.task('minifycss', function() {
    return gulp
        .src(`${paths.css}/main.css`)
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(cleanCSS({ compatibility: '*' }))
        .pipe(
            plumber({
                errorHandler: function(err) {
                    console.log(err);
                    this.emit('end');
                }
            })
        )
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.css));
});

gulp.task('cleancss', function() {
    return gulp
        .src(`${paths.css}/*.min.css`, { read: false }) // Much faster
        .pipe(ignore('main.css'))
        .pipe(rimraf());
});

gulp.task('styles', function(callback) {
    gulp.series('sass', 'minifycss')(callback);
});

// Run:
// gulp browser-sync
// Starts browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    browserSync.init(cfg.browserSyncWatchFiles, cfg.browserSyncOptions);
});

// Run:
// gulp scripts.
// Uglifies and concat all JS files into one
gulp.task('scripts', function() {
    var scripts = [


        // Adding currently empty javascript file to add on for your own themes´ customizations
        // Please add any customizations to this .js file only!
        `${paths.devjs}/js/custom-javascript.js`
    ];
    gulp
        .src(scripts, { allowEmpty: true })
        .pipe(babel(
            {
                presets: ['@babel/preset-env']
            }
        ))
        .pipe(concat('custom.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js));

    return gulp
        .src(scripts, { allowEmpty: true })
        .pipe(babel())
        .pipe(concat('custom.js'))
        .pipe(gulp.dest(paths.js));
});

// Run webpack
gulp.task('webpack', function(){
    return gulp.src(['src/js/main.js','src/js/admin.js'])
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest(paths.js));
    //.pipe(connect.reload());
});


// Deleting any file inside the /src folder
gulp.task('clean-source', function() {
    return del(['src/**/*']);
});

// Run:
// gulp watch-bs
// Starts watcher with browser-sync. Browser-sync reloads page automatically on your browser
gulp.task('watch-bs', gulp.parallel('browser-sync', 'watch'));



// Deleting any file inside the /dist folder
gulp.task('clean-dist', function() {
    return del([paths.dist + '/**']);
});

// Run
// gulp dist
// Copies the files to the /dist folder for distribution as simple theme
gulp.task(
    'dist',
    gulp.series(['clean-dist'], function() {
        return gulp
            .src(
                [
                    '**/*',
                    `!${paths.bower}`,
                    `!${paths.bower}/**`,
                    `!${paths.node}`,
                    `!${paths.node}/**`,
                    `!${paths.devjs}`,
                    `!${paths.devjs}/**`,
                    `!${paths.dist}`,
                    `!${paths.dist}/**`,
                    `!${paths.distprod}`,
                    `!${paths.distprod}/**`,
                    `!${paths.sass}`,
                    `!${paths.sass}/**`,
                    '!readme.txt',
                    '!readme.md',
                    '!package.json',
                    '!package-lock.json',
                    '!webpack.config.js',
                    '!gulpfile.js',
                    '!gulpconfig.json',
                    '!CHANGELOG.md',
                    '!.travis.yml',
                    '!jshintignore',
                    '!codesniffer.ruleset.xml',
                    '*'
                ],
                { buffer: true }
            )

            .pipe(gulp.dest(paths.dist));
    })
);

// Deleting any file inside the /dist-product folder
gulp.task('clean-dist-product', function() {
    return del([paths.distprod + '/**']);
});

// Run
// gulp dist-product
// Copies the files to the /dist-prod folder for distribution as theme with all assets
gulp.task(
    'dist-product',
    gulp.series(['clean-dist-product'], function() {
        return gulp
            .src([
                '**/*',
                `!${paths.bower}`,
                `!${paths.bower}/**`,
                `!${paths.node}`,
                `!${paths.node}/**`,
                `!${paths.dist}`,
                `!${paths.dist}/**`,
                `!${paths.distprod}`,
                `!${paths.distprod}/**`,
                '*'
            ])
            .pipe(gulp.dest(paths.distprod));
    })
);

// Run
// gulp compile
// Compiles the styles and scripts and runs the dist task
gulp.task('compile', gulp.series('styles', 'scripts', 'dist'));

// Run:
// gulp
// Starts watcher (default task)
gulp.task('default', gulp.series('watch'));
