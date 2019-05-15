import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gulpEdge from 'gulp-edgejs';
import htmlbeautify from 'gulp-pretty-html';
import gulpif from 'gulp-if';
import browserSync from 'browser-sync';
import edge from 'edge.js';
import getDataFromJson from '../lib/getDataFromJson';
import notify from '../lib/notify';
import { paths, publicPath, ext, isProduction, gulpMem } from '../config';

const template = () =>
    gulp.src(`${paths.src.pages}/**/*.${ext.template}`)
    .pipe(plumber())
    .pipe(gulpEdge({
        data: getDataFromJson().data,
        root: publicPath.root
    }, {
        path: paths.src.views
    })).on('error', function (error) {
        return console.error(error.toString()), notify('Error in template', error.message);
    })
    .pipe(gulpif(isProduction, htmlbeautify({
        preserve_newlines: false,
        max_preserve_newlines: 1,
        editorconfig: true,
        unformatted: ['code', 'pre']
    })))
    .pipe(gulpMem.dest(paths.dist.root))
    .pipe(browserSync.stream());

export default template;
