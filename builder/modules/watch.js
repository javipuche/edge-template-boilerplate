import gulp from 'gulp';
import template from '../tasks/template';
import fonts from '../tasks/fonts';
import images from '../tasks/images';
import staticFolder from '../tasks/staticFolder';
import reloadBrowser from './reloadBrowser';
import { paths, ext, isWatching, gulpType } from '../config';

const watch = function () {
    if (isWatching) {
        gulp.watch([
            `${paths.src.views}/**/*${ext.template}`,
            `${paths.src.data}/**/*${ext.data}`
        ]).on('all', template);
        gulp.watch(`${paths.src.fonts}/**/*${ext.fonts}`).on('all', gulp.series(fonts, reloadBrowser));
        gulp.watch(`${paths.src.images}/**/*${ext.images}`).on('all', gulp.series(images, reloadBrowser));
        gulp.watch(`${paths.src.static}/**/*`).on('all', gulp.series(staticFolder, reloadBrowser));
    }
};

export default watch;