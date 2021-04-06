const Discord = require('discord.js');
const client = new Discord.Client();

const {prefix, token} = require('./config.json')

client.on('ready', () => {
  console.log(`${client.user.tag}(${client.user.id})でログインしています。`);
});

client.on('message', message => {
    if (message.author.id == client.user.id)
    if (!message.content.startsWith(prefix)) {
        return;
    };
    const {command, ...args} = message.content.slice(prefix.length).split(' ')

    if (command === 'say') {
        message.channel.send(`<@${message.author.id}>\r${message.content}`)
    }
});

client.login(token);