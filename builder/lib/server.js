import browserSync from 'browser-sync';
import { paths, isProduction, isServerUp, gulpMem } from '../config';

const server = () => {
    if (!isProduction && isServerUp) {
        browserSync.init({
            server: paths.dist.root,
            middleware: gulpMem.middleware
        });
    }
};

export default server;
