import gulp from 'gulp';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';
import { paths, ext, isProduction, isWatching, gulpType } from '../config';

const images = function () {
    return gulp.src(`${paths.src.images}/**/*${ext.images}`)
    .pipe(gulpif(isProduction || isWatching, imagemin({
        progressive: true
    })))
    .pipe(gulpType.dest(paths.dist.images));
};

export default images;