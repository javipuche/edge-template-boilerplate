import notifier from 'node-notifier';

const notify = (title, msg) => {
    notifier.notify({
        title: title,
        message: msg,
        sound: true,
        wait: false
    });
};

export default notify;
