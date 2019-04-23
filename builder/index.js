import gulp from 'gulp';
import cleanDist from './tasks/cleanDist';
import template from './tasks/template';
import images from './tasks/images';
import fonts from './tasks/fonts';
import staticFolder from './tasks/staticFolder';
import webpackAssets from './tasks/webpackAssets';
import generateDocs from './docs/generateDocs';
import generatePreview from './docs/generatePreview';

gulp.task('build', gulp.series(cleanDist, gulp.parallel(template, staticFolder, webpackAssets, generateDocs, generatePreview)));
gulp.task('default', gulp.series('build'));