//引入gulp
const gulp = require('gulp');

//引入组件
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const del = require('del');

const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

gulp.task('sass', function () {
  return gulp.src('./src/sass/*.{scss,sass}')
    .pipe(sass())        // 通过sass插件将sass编译为css，如果需要编译less，则改用less插件
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(gulp.dest('./dist/src/css'))
    .pipe(gulp.dest('./src/css'))
    .pipe(cleancss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/src/css'))
    .pipe(gulp.dest('./src/css'))
  // .pipe(reload({
  //   stream: true
  // }));
})

gulp.task('js', function () {
  return gulp.src('./src/js/*.js')
    .pipe(babel({             // 通过babel插件将ES6转成ES5
      presets: ['env']
    }))
    .pipe(gulp.dest('./dist/src/js'))
    .pipe(uglify())           // 丑化js代码
    .pipe(rename({            // 重命名
      suffix: '.min'          // 添加后缀
    }))
    .pipe(gulp.dest('./dist/src/js'))
  // .pipe(reload({
  //   stream: true
  // }));
})

gulp.task('image', function () {
  return gulp.src('./src/images/*')
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      }),
      imagemin.svgo({
        plugins: [{
          removeViewBox: true
        },
        {
          cleanupIDs: false
        }
        ]
      })
    ], {
      verbose: true
    }))
    .pipe(gulp.dest('./dist/src/images'));
})

gulp.task('index', async () => {
  gulp.src('./index.html')
    .pipe(gulp.dest('./dist'))
  // .pipe(reload({
  //   stream: true
  // }))
})

gulp.task('html', async () => {
  gulp.src('./html/*.{html,htm}')
    .pipe(gulp.dest('./dist/html'))
  // .pipe(reload({
  //   stream: true
  // }))
})

gulp.task('layout', async () => {
  gulp.src('./layout/*.{html,htm}')
    .pipe(gulp.dest('./dist/layout'))
  // .pipe(reload({
  //   stream: true
  // }))
})

gulp.task('copy', async () => {
  return gulp.src('./src/lib/**/*', { base: './src/lib/' })
    .pipe(gulp.dest('./dist/src/lib'))
  // .pipe(reload({
  //   stream: true
  // }))
})

// gulp.task('delete', function () {
//   return del(['./dist']); // 加return 方法变为同步
// })

gulp.task('default', ['copy'], function () {
  gulp.start('serve');
})

gulp.task('serve', ['index', 'sass', 'js', 'image', 'layout', 'html'], function () {
  browserSync.init({
    files: ['**'],
    server: {
      baseDir: './dist',
      index: './index.html'
    },
    port: 8888
  });

  gulp.watch('./index.html', ['index']);
  gulp.watch('./src/sass/*.{scss,sass}', ['sass']);
  gulp.watch('./src/js/*.js', ['js']);
  gulp.watch('./src/images/*', ['image'])
  gulp.watch('./html/*.{html,htm}', ['html']);
  gulp.watch('./layout/*.{html,htm}', ['layout']);
})
