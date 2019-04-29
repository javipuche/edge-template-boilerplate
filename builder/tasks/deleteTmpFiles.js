import del from 'del';
import { paths, filename } from '../config';

const deleteTmpFiles = function () {
    return del([
        `${paths.dist.js}/${filename.scss}.js`
    ], { force: true });
};

export default deleteTmpFiles;