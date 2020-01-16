module.exports = class Commands {
    constructor(client, options) {
        this.client = client
        this.config = {
            name: options.name || null,
            aliases: options.aliases || [],
            category: options.category || "misc",
            userPermission: options.userPermission || null,
            clientPermission: options.clientPermission || null,
            dev: options.dev || false
        }
    }
}