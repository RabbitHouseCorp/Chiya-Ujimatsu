const { token, options } = require('./config')
const Client = require('./src/ChiyaClient')
const client = new Client(token, options)
client.connect()