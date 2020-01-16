module.exports = class MessageUpdateReceive {
    constructor(client) {
        this.client = client
    }

    run(oldMessage, newMessage) {
        if (oldMessage.content === newMessage.content) return

        this.client.emit("message", newMessage)
    }
}