const { Message } = require("discord.js")
module.exports = class ProtoTypes {
    static start() {
        Message.prototype.reply = async function send(msg, ...args) {
            this.channel.send(`**${this.author.username}**, ${msg}`)
        }
    }
}