const { Color } = require('./src/modules/console');
const { User } = require('./src/modules/brain');

const Readline = require('readline').createInterface(
    { input: process.stdin, output: process.stdout }
);

const init = () => {
    console.clear();
    console.log(Color.banner);

    process.stdout.write(
        String.fromCharCode(27) + "]0;" + 'RudimentalHack' + String.fromCharCode(7)
    );

    Color.options.forEach(
        option => {
            Color.log(option, Color.options.indexOf(option) + 1);
        }
    );

    Readline.question(Color.list[1].code + '  > ', option => {
        if (!['1', '2', '3', '4', '5', '6'].includes(option)) return init();

        Readline.question(Color.list[1].code + '  Enter Token > ', token => {
            const user = new User(
                { token: token }
            );

            if (option == '1') {
                Color.log('Removing Friends...');

                user.removeFriends().catch(
                    (e) => {
                        Color.log(e);

                        setTimeout(() => {
                            init();
                        }, 1000);
                    }
                );
            } else if (option == '2') {
                Color.log('Token Information...');
                user.info().then(
                    data => {
                        console.clear();
                        console.log(Color.banner);

                        data.forEach((d) => Color.log(d));
                        setTimeout(process.exit, 60000);
                    }
                ).catch(
                    (e) => {
                        Color.log(e);

                        setTimeout(() => {
                            init();
                        }, 1000);
                    }
                );
            } else if (option == '3') {
                Color.log('Terminating Account...');
                user.termination().then(
                    data => {
                        console.clear();
                        console.log(Color.banner);

                        data.forEach((d) => Color.log(d));
                        setTimeout(process.exit, 60000);
                    }
                ).catch(
                    (e) => {
                        Color.log(e);

                        setTimeout(() => {
                            init();
                        }, 1000);
                    }
                );
            } else if (option == '4') {
                Color.log('Removing Guilds...');

                user.removeGuilds().catch(
                    (e) => {
                        Color.log(e);

                        setTimeout(() => {
                            init();
                        }, 1000);
                    }
                );
            } else if (option == '5') {
                Color.log('Deleting Channels...');

                user.deleteChannels().catch(
                    (e) => {
                        Color.log(e);

                        setTimeout(() => {
                            init();
                        }, 3000);
                    }
                );
            } else if (option == '6') {
               
                user.creds().then(
                    data => {
                        console.clear();
                        console.log(Color.banner);

                        data.forEach((d) => Color.log(d));
                        setTimeout(process.exit, 60000);
                    }
                ).catch(
                    (e) => {
                        Color.log(e);

                        setTimeout(() => {
                            init();
                        }, 1000);
                    }
                );
            }

        });
    });
};

init();

