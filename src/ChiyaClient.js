const { Client, Collection } = require("discord.js")
const { readdir } = require("fs")
module.exports = class ChiyaClient extends Client {
    constructor(options = {}) {
        super(options)

        this.aliases = new Collection()
        this.colors = require("./structures/colors")
        this.commands = new Collection()
    }

    login(token) {
        return super.login(token)
    }

    loadCommands(path) {
        readdir(path, (err, f) => {
            if (err) return console.error(err)
            f.forEach(category => {
                readdir(`./${path}/${category}`, (err, cmd) => {
                    if (err) return console.error(err)
                    cmd.forEach(cmd => {
                        const Commands = require(`.${path}/${category}/${cmd}`)
                        const commands = new Commands(this)
                        this.commands.set(commands.config.name, commands)
                        commands.config.aliases.forEach(alias => this.aliases.set(alias, commands.config.name))
                    })
                })
            })
        })
    }

    loadEvents(path) {
        readdir(path, (err, f) => {
            if (err) return console.error(err)
            f.forEach(event => {
                const Events = require(`.${path}/${event}`)
                const events = new Events(this)
                super.on(event.split(".")[0], (...args) => events.run(...args))
            })
        })

        return this
    }
}