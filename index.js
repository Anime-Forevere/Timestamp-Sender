const { Plugin } = require("powercord/entities");

module.exports = class PluginName extends Plugin {
	startPlugin() {
		// Initializing Here

		// Add command :)
		powercord.api.commands.registerCommand({
			command: 'timestamp',
			description: 'Sends the timestamp in the current channel.',
			usage: '{c} [ ...arguments ]',
			executor: (args) => {
				if (args.length < 2 || args.length > 2) 
					return {
						send: false,
						result: `Use command correctly:\nExample - **.timestamp ShortTime ${Math.floor(Date.now() / 1000)}**`
					}
				let char;
				switch(args[0]) {
					case 'ShortTime': char = "t"; break;
					case 'LongTime': char = "T"; break;
					case 'ShortDate': char = "d"; break;
					case 'LongDate': char = "D"; break;
					case 'LongDateShortTime': char = "f"; break;
					case 'LongDateDayShortTime': char = "F"; break;
					case 'Relative': char = "R"; break;
				}
				let timestamp = args[1];
				if(timestamp === "now") timestamp = Math.floor(Date.now() / 1000)
				return {
					send: true,
					result: `<t:${timestamp}:${char}>`
				}
			},

			// Show autocomplete to a person
			autocomplete(args) {
				console.log(args)
				if (args.length !== 1) return;
				return {
					header: "Timestamp type",
					commands: [
						{
							command: "ShortTime",
							description: `Example - 11:53`
						},
						{
							command: "LongTime",
							description: "Example - 11:53:00"
						},
						{
							command: "ShortDate",
							description: "Example - 13/11/2019"
						},
						{
							command: "LongDate",
							description: "Example - November 13, 2019"
						},
						{
							command: "LongDateShortTime",
							description: "November 13, 2019 at 11:53"
						},
						{
							command: "LongDateDayShortTime",
							description: "Monday, November 13, 2019 at 11:53"
						},
						{
							command: "Relative",
							description: "10 minutes ago"
						}
					]
				}
			}
		})
	}
	pluginWillUnload() {
		// Unloading Here

		// Unload our command so user can't use it when plugin is unloaded
		powercord.api.commands.unregisterCommand('timestamp');
	}
}