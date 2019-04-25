import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gulpEdge from 'gulp-edgejs';
import htmlbeautify from 'gulp-pretty-html';
import gulpif from 'gulp-if';
import browserSync from 'browser-sync';
import getDataFromJson from '../modules/getDataFromJson';
import notify from '../modules/notify';
import edge from 'edge.js';
import { Markdown } from '../modules/tags/markdown';
import { paths, publicPath, ext, isProduction, gulpType } from '../config';

const template = function () {
    return gulp.src(`${paths.src.pages}/**/*${ext.template}`)
    .pipe(plumber())
    .pipe(gulpEdge({
        data: getDataFromJson().data,
        root: publicPath.root
    }, {
        path: paths.src.views,
        tags: [
            new Markdown()
        ]
    })).on('error', function (error) {
        return console.error(error.toString()),
        notify(error.toString());
    })
    .pipe(gulpif(isProduction, htmlbeautify({
        preserve_newlines: false,
        max_preserve_newlines: 1,
        editorconfig: true
    })))
    .pipe(gulpType.dest(paths.dist.root))
    .pipe(browserSync.stream());
};

export default template;