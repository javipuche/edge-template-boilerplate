import fs from 'fs';
import edge from 'edge.js';
import { paths } from '../../config';

module.exports = {
    id: 'html',
    label: 'HTML',
    languages: [ 'html' ],
    parse: async (contents, filePath) => {
        let path = filePath.replace('.edge','.data.json');
        let dataString = {};

        if (fs.existsSync(path)) {
            dataString = JSON.parse(fs.readFileSync(path, 'utf8'));
        }

        edge.registerViews(paths.src.views);
        let html = edge.renderString((await contents).trim(), dataString);

        return html;
    },
    resolve: (filename) => [ `${ filename }.edge` ]
};