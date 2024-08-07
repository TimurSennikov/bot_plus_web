import {config} from "./config.js";
import {osInfo, serverInfo, client} from "./hleb_bot.js";

client.on("messageCreate", (message) => {
	if(!message.author.bot){
		if(message.content == "!пингани еблан"){
			message.channel.send("пинганул");
		}
		else if(message.content == "!admininfo"){
			message.channel.send(osInfo.getPretty());
		}
        else{
            if(message.author.username == config.coderName){
                message.react(config.coderReact);
            }
        }
	}
});