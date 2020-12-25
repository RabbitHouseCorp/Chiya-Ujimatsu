const { MessageEmbed } = require('discord.js')
const CommandContext = require('./CommandContext')
const config = require('../../../config')
const { Colors } = require('../')
module.exports = class CommandRunner {
    constructor(client, message) {
        this.client = client
        this.message = message
    }

    async run() {
        if (this.message.author.bot) return
        if (this.message.channel.type === 'dm') return
        if (this.message.channel.id === '468880249023889408') {
            const embed = new MessageEmbed()
            embed.setColor(this.message.member.displayHexColor)
            embed.setFooter(`User ID: ${this.message.member.user.id}`, this.message.guild.iconURL())
            embed.setAuthor('Suggestion', this.message.member.user.displayAvatarURL())
            embed.setDescription(this.message.member.lastMessage.content)
            embed.setTimestamp(new Date())

            this.message.channel.createWebhook(this.message.author.username, {
                avatar: this.message.author.displayAvatarURL()
            }).then(webhook => {
                webhook.send(embed).then(async msg => {
                    webhook.delete()
                    this.message.delete()
                    await msg.react('👍')
                    await msg.react('👎')
                    await msg.react('😍')
                })
            })
        }
        if (!this.message.content.startsWith(config.prefix)) return
        const args = this.message.content.slice(config.prefix.length).trim().split(' ')
        const cmd = args.shift().toLowerCase()
        const commandRunner = this.client.commands.get(cmd) || this.client.commands.get(this.client.aliases.get(cmd))
        if (!commandRunner) return
        const ctx = new CommandContext(this.client, this.message, args)
        if (commandRunner.config.dev && !config.owner.includes(this.message.author.id)) return
        this.message.channel.startTyping()
        try {
            await commandRunner.run(ctx)
            this.message.channel.stopTyping()
        } catch (err) {
            if (err.stack.length > 1800) {
                err.stack = err.stack.substr(0, 1800)
                err.stack = `${err.stack}...`
            }
            const embed = new MessageEmbed()
            embed.setColor(Colors['error'])
            embed.setTitle('Oh no... An error occurred while doing this action, I\'m sorry for what happened.')
            embed.setDescription(`\`\`\`${err.message}\`\`\``)

            this.message.channel.send(embed)
            this.message.channel.stopTyping()
        }
    }
}