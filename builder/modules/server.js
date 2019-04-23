import browserSync from 'browser-sync';
import { paths, isProduction, isServerUp, gulpType } from '../config';

const server = function () {
    if (!isProduction && isServerUp) {
        browserSync.init({
            server: paths.dist.root,
            middleware: gulpType.middleware,
        });
    }
};

export default server;