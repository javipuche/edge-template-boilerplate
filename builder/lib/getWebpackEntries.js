import glob from 'glob';
import { paths } from '../config';

const sassPaths = glob.sync(`${paths.src.sassApp}/**/[^_]*.scss`);
const jsPaths = glob.sync(`${paths.src.jsApp}/**/[^_]*.js`);

const _getPath = (entries, path) => {
    let outputPath = {};

    entries.forEach(function (item) {
        outputPath[`${item.split(`${path}/`)[1].split('.')[0]}`] = item;
    });

    return outputPath;
};

const entries = () => {
    let sass = _getPath(sassPaths, paths.src.sassApp);
    let js = _getPath(jsPaths, paths.src.jsApp);

    return Object.assign(sass, js);
};

export default entries;
