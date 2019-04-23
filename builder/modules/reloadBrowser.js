import browserSync from 'browser-sync';

let reloadBrowser = function () {
    return browserSync.reload();
};

export default reloadBrowser;