const { src, dest, watch, series, parallel } = require('gulp');
const clean = require('gulp-clean');
const options = require('./config');
const browserSync = require('browser-sync').create();

const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const babelify = require('babelify');

const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const uglify = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const purgecss = require('gulp-purgecss');
const logSymbols = require('log-symbols');
const includePartials = require('gulp-file-include');

// Load Previews on Browser on dev
function livePreview(done) {
  browserSync.init({
    server: {
      baseDir: options.paths.dist.base,
    },
    port: options.config.port || 5000,
  });
  done();
}

// Triggers Browser reload
function previewReload(done) {
  console.log('\n\t' + logSymbols.info, 'Reloading Browser Preview.\n');
  browserSync.reload();
  done();
}

// Development Tasks
function devHTML() {
  return src(`${options.paths.src.base}/**/*.html`)
      .pipe(includePartials())
      .pipe(dest(options.paths.dist.base));
}

function devStyles() {
  const tailwindcss = require('tailwindcss');
  const autoprefixer = require('autoprefixer');
  return src(`${options.paths.src.css}/**/*.scss`)
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss([tailwindcss(options.config.tailwindjs), autoprefixer()]))
      .pipe(concat({ path: 'style.css' }))
      .pipe(dest(options.paths.dist.css));
}

function devScripts() {
  return src([
    `${options.paths.src.js}/libs/**/*.js`,
    `!${options.paths.src.js}/**/external/*`,
  ])
      .pipe(concat('libs.js'))
      .pipe(dest(options.paths.dist.js));
}

function bundleScripts() {
  return browserify({
    entries: [`${options.paths.src.js}/main.js`], // Ваша основная точка входа
    debug: true,
  })
      .transform(babelify, { presets: ['@babel/preset-env'] })
      .bundle()
      .pipe(source('scripts.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(gulpif(process.env.NODE_ENV === 'production', uglify()))
      .pipe(sourcemaps.write('./'))
      .pipe(dest(options.paths.dist.js));
}

function devImages() {
  return src(`${options.paths.src.img}/**/*`).pipe(dest(options.paths.dist.img));
}

function devFonts() {
  return src(`${options.paths.src.fonts}/**/*`).pipe(dest(options.paths.dist.fonts));
}

function devThirdParty() {
  return src(`${options.paths.src.thirdParty}/**/*`).pipe(dest(options.paths.dist.thirdParty));
}

function watchFiles() {
  watch(
      `${options.paths.src.base}/**/*.{html,php}`,
      series(devHTML, devStyles, previewReload)
  );
  watch(
      [options.config.tailwindjs, `${options.paths.src.css}/**/*.scss`],
      series(devStyles, previewReload)
  );
  watch(`${options.paths.src.js}/**/*.js`, series(devScripts, bundleScripts, previewReload));
  watch(`${options.paths.src.img}/**/*`, series(devImages, previewReload));
  watch(`${options.paths.src.fonts}/**/*`, series(devFonts, previewReload));
  watch(`${options.paths.src.thirdParty}/**/*`, series(devThirdParty, previewReload));
  console.log('\n\t' + logSymbols.info, 'Watching for Changes..\n');
}

function devClean() {
  console.log('\n\t' + logSymbols.info, 'Cleaning dist folder for fresh start.\n');
  return src(options.paths.dist.base, { read: false, allowEmpty: true }).pipe(clean());
}

// Production Tasks (Optimized Build for Live/Production Sites)
function prodHTML() {
  return src(`${options.paths.src.base}/**/*.{html,php}`)
      .pipe(includePartials())
      .pipe(dest(options.paths.build.base));
}

function prodStyles() {
  const tailwindcss = require('tailwindcss');
  const autoprefixer = require('autoprefixer');
  const cssnano = require('cssnano');
  return src(`${options.paths.src.css}/**/*.scss`)
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss([tailwindcss(options.config.tailwindjs), autoprefixer(), cssnano()]))
      .pipe(dest(options.paths.build.css));
}

function prodScripts() {
  return browserify({
    entries: [`${options.paths.src.js}/main.js`],
    debug: false,
  })
      .transform(babelify, { presets: ['@babel/preset-env'] })
      .bundle()
      .pipe(source('scripts.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(dest(options.paths.build.js));
}

function prodImages() {
  const pngQuality = Array.isArray(options.config.imagemin.png)
      ? options.config.imagemin.png
      : [0.7, 0.7];
  const jpgQuality = Number.isInteger(options.config.imagemin.jpeg)
      ? options.config.imagemin.jpeg
      : 70;
  const plugins = [pngquant({ quality: pngQuality }), mozjpeg({ quality: jpgQuality })];

  return src(options.paths.src.img + '/**/*')
      .pipe(imagemin([...plugins]))
      .pipe(dest(options.paths.build.img));
}

function prodFonts() {
  return src(`${options.paths.src.fonts}/**/*`).pipe(dest(options.paths.build.fonts));
}

function prodThirdParty() {
  return src(`${options.paths.src.thirdParty}/**/*`).pipe(dest(options.paths.build.thirdParty));
}

function prodClean() {
  console.log('\n\t' + logSymbols.info, 'Cleaning build folder for fresh start.\n');
  return src(options.paths.build.base, { read: false, allowEmpty: true }).pipe(clean());
}

function buildFinish(done) {
  console.log(
      '\n\t' + logSymbols.info,
      `Production build is complete. Files are located at ${options.paths.build.base}\n`
  );
  done();
}

exports.default = series(
    devClean, // Clean Dist Folder
    parallel(devStyles, devScripts, bundleScripts, devImages, devFonts, devThirdParty, devHTML), // Run All tasks in parallel
    livePreview, // Live Preview Build
    watchFiles // Watch for Live Changes
);

exports.prod = series(
    prodClean, // Clean Build Folder
    parallel(prodStyles, prodScripts, prodImages, prodHTML, prodFonts, prodThirdParty), // Run All tasks in parallel
    buildFinish
);