const Command = require("../../structures/commands")
module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            aliases: [],
            category: "misc"
        })
    }

    async run(message, args) {
        let msg = await message.channel.send("🏓 ping?")
        msg.edit(`🏓 Websocket ping: \`${Math.round(this.client.ws.ping)}\`ms! | Latency API: \`${msg.createdAt - message.createdAt}\`ms!`)
    }
}