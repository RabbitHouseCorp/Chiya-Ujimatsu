const CommandRunner = require('../utils/commands/CommandRunner')
const { EventListener} = require('../utils')
module.exports = class MessageListener extends EventListener {
    constructor() {
        super('message')
    }

    async run(client, message) {
        const cmd = new CommandRunner(client, message)
        await cmd.run()
    }
}