import fs from 'fs';
import edge from 'edge.js';
import directoryTree from 'directory-tree';
import { paths } from '../config';

const generatePreview = async () => {
    let tree = directoryTree(paths.src.components, {
        normalizePath: true,
        extensions: /\.(edge|json)$/
    });

    await tree.children.map((item) => {
        if (item.children) {
            let dataString;
            let htmlString;

            item.children.map((child) => {
                if (child.extension == '.json') {
                    dataString = JSON.parse(fs.readFileSync(child.path, 'utf8'));
                }
                if (child.extension == '.edge') {
                    htmlString = fs.readFileSync(child.path, 'utf8');
                }
            });

            edge.registerViews(paths.src.views);

            let html = edge.renderString(`
                @layout('layouts.docs.components')
                @section('body')
                    ${htmlString}
                @endsection
            `, dataString);

            fs.mkdir(`${paths.dist.docs}/${item.name}`, { recursive: true }, (err) => {
                if (err) throw err;
                fs.writeFileSync(`${paths.dist.docs}/${item.name}/${item.name}.html`, html, {flag: 'w'});
            });
        }
    });
};

export default generatePreview;