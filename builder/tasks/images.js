import gulp from 'gulp';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';
import { paths, ext, isProduction, isWatching, gulpMem } from '../config';

const images = () =>
    gulp.src(`${paths.src.images}/**/*.{gif,png,jpg,jpeg,svg}`, { since: gulp.lastRun(images) })
    .pipe(gulpif(isProduction || isWatching, imagemin({
        progressive: true
    })))
    .pipe(gulpMem.dest(paths.dist.images));

export default images;
