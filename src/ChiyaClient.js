const { Client, Collection } = require('discord.js')
const { readdir } = require('fs')
const { Logger } = require('./utils')
module.exports = class ChiyaClient extends Client {
    constructor(token, options = {}) {
        super(options)

        this.aliases = new Collection()
        this.commands = new Collection()
        this.token = token
    }

    connect() {
        super.login(this.token)
        this.registerCommands()
        this.registerListeners()
        Logger.warn('Connecting...')
        return this
    }

    registerCommands() {
        readdir(`${__dirname}/commands`, (err, files) => {
            if (err) return new Error(err.message)
            files.forEach((category) => {
                readdir(`${__dirname}/commands/${category}`, (err, cmd) => {
                    if (err) return new Error(err.message)
                    const Command = require(`${__dirname}/commands/${category}/${cmd}`)
                    const command = new Command()
                    this.commands.set(command.config.name, command)
                    command.config.aliases.forEach((alias) => this.aliases.set(alias, command.config.name))
                    Logger.warn(`Loaded command: ${command.config.name}`)
                })
            })
        })
    }

    registerListeners() {
        readdir(`${__dirname}/listeners`, (err, files) => {
            if (err) return new Error(err.name)
            files.forEach((event) => {
                const Events = require(`${__dirname}/listeners/${event}`)
                const events = new Events()
                super.on(events.name, (...args) => events.run(this, ...args))
                Logger.warn(`Loaded event: ${events.name}`)
            })
        })
    }
}