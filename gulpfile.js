    const gulp = require("gulp");
    const sass = require("gulp-sass");
    const browserSync = require("browser-sync").create();
    const imagemin = require('gulp-imagemin');
    const autoprefixer = require('gulp-autoprefixer');
    const cleanCSS = require('gulp-clean-css');
    const htmlmin = require('gulp-htmlmin');

    gulp.task("sass", function(){
        return gulp.src("app/scss/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.reload({
            stream: true
        }))
    });

    gulp.task("watch", ["browserSync", "sass"], function(){
        gulp.watch("app/scss/**/*.scss", ["sass"]);
        gulp.watch('app/*.html', browserSync.reload); 
        gulp.watch('app/js/**/*.js', browserSync.reload); 
    });

    gulp.task("browserSync", function(){
        browserSync.init({
            server: {
                baseDir: "app"
            }
        })
    });

    gulp.task('imagemin', () =>
    gulp.src('app/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
    );

    gulp.task('autoprefixer', () =>
    gulp.src('app/css/*')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'))
    );

    gulp.task('minify-css', function() {
      return gulp.src('app/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
    });

    gulp.task('minify-html', function() {
        return gulp.src('app/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});

    gulp.task('ship-css', () =>
    gulp.src('app/css/*')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'))
    );
