import gulp from 'gulp';
import { paths, ext, gulpType } from '../config';

const staticFolder = function () {
    return gulp.src(`${paths.src.static}/**/*`)
    .pipe(gulpType.dest(paths.dist.static));
};

export default staticFolder;