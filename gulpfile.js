const gulp = require('gulp');
const browserify = require('browserify');

const responsive = require('gulp-responsive-images');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const minifyCSS = require('gulp-minify-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');

const imageRoot = 'source/img/**/*';
const styleRoot = 'source/sass/**/*.scss';
const scriptRoot = 'source/js/**/*.js';
const htmlRoot = './**/*.html';
const browserDir = './';

gulp.task('images', function() {
    gulp.src(imageRoot)
        .pipe(responsive({
            '*': [{
                    width: 360,
                    quality: 70,
                    suffix: '-xsmall'
                },
                {
                    width: 520,
                    quality: 70,
                    suffix: '-small'
                },
                {
                    width: 800,
                    quality: 70,
                    suffix: '-medium'
                },
                {
                    width: 1000,
                    quality: 70,
                    suffix: '-large'
                },
                {
                    width: 100,
                    percentage: true,
                    quality: 70,
                    suffix: '-original'
                }
            ]
        }))
        .pipe(gulp.dest('build/img'));
});

gulp.task('styles', function() {
    gulp.src(styleRoot)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(concat('main.css'))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('scripts', function() {
    gulp.src(scriptRoot)
        .pipe(sourcemaps.init())
        //.pipe(concat('main.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build/js'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('browser-sync', function() {
    const config = {
        server: { baseDir: browserDir },
        port: process.env.PORT || 3000
    };

    return browserSync(config);
});

gulp.task('default', ['images', 'styles', 'scripts', 'watch', 'browser-sync']);

gulp.task('watch', function() {
    gulp.watch(scriptRoot, ['scripts']);
    gulp.watch(imageRoot, ['images']);
    gulp.watch(styleRoot, ['styles']);
    gulp.watch(htmlRoot, function() {
        return gulp.src('')
            .pipe(browserSync.reload({ stream: true }))
    });
});