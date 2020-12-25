const { EventListener, Logger } = require('../utils')
module.exports = class ReadyListener extends EventListener {
	constructor() {
		super('ready')
	}

	run(client) {
		setInterval(() => {
			client.user.setPresence({
				activity: {
					name: 'Your suggestions',
					type: 'LISTENING'
				},
				status: 'dnd'
			})
		}, 10000)

		let guild = client.guilds.cache.get('468877023926943764')

		if (guild.features.includes('BANNER')) {
			let banner = [
				'https://cdn.discordapp.com/attachments/481807707066859530/751192861365764126/Screenshot_20200731-202613_Goyabu.jpg',
				'https://cdn.discordapp.com/attachments/481807707066859530/751192867678060676/Screenshot_20200731-202639_Goyabu.jpg',
				'https://cdn.discordapp.com/attachments/481807707066859530/751192873562669166/Screenshot_20200731-202743_Goyabu.jpg',
				'https://cdn.discordapp.com/attachments/481807707066859530/751192879334162452/Screenshot_20200731-202804_Goyabu.jpg',
				'https://cdn.discordapp.com/attachments/481807707066859530/751192885956706394/Screenshot_20200731-210716_Goyabu.jpg',
				'https://cdn.discordapp.com/attachments/481807707066859530/751192889421463622/Screenshot_20200801-233101_Goyabu.jpg',
				'https://cdn.discordapp.com/attachments/481807707066859530/751192899294855238/Screenshot_20200801-235637_Goyabu.jpg',
				'https://cdn.discordapp.com/attachments/481807707066859530/751192907985322005/Screenshot_20200802-003003_Goyabu.jpg'
			]
			setInterval(() => {
				guild.setBanner(banner[Math.floor(Math.random() * banner.length)])
			}, 900000)
		}
		Logger.log('Connected to Discord')
	}
}
