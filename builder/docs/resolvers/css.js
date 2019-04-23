module.exports = {
    id: 'scss',
    label: 'SCSS',
    languages: [ 'sass', 'scss', 'css' ],
    resolve: (fileName, fileExt) => [ `${ fileName }.sass`, `${ fileName }.scss`, `${ fileName }.css` ]
};