import gulp from 'gulp';
import glob from 'glob';
import plumber from 'gulp-plumber';
import named from 'vinyl-named';
import webpackLib from 'webpack';
import webpackStream from 'webpack-stream';
import PluginError from 'plugin-error';
import server from '../lib/server';
import watch from '../lib/watch';
import reloadBrowser from '../lib/reloadBrowser';
import entries from '../lib/getWebpackEntries';
import notify from '../lib/notify';
import { paths, ext, filename, isProduction, isWatching, gulpMem } from '../config';

const webpackOptions = {
    watch: isWatching ? true : false,
    entry: entries()
};

const webpackConfigFile = require('../webpack/webpack.config');

const webpackConfig = Object.assign(webpackConfigFile, webpackOptions);

let runFirstTime = true;

const webpackAssets = () =>
    gulp.src(glob.sync(`${paths.src.jsApp}/**/*.js`))
    .pipe(named())
    .pipe(webpackStream(webpackConfig, webpackLib, (err, stats) => {
        if (stats.compilation.errors.length) {
            notify('Error in webpack assets', stats.compilation.errors.toString());
            stats.compilation.errors.forEach((err) => console.log(err));
        } else {
            if (runFirstTime) {
                server();
                watch();
            } else {
                reloadBrowser();
            }
            runFirstTime = false;
        }
    }))
    .pipe(plumber())
    .pipe(gulpMem.dest(paths.dist.root));

export default webpackAssets;
