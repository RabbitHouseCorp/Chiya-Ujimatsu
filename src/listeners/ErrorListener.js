const { EventListener, Logger } = require('../utils')
module.exports = class ErrorListener extends EventListener {
    constructor() {
        super('error')
    }

    run(client, error) {
        Logger.error(error.stack)
    }
}