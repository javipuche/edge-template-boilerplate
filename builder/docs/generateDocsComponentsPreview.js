import fs from 'fs';
import edge from 'edge.js';
import directoryTree from 'directory-tree';
import { paths, publicPath } from '../config';

const generateDocsComponentsPreview = async () => {
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
                <!DOCTYPE html>
                <html lang="es">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                        <meta http-equiv="X-UA-Compatible" content="ie=edge">
                        <title>Components Documentation</title>
                        <link rel="stylesheet" href="/assets/css/styles.css">
                    </head>
                    <body>
                        ${htmlString}
                        <script src="/assets/js/app.js" charset="utf-8" defer></script>
                    </body>
                </html>
            `, Object.assign(dataString, { root: publicPath.root }));

            fs.mkdir(`${paths.dist.docs}/components/preview/${item.name}`, { recursive: true }, (err) => {
                if (err) throw err;
                fs.writeFileSync(`${paths.dist.docs}/components/preview/${item.name}/${item.name}.html`, html, {flag: 'w'});
            });
        }
    });
};

export default generateDocsComponentsPreview;
