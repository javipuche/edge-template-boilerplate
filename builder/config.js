import path from 'path';
import gulp from 'gulp';
import GulpMem from 'gulp-mem';


/* -----------------------------------------------------------------------------
 * Process flags
 */


const isProduction = process.argv.indexOf('--production') >= 0;
const isServerUp   = process.argv.indexOf('--server') >= 0;
const isWatching   = process.argv.indexOf('--watch') >= 0;


/* -----------------------------------------------------------------------------
 * Sources
 */

const source = {
    dist: '../dist',
    src: '../src',
    views: 'views',
    components: 'views/components',
    layouts: 'views/layouts',
    pages: 'views/pages',
    partials: 'views/partials',
    assets: 'assets',
    sass: 'assets/sass',
    sassApp: 'assets/sass/app',
    css: 'assets/css',
    js: 'assets/js',
    jsApp: 'assets/js/app',
    fonts: 'assets/fonts',
    images: 'assets/images',
    static: 'static',
    data: 'data',
    docs: 'docs'
};


/* -----------------------------------------------------------------------------
 * Paths
 */

const paths = {
    src: {
        root: path.join(__dirname, `/${source.src}`),
        views: path.join(__dirname, `/${source.src}/${source.views}`),
        components: path.join(__dirname, `/${source.src}/${source.components}`),
        layouts: path.join(__dirname, `/${source.src}/${source.layouts}`),
        pages: path.join(__dirname, `/${source.src}/${source.pages}`),
        partials: path.join(__dirname, `/${source.src}/${source.partials}`),
        assets: path.join(__dirname, `/${source.src}/${source.assets}`),
        sass: path.join(__dirname, `/${source.src}/${source.sass}`),
        sassApp: path.join(__dirname, `/${source.src}/${source.sassApp}`),
        jsApp: path.join(__dirname, `/${source.src}/${source.jsApp}`),
        fonts: path.join(__dirname, `/${source.src}/${source.fonts}`),
        images: path.join(__dirname, `/${source.src}/${source.images}`),
        static: path.join(__dirname, `/${source.src}/${source.static}`),
        data: path.join(__dirname, `/${source.src}/${source.data}`)
    },
    dist: {
        root: path.join(__dirname, `/${source.dist}`),
        assets: path.join(__dirname, `/${source.dist}/${source.assets}`),
        css: path.join(__dirname, `/${source.dist}/${source.css}`),
        js: path.join(__dirname, `/${source.dist}/${source.js}`),
        fonts: path.join(__dirname, `/${source.dist}/${source.fonts}`),
        images: path.join(__dirname, `/${source.dist}/${source.images}`),
        static: path.join(__dirname, `/${source.dist}/${source.static}`),
        docs: path.join(__dirname, `/${source.dist}/${source.docs}`)
    },
    node_modules: path.join(__dirname, '../node_modules')
};


/* -----------------------------------------------------------------------------
 * Extensions files
 */

const ext = {
    template: 'edge'
};


/* -----------------------------------------------------------------------------
 * Public paths
 */

const publicPath = {
    root: '/',
    images: '../images',
    fonts: '../fonts'
};


/* -----------------------------------------------------------------------------
 * Alias
 */

const alias = {
    node_modules: paths.node_modules,
    components: paths.src.components,
    assets: paths.src.assets
};


/* -----------------------------------------------------------------------------
 * Gulp Memory
 */

let gulpMem;

if (isServerUp) {
    gulpMem = new GulpMem();
    gulpMem.serveBasePath = paths.dist.root;
    gulpMem.enableLog = false;
} else {
    gulpMem = gulp;
}


export { isProduction, isServerUp, isWatching, source, paths, ext, publicPath, alias, gulpMem };
