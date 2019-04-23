import gulp from 'gulp';
import { paths, ext, gulpType } from '../config';

const fonts = function () {
    return gulp.src(`${paths.src.fonts}/**/*${ext.fonts}`)
    .pipe(gulpType.dest(paths.dist.fonts));
};

export default fonts;