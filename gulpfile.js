/* ---------------------------------------------------------------------------------------------
 *
 * --------------------------------------------------------------------------------------------- */

// 'use strict';


// --- SETUP ------------------------------------

var gulp   = require('gulp');
var config = require('./build.config.js');
var tsconfig = require('./tsconfig.json');

// auto load plugins
var plugins = require('gulp-load-plugins')({
    // DEBUG: true,
    pattern: ['*'],
    rename: {
        'gulp-if' : 'gulpif',
        'cli-table2' : 'table',
        'uglify-js' : 'uglifyjs',
        'gulp-jshint' : 'gulpjshint',
        'map-stream' : 'map',
        'this.build-tasks' : 'buildTasks'
    }
});

// setup run-sequence to use the "global" gulp object
plugins.runSequence.use(gulp);

// load task loader
var task = plugins.buildTasks(gulp, config, plugins);


// --- TASKS ------------------------------------

gulp.task('clean', task('clean'));
// gulp.task('bower-install', task('bowerInstall'));


gulp.task('javascript', task('javascript'));
gulp.task('typescript', task('typescript'));


gulp.task('docu', task('documentation'));

gulp.task('fonts', task('fonts'));
gulp.task('images', task('images'));

gulp.task('sketch', task('sketch'));
gulp.task('iconfont', task('iconfont'));
gulp.task('sprites', task('sprites'));
gulp.task('scss-autoimport', task('scssAutoimport'));
gulp.task('scss', task('scss'));

gulp.task('patternlab', task('patternlab'));
gulp.task('styleguide', task('styleguide'));
gulp.task('build-modernizr', task('buildModernizr'));
gulp.task('browser-sync', task('browserSync'));

gulp.task('html-optimization', task('htmlOptimization'));

gulp.task('reloadBrowser', function(cb) {
    plugins.browserSync.reload();
    cb && cb();
})



gulp.task('watch', function () {

    [
        [ config.patternlab.files, ['patternlab', 'build-modernizr', 'reloadBrowser'] ],
        [ config.sketch.files, ['sketch'] ],
        [ config.sprites.files, ['sprites'] ],
        [ config.scssAutoimport.files, ['scss-autoimport'] ],
        [ config.scss.files, ['scss', 'build-modernizr', 'reloadBrowser'] ],
        [ config.fonts.files, ['fonts', 'reloadBrowser'] ],
        [ config.images.files, ['images', 'reloadBrowser'] ],
        [ tsconfig.files, ['typescript'] ],
        [ config.javascript.files, ['javascript', 'build-modernizr', 'reloadBrowser'] ]

    ].forEach(function(watchOpts) {
        gulp.watch(watchOpts[0], function() {
            plugins.runSequence.apply(null, watchOpts[1]);
        });
    })


    var iconGenerationTimeout;

    gulp.watch(config.iconfont.dirs).on('change', function() {
        // .. we clear the timeout call we created earlier ...
        clearTimeout(iconGenerationTimeout);
        // .. and start it new ...
        iconGenerationTimeout = setTimeout(function() {
            plugins.runSequence('iconfont')
        }, 1000);
    });

});


// build all stuff once
gulp.task('default', function(cb) {

    plugins.runSequence(
        'clean',
        // 'bower-install',
        'patternlab',
        // 'styleguide',
        'sketch',
        'iconfont',
        'sprites',
        'scss-autoimport',
        'scss',
        'fonts',
        'images',
        'typescript',
        'javascript',
        'build-modernizr',
        'html-optimization',
        cb
    );
});

gulp.task('critical', task('criticalcss'));


// start server, build all stuff and watch
gulp.task('serve', function () {

    plugins.runSequence(
        'default',
        'browser-sync',
        'watch'
    );
});
