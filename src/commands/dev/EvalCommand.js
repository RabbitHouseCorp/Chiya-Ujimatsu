const { Command, Colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')
module.exports = class EvalCommand extends Command {
    constructor() {
        super({
            name: 'eval',
            aliases: ['evaluate', 'e'],
            dev: true
        })
    }

    run(ctx) {
        try {
            let util = require('util')
            let evaluate = eval(ctx.args.join(' '))
            let str = util.inspect(evaluate, {
                depth: 1
            })
            str = `${str.replace(new RegExp(`${ctx.client.token}`, 'g'), 'undefined')}`
            if (str.length > 1800) {
                str = str.substr(0, 1800)
                str = `${str}...`
            }

            ctx.send(str, { code: 'js' })

        } catch (err) {
            if (err.stack.length > 1800) {
                err.stack = err.stack.substr(0, 1800)
                err.stack = `${err.stack}...`
            }
            const embed = new MessageEmbed()
            embed.setColor(Colors['error'])
            embed.setTitle('Oh no... An error occurred while doing this action, I\'m sorry for what happened.')
            embed.setDescription(`\`\`\`${err}\`\`\``)

            ctx.send(embed)
        }
    }
}