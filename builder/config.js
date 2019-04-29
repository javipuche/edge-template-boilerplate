import gulp from 'gulp';
import GulpMem from 'gulp-mem';
import path from 'path';


/* -----------------------------------------------------------------------------
 * Source
 */

const source = {
    dist: '../dist',
    src: '../src',
    data: 'data',
    views: 'views',
    components: 'views/components',
    layouts: 'views/layouts',
    pages: 'views/pages',
    partials: 'views/partials',
    static: 'static',
    assets: 'assets',
    fonts: 'assets/fonts',
    images: 'assets/images',
    scss: 'assets/scss',
    css: 'assets/css',
    js: 'assets/js',
    modules: 'assets/js/modules',
    docs: 'docs'
};


/* -----------------------------------------------------------------------------
 * Paths
 */

const paths = {
    src: {
        root: path.join(__dirname, `/${source.src}`),
        data: path.join(__dirname, `/${source.src}/${source.data}`),
        views: path.join(__dirname, `/${source.src}/${source.views}`),
        components: path.join(__dirname, `/${source.src}/${source.components}`),
        layouts: path.join(__dirname, `/${source.src}/${source.layouts}`),
        pages: path.join(__dirname, `/${source.src}/${source.pages}`),
        partials: path.join(__dirname, `/${source.src}/${source.partials}`),
        static: path.join(__dirname, `/${source.src}/${source.static}`),
        assets: path.join(__dirname, `/${source.src}/${source.assets}`),
        fonts: path.join(__dirname, `/${source.src}/${source.fonts}`),
        images: path.join(__dirname, `/${source.src}/${source.images}`),
        scss: path.join(__dirname, `/${source.src}/${source.scss}`),
        js: path.join(__dirname, `/${source.src}/${source.js}`),
        modules: path.join(__dirname, `/${source.src}/${source.modules}`),
        docs: path.join(__dirname, `/${source.src}/${source.docs}`)
    },
    dist: {
        root: path.join(__dirname, `/${source.dist}`),
        static: path.join(__dirname, `/${source.dist}/${source.static}`),
        assets: path.join(__dirname, `/${source.dist}/${source.assets}`),
        fonts: path.join(__dirname, `/${source.dist}/${source.fonts}`),
        images: path.join(__dirname, `/${source.dist}/${source.images}`),
        js: path.join(__dirname, `/${source.dist}/${source.js}`),
        docs: path.join(__dirname, `/${source.dist}/${source.docs}`)
    },
    node_modules: path.join(__dirname, '../node_modules')
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
 * Extensions files
 */

const ext = {
    template: '.edge',
    data: '.json',
    fonts: '.{eot,ttf,svg,woff,woff2}',
    images: '.{gif,png,jpg,jpeg,svg}',
    markdown: '.md'
};


/* -----------------------------------------------------------------------------
 * Filenames
 */

const filename = {
    scss: 'styles',
    scssDocs: 'docs',
    js: 'app',
    jsDocs: 'docs'
};


/* -----------------------------------------------------------------------------
 * Process flags
 */

const isProduction = process.argv.indexOf('--production') >= 0;
const isServerUp   = process.argv.indexOf('--server') >= 0;
const isWatching   = process.argv.indexOf('--watch') >= 0;


/* -----------------------------------------------------------------------------
 * Compile files on memory
 */

let gulpType;

if (isServerUp) {
    gulpType = new GulpMem();
    gulpType.serveBasePath = paths.dist.root;
    gulpType.enableLog = false;
} else {
    gulpType = gulp;
}


/* -----------------------------------------------------------------------------
 * Exports
 */

export { source, paths, publicPath, ext, filename, isProduction, isServerUp, isWatching, gulpType };