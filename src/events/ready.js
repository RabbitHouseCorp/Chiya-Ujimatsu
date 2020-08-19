module.exports = class ReadyReceive {
	constructor(client) {
	    this.client = client
	 }
	
	run() {
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
