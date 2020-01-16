require("dotenv").config()
require("./src/structures/ProtoTypes").start()

const Client = require("./src/ChiyaClient")
const client = new Client({
    fetchAllMembers: true
})

client.login(process.env.TOKEN)
client.loadEvents("./src/events")
client.loadCommands("./src/commands")