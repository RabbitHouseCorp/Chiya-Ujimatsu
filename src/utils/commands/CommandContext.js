module.exports = class CommandContext {
    constructor(client, message, args) {
        this.client = client
        this.message = message
        this.args = args
    }

    reply(content, object) {
        this.message.channel.send(`**${this.message.author.username}**, ${content}`)
    }

    send(content, object) {
        this.message.channel.send(content, object)
    }
}