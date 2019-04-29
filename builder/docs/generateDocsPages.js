import fs from 'fs';
import path from 'path';
import directoryTree from 'directory-tree';
import marked from 'marked';
import edge from 'edge.js';
import { paths, publicPath } from '../config';

const createFiles = async function (files) {
    await files.map((item) => {
        if (item.type == 'directory') {
            fs.mkdirSync(`${paths.dist.docs}${item.path.split(paths.src.docs)[1]}`, { recursive: true }, (err) => { if (err) throw err; });
            createFiles(item.children);
        } else {
            let code = fs.readFileSync(item.path, "utf8", (err) => { if (err) throw err; });

            edge.registerViews(paths.src.views);

            let html = edge.renderString(`
                @layout('layouts.docs')
                @section('body')
                    ${marked(code)}
                @endsection
            `, {
                root: publicPath.root
            });

            fs.writeFileSync(`${paths.dist.docs}${item.path.split(paths.src.docs)[1].split('.')[0]}.html`, html, {flag: 'w'});
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