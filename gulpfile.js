const gulp = require("gulp");
const { src, dest, watch, series, parallel } = gulp;
const clean = require("gulp-clean"); //For Cleaning build/dist for fresh export
const options = require("./config"); //paths and other options from config.js
const browserSync = require("browser-sync").create();

const sass = require("gulp-sass")(require("sass")); //For Compiling SASS files
const postcss = require("gulp-postcss"); //For Compiling tailwind utilities with tailwind config
const concat = require("gulp-concat"); //For Concatinating js,css files
const uglify = require("gulp-terser"); //To Minify JS files
const imagemin = require("gulp-imagemin"); //To Optimize Images
const purgecss = require("gulp-purgecss"); // Remove Unused CSS from Styles
const logSymbols = require("log-symbols"); //For Symbolic Console logs :) :P
const includePartials = require("gulp-file-include"); //For supporting partials if required
const nunjucksRender = require("gulp-nunjucks-render"); // For Nunjucks templating

const cleanCSS = require("gulp-clean-css");
const extReplace = require("gulp-ext-replace");
const htmlmin = require("gulp-htmlmin");
const imageResize = require("gulp-image-resize");
const rename = require("gulp-rename");
const run = require("gulp-run-command").default;
const sourcemaps = require("gulp-sourcemaps");
const version = require("gulp-version-number");

const PATHS = {
  output: "dist",
  srcpath: "src",
  templates: "src/templates",
  pages: "src/pages",
};
const versionConfig = {
  value: "%MDS%",
  append: {
    key: "v",
    to: ["css", "js"],
  },
};

async function getImageminMozjpeg() {
  return (await import('imagemin-mozjpeg')).default;
}

async function getImageminPngquant() {
  return (await import('imagemin-pngquant')).default;
}

async function getImageminWebp() {
  return (await import('imagemin-webp')).default;
}

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
  console.log("\n\t" + logSymbols.info, "Reloading Browser Preview.\n");
  browserSync.reload();
  done();
}

// Development Tasks
function devHTML() {
  return src(`${options.paths.src.base}/**/*.html`)
    .pipe(includePartials())
    .pipe(dest(options.paths.dist.base));
}

function devNunjucks() {
  return src(`${options.paths.src.base}/**/*.njk`)
    .pipe(nunjucksRender({
      path: [options.paths.src.base],
      ext: '.html' // Настраиваем расширение для компилированных файлов
    }))
    .pipe(dest(options.paths.dist.base));
}

function devStyles() {
  const tailwindcss = require("tailwindcss");
  const autoprefixer = require("autoprefixer");
  return src(`${options.paths.src.css}/**/*.scss`)
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([tailwindcss(options.config.tailwindjs), autoprefixer()]))
    .pipe(concat({ path: "style.css" }))
    .pipe(dest(options.paths.dist.css));
}

function devScripts() {
  return src([
    `${options.paths.src.js}/libs/**/*.js`,
    `${options.paths.src.js}/**/*.js`,
    `!${options.paths.src.js}/**/external/*`,
  ])
    .pipe(concat({ path: "scripts.js" }))
    .pipe(dest(options.paths.dist.js));
}

function devImages() {
  return src(`${options.paths.src.img}/**/*`).pipe(
    dest(options.paths.dist.img)
  );
}

function devFonts() {
  return src(`${options.paths.src.fonts}/**/*`).pipe(
    dest(options.paths.dist.fonts)
  );
}

function devThirdParty() {
  return src(`${options.paths.src.thirdParty}/**/*`).pipe(
    dest(options.paths.dist.thirdParty)
  );
}

function watchFiles() {
  watch(
    `${options.paths.src.base}/**/*.{html,php,njk}`,
    series(devHTML, devNunjucks, devStyles, previewReload)
  );
  watch(
    [options.config.tailwindjs, `${options.paths.src.css}/**/*.scss`],
    series(devStyles, previewReload)
  );
  watch(`${options.paths.src.js}/**/*.js`, series(devScripts, previewReload));
  watch(`${options.paths.src.img}/**/*`, series(devImages, previewReload));
  watch(`${options.paths.src.fonts}/**/*`, series(devFonts, previewReload));
  watch(
    `${options.paths.src.thirdParty}/**/*`,
    series(devThirdParty, previewReload)
  );
  console.log("\n\t" + logSymbols.info, "Watching for Changes..\n");
}

