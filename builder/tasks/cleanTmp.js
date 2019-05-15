import glob from 'glob';
import del from 'del';
import { paths, source } from '../config';

const _getPath = (file, path) => {
    return file.split(`${path}/`)[1].split('.')[0];
};

const _filesToDelete = () => {
    const jsPaths = glob.sync(`${paths.src.jsApp}/**/*.js`);
    const filenamesJs = jsPaths.map((item) => _getPath(item, source.jsApp));
    const sassPaths = glob.sync(`${paths.src.sassApp}/**/*.scss`);

    return sassPaths.map((sassFile) => {
       let sassFilename = _getPath(sassFile, source.sassApp);
       return !filenamesJs.includes(sassFilename) && `${paths.dist.js}${sassFile.split(source.sassApp)[1].replace('.scss', '.js')}`;
   });
};

const cleanTmp = () => del(_filesToDelete(), {force: true});

export default cleanTmp;
