import notifier from 'node-notifier';

const notify = (msg) => {
    notifier.notify({
        title: 'Error in console',
        message: `${msg}`,
        sound: true,
        wait: false
    });
};

export default notify;