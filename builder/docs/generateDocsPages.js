import fs from 'fs';
import path from 'path';
import directoryTree from 'directory-tree';
import marked from 'marked';
import { paths } from '../config';

const createFiles = async function (files) {
    await files.map((item) => {
        if (item.type == 'directory') {
            fs.mkdirSync(`${paths.dist.docs}${item.path.split(paths.src.docs)[1]}`, { recursive: true }, (err) => { if (err) throw err; });
            createFiles(item.children);
        } else {
            fs.writeFileSync(`${paths.dist.docs}${item.path.split(paths.src.docs)[1].split('.')[0]}.html`, 'sdasdasd', {flag: 'w'});
        }
    });
};

const generateDocsPages = function () {
    fs.mkdirSync(`${paths.dist.docs}`, { recursive: true }, (err) => { if (err) throw err; });

    let tree = directoryTree(paths.src.docs, {
        normalizePath: true,
        extensions: /\.(md)$/
    });

    return createFiles(tree.children);
};

export default generateDocsPages;