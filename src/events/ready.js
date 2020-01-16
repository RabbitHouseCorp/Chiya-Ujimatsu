module.exports = class ReadyReceive {
    constructor(client) {
        this.client = client
    }

    run() {
        console.log("Connected to Discord")
    }
}