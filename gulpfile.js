const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

function styles() {
    return gulp.src('./scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.stream());
}

function watch(done) {
    browserSync.init({
        server: {
            baseDir: './src'
        }
    });

    gulp.watch('./scss/**/*.scss', styles);
    gulp.watch('./src/*.html').on('change', browserSync.reload);
    gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);

    done();
}

exports.watch = gulp.series(styles, watch);