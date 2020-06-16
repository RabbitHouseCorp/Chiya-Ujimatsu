module.exports = class ReadyReceive {
	constructor(client) {
	    this.client = client
	 }
	
	run() {
		const http = require("http")
	    setInterval(() => http.get("http://cocoa-hoto.glitch.me"), 300000)
	    setInterval(() => {
		        this.client.user.setPresence({
		            activity: {
		                name: "Your suggestions",
		                type: "LISTENING"
		            },
		            status: "dnd"
		        })
		}, 10000)
		console.log("Connected to Discord")
	}
}
