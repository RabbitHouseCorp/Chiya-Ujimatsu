const { MessageEmbed } = require("discord.js")
module.exports = class MessageReceive {
    constructor(client) {
        this.client = client
    }

    run(message) {

        if (message.author.bot) return
        if (message.channel.type === "dm") return
        if (message.channel.id === "") {
            let embed = new MessageEmbed()
            .setColor(message.member.displayHexColor)
            .setFooter("Suggestion submitted")
            .setAuthor("Suggestion", message.member.user.displayAvatarURL())
            .setDescription(message.member.lastMessage.content)

            message.channel.createWebhook(message.member.user.username, {
                avatar: message.member.user.displayAvatarURL()
            })
            .then(webhook => {
                webhook.send(embed)
                .then(msg => {
                    webhook.delete()
                    message.delete()
                    msg.react("👍")
                    setTimeout(() => msg.react("👎"), 500)
                    setTimeout(() => msg.react("😍"), 1000)
                })
            })

        }
        if (!message.content.startsWith(process.env.PREFIX)) return
        let args = message.content.slice(process.env.PREFIX.length).trim().split(" ")
        let cmd = args.shift().toLowerCase()
        let commands = this.client.commands.get(cmd) || this.client.commands.get(this.client.aliases.get(cmd))
        if (!commands) return

        if (commands.config.dev) {
            if (message.author.id !== "395788326835322882") {
                message.reply("this commands is only to developers")
                return
            }
        }

        try {
            const embed = new MessageEmbed()
            .setColor(this.client.colors.error)
            .setTitle("Oh no... An error occurred while doing this action, I'm sorry for what happened.")
            new Promise((res, rej) => {
                message.channel.startTyping()
                res(commands.run(message, args))
            })
            .then(() => message.channel.stopTyping())
            .catch(err => {
                embed.setDescription(`\`\`\`${err.stack}\`\`\``)
                message.channel.send(embed)
                console.error(err.stack)
            })
        } catch (err) {
            embed.setDescription(`\`\`\`${err.stack}\`\`\``)
            message.channel.send(embed)
            console.error(err.stack)
        }
    }
}