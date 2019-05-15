import gulp from 'gulp';
import cleanDist from './tasks/cleanDist';
import cleanTmp from './tasks/cleanTmp';
import cleanEmptyFolders from './tasks/cleanEmptyFolders';
import template from './tasks/template';
import fonts from './tasks/fonts';
import images from './tasks/images';
import staticFolder from './tasks/staticFolder';
import webpackAssets from './tasks/webpackAssets';
import generateDocsComponents from './docs/generateDocsComponents';
import generateDocsComponentsPreview from './docs/generateDocsComponentsPreview';

gulp.task('common', gulp.series(cleanDist, gulp.parallel(template, fonts, images, staticFolder, generateDocsComponents, generateDocsComponentsPreview), webpackAssets));
gulp.task('build', gulp.series('common', cleanTmp, cleanEmptyFolders));
gulp.task('default', gulp.series('common'));
