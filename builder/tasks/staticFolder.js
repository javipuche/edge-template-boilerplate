import gulp from 'gulp';
import { paths, gulpMem } from '../config';

const staticFolder = () =>
    gulp.src(`${paths.src.static}/**/*`, { since: gulp.lastRun(staticFolder) })
    .pipe(gulpMem.dest(paths.dist.static));

export default staticFolder;
