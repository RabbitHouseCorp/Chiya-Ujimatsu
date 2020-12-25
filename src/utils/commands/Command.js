module.exports = class Commands {
    constructor(options) {
        this.config = {
            name: options.name || null,
            aliases: options.aliases || [],
            category: options.category,
            dev: options.dev || false
        }
    }
}