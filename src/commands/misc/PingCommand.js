const { Command } = require('../../utils')
module.exports = class PingCommand extends Command {
    constructor() {
        super({
            name: 'ping',
            aliases: [],
            category: 'misc'
        })
    }

    async run(ctx) {
        let msg = await ctx.message.channel.send('🏓 ping?')
        msg.edit(`🏓 Websocket ping: \`${Math.round(ctx.client.ws.ping)}\`ms! | Latency API: \`${msg.createdAt - ctx.message.createdAt}\`ms!`)
    }
}