import gulp from 'gulp';
import { paths, ext, gulpMem } from '../config';

const fonts = () =>
    gulp.src(`${paths.src.fonts}/**/*.{eot,ttf,svg,woff,woff2}`, { since: gulp.lastRun(fonts) })
    .pipe(gulpMem.dest(paths.dist.fonts));

export default fonts;