function devClean() {
  console.log(
    "\n\t" + logSymbols.info,
    "Cleaning dist folder for fresh start.\n"
  );
  return src(options.paths.dist.base, { read: false, allowEmpty: true }).pipe(
    clean()
  );
}

// Production Tasks (Optimized Build for Live/Production Sites)
function prodHTML() {
  return src(`${options.paths.src.base}/**/*.{html,php}`)
    .pipe(includePartials())
    .pipe(dest(options.paths.build.base));
}

function prodNunjucks() {
  return src(`${options.paths.src.base}/**/*.njk`)
    .pipe(nunjucksRender({
      path: [options.paths.src.base],
      ext: '.html' // Настраиваем расширение для компилированных файлов
    }))
    .pipe(dest(options.paths.build.base));
}

function prodStyles() {
  const tailwindcss = require("tailwindcss");
  const autoprefixer = require("autoprefixer");
  const cssnano = require("cssnano");
  return src(`${options.paths.src.css}/**/*.scss`)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      postcss([
        tailwindcss(options.config.tailwindjs),
        autoprefixer(),
        cssnano(),
      ])
    )
    .pipe(dest(options.paths.build.css));
}

function prodScripts() {
  return src([
    `${options.paths.src.js}/libs/**/*.js`,
    `${options.paths.src.js}/**/*.js`,
  ])
    .pipe(concat({ path: "scripts.js" }))
    .pipe(uglify())
    .pipe(dest(options.paths.build.js));
}

async function prodImages() {
  const pngQuality = Array.isArray(options.config.imagemin.png)
    ? options.config.imagemin.png
    : [0.7, 0.7];
  const jpgQuality = Number.isInteger(options.config.imagemin.jpeg)
    ? options.config.imagemin.jpeg
    : 70;

  const mozjpeg = await getImageminMozjpeg();
  const pngquant = await getImageminPngquant();

  const plugins = [
    pngquant({ quality: pngQuality }),
    mozjpeg({ quality: jpgQuality }),
  ];

  return src(options.paths.src.img + "/**/*")
    .pipe(imagemin([...plugins]))
    .pipe(dest(options.paths.build.img));
}

function prodFonts() {
  return src(`${options.paths.src.fonts}/**/*`).pipe(
    dest(options.paths.build.fonts)
  );
}

function prodThirdParty() {
  return src(`${options.paths.src.thirdParty}/**/*`).pipe(
    dest(options.paths.build.thirdParty)
  );
}

function prodClean() {
  console.log(
    "\n\t" + logSymbols.info,
    "Cleaning build folder for fresh start.\n"
  );
  return src(options.paths.build.base, { read: false, allowEmpty: true }).pipe(
    clean()
  );
}

function buildFinish(done) {
  console.log(
    "\n\t" + logSymbols.info,
    `Production build is complete. Files are located at ${options.paths.build.base}\n`
  );
  done();
}

// Default task
exports.default = series(
  devClean, // Clean Dist Folder
  parallel(devNunjucks, devStyles, devScripts, devImages, devFonts, devThirdParty, devHTML), // Run All tasks in parallel
  livePreview, // Live Preview Build
  watchFiles // Watch for Live Changes
);

// Production task
exports.prod = series(
  prodClean, // Clean Build Folder
  parallel(
    prodNunjucks,
    prodStyles,
    prodScripts,
    prodImages,
    prodHTML,
    prodFonts,
    prodThirdParty
  ), // Run All tasks in parallel
  buildFinish
);

// Additional tasks
gulp.task("nun", function () {
  return src(PATHS.pages + "/**/*.+(html|njk)")
    .pipe(
      nunjucksRender({
        path: [PATHS.templates],
        watch: true,
      })
    )
    .pipe(version(versionConfig))
    .pipe(dest(PATHS.output));
});

// BrowserSync
gulp.task("sync", function () {
  browserSync.init({
    server: {
      baseDir: PATHS.output,
    },
    port: 3000,
  });
});

// Watch for changes
gulp.task("watch", function () {
  gulp.watch(PATHS.templates + "/**/*", gulp.series("nun"));
  gulp.watch(PATHS.pages + "/**/*", gulp.series("nun"));
  gulp.watch(PATHS.output + "/**/*").on("change", browserSync.reload);
});

// Serve task
gulp.task("serve", gulp.series("nun", "sync", "watch"));

