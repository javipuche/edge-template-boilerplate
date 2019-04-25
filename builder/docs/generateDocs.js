import fs from 'fs';
import malvid from 'malvid';
import { paths, publicPath, source, ext } from '../config';

const generateDocs = async () => {

    const results = await malvid({
        src: paths.src.components,
        pattern: `**/*${ext.template}`,
        url: (url) => `${publicPath.root}${source.docs}` + url,
        style: "#iframe { padding: 1.2em }",
        resolvers: [
    		require('malvid/src/resolvers/notes'),
            require('malvid/src/resolvers/view'),
    		require('malvid/src/resolvers/data'),
    		require('malvid/src/resolvers/config'),
            require('./resolvers/edgeToHtml'),
            require('./resolvers/css')
        ]
    });

    const html = await results.html();
    const json = await results.json();

    fs.mkdir(`${paths.dist.docs}/components`, { recursive: true }, (err) => {
        if (err) throw err;
        fs.writeFileSync(`${paths.dist.docs}/components/index.html`, html, {flag: 'w'});
        fs.writeFileSync(`${paths.dist.docs}/components/index.html.json`, JSON.stringify(json), {flag: 'w'});
    });
};

export default generateDocs;