require('dotenv').config()

module.exports = {
    token: process.env.TOKEN,
    prefix: process.env.PREFIX,
    owner: ['395788326835322882'],
    options: {
        fetchAllMembers: true,
        shardCount: 1,
        ws: {
            intents: [
                'GUILDS',
                'GUILD_MEMBERS',
                'GUILD_BANS',
                'GUILD_EMOJIS',
                'GUILD_INTEGRATIONS',
                'GUILD_WEBHOOKS',
                'GUILD_MESSAGES',
                'GUILD_MESSAGE_REACTIONS'
            ]
        }
    }
}