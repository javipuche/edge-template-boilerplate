import fs from 'fs';
import edge from 'edge.js';
import path from 'path';
import { paths } from '../../config';

module.exports = {
    id: 'html',
    label: 'HTML',
    languages: [ 'html' ],
    parse: async (contents, filePath) => {
        let filename = path.basename(filePath, '.edge');
        let dataString;

        filePath = filePath.replace('.edge','.data.json');

        if (fs.existsSync(filePath)) {
            dataString = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }

        edge.registerViews(paths.src.views);

        let html = edge.renderString(`<!-- Start ${filename} -->\n${(await contents).trim()}\n<!-- End ${filename} -->`, dataString);

        return html;
    },
    resolve: (filename) => [ `${ filename }.edge` ]
};
