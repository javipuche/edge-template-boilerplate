import del from 'del';
import { paths } from '../config';

const cleanDist = function () {
    return del(`${paths.dist.root}/**/*`, { force: true });
};

export default cleanDist;