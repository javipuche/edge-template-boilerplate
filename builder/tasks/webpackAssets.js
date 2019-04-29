import gulp from 'gulp';
import plumber from 'gulp-plumber';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import notify from '../modules/notify';
import server from '../modules/server';
import watch from '../modules/watch';
import reloadBrowser from '../modules/reloadBrowser';
import named from 'vinyl-named';
import { paths, ext, filename, isProduction, isWatching, gulpType } from '../config';

const webpackAssets = function () {
    let webpackOptions = isWatching ? { watch: true } : {};
    let webpackConfigFile = require('../webpack/webpack.config');
    let webpackConfig = Object.assign(webpackConfigFile, webpackOptions);
    let runFirstTime = true;

    return gulp.src([
        `${paths.src.js}/${filename.js}.js`,
        `${paths.src.js}/${filename.jsDocs}.js`,
        `${paths.src.scss}/${filename.scss}.scss`,
        `${paths.src.scss}/${filename.scssDocs}.scss`
    ])
    .pipe(named())
    .pipe(webpackStream(webpackConfig, webpack, (err, stats) => {
        if (stats.compilation.errors.length) {
            if (isWatching) console.log(stats.compilation.errors.toString());
            notify(stats.compilation.errors.toString());
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
    .pipe(gulpType.dest(paths.dist.root));
};

export default webpackAssets;