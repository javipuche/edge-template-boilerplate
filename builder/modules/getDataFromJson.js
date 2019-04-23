import fs from 'fs';
import directoryTree from 'directory-tree';
import { paths } from '../config';

const createJson = function (files) {
    let obj = {};

    files.map((item) => {
        if (item.type == 'directory') {
            obj[item.name] = generateData(item.children);
        } else {
            obj[item.name.replace(/\.[^/.]+$/, "")] = JSON.parse(fs.readFileSync(item.path, 'utf8'));
        }
    });

    return obj;
};

const getDataFromJson = function() {
    let obj = {};
    let tree = directoryTree(paths.src.data, {
        normalizePath: true,
        extensions: /\.(json)$/
    });

    obj[tree.name] = createJson(tree.children);

    return obj;
};

export default getDataFromJson;