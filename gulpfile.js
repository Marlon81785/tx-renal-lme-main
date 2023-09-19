/**
 * comando no terminal -> gulp scripts ou npx gulp scripts
 * este script junta todos os .js em um unico arquivo de nome scripts.min.js também reduz seu tamanho
 */

var gulp     = require('gulp');
var plumber  = require('gulp-plumber');
var uglify   = require('gulp-uglify');
var concat   = require('gulp-concat');
var rename   = require('gulp-rename');
const { obfuscate, obfuscateMultiple } = require('javascript-obfuscator');

// Source Path
var js_src   = "./src/js/*.js";
 
// Dist Path
var js_dist  = "./dist/";
var js_dist_name = "bundle.js";
 
// Minify e Concat Scripts
gulp.task('scripts', gulp.series( ()=> {
	return gulp.src(js_src)
        .pipe(plumber())
	    .pipe(uglify())
		.pipe(concat(js_dist_name))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(js_dist));
}));

// Watch
gulp.task('watch', gulp.series( () =>  {
	gulp.watch([js_src], gulp.series('scripts'));
}));

// Default
gulp.task('default', gulp.series('scripts'));


