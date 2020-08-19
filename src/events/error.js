module.exports = class ErrorReceive {
    constructor(client) {
        this.client = client
    }

    run(error) {
        console.error(error.stack)
    }
}