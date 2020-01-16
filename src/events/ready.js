module.exports = class ReadyReceive {
    constructor(client) {
        this.client = client
    }

    run() {

        this.client.user.setPresence({
            activity: {
                name: "Your suggestions",
                type: "LISTENING"
            },
            status: "dnd"
        })
        console.log("Connected to Discord")
    }
}