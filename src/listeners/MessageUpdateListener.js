const { EventListener } = require('../utils')
module.exports = class MessageUpdateListener extends EventListener {
    constructor() {
        super('messageUpdate')
    }

    run(client, oldMessage, newMessage) {
        if (oldMessage.content === newMessage.content) return

        client.emit('message', newMessage)
    }
}