import { GameDig } from 'gamedig';
import { Client, EmbedBuilder, GatewayIntentBits } from 'discord.js';
import os from 'os';
import exp from 'constants';

import {config} from "./config.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

var osInfo = {
	getPretty: function(){
		var s = "";

		s += "Имя хоста: " + os.hostname + "\n";
		s += "Тип ОС: " + os.type + "\n";
		s += "Архитектура процессора: " + os.arch + "\n";
		s += "Память: " + os.totalmem + "\n";
		s += "Из нее свободно: " + os.freemem + "\n";
		s += "Uptime: " + os.uptime;

		return s;
	}
};

var serverInfo = {
	numplayers: 0,
	maxplayers: 0,
	players: [],
	serverMap: "NO DATA",
	stat: true,
	messages: [],

	fetch: function(){
		GameDig.query({
			type: 'garrysmod',
			host: config.IP,
			port: config.PORT,
		}).then((state) => {
			serverInfo.serverMap = state.map;
			serverInfo.numplayers = state.numplayers;
			serverInfo.maxplayers = state.maxplayers;
			serverInfo.players = state.players;

			serverInfo.stat = true;
		}).catch((error) => {
			console.log(error);
			serverInfo.stat = false;
		});
	},

	getStatus: function(){
		if(serverInfo.stat){
			return config.onlineMessage;
		}
		else{
			return config.offlineMessage;
		}
	},

	getOnline: function(){
		var onlineString = serverInfo.numplayers + "/" + serverInfo.maxplayers;

		if(serverInfo.numplayers == serverInfo.maxplayers && serverInfo.maxplayers > 0){onlineString += config.fullMessage;}

		return onlineString;
	},

	prettyInfo: function(){
		var playerList = " | ";

		for(var i = 0; i < serverInfo.players.length; i++){
			var name = serverInfo.players[i].name;

			if(name){
				playerList += "**" + serverInfo.players[i].name + "**" + "\n";
			}

			if(i < serverInfo.players.length - 1){playerList += " | ";}
		}

		return playerList;
	},

	update: function(){
		var act = "garry`s mod, " + serverInfo.serverMap + " " + serverInfo.numplayers + "/" + serverInfo.maxplayers;
		var userStatus = serverInfo.stat ? "onlide" : "dnd";

		client.user.setPresence({activities: [{name: act}], status: userStatus});

		client.guilds.fetch(config.guildID).then((i) => {i.channels.fetch(config.infoChannelID).then((j) => {j.messages.fetch(config.infoMessageID).then((k) => {k.edit({embeds: [config.design(serverInfo.getStatus(), serverInfo.getOnline(), serverInfo.prettyInfo())]});}).catch((error) => {console.log(error);})})});
	}
}

setInterval(serverInfo.fetch, 10000);
setInterval(serverInfo.update, 15000);

client.login("TOKEN HERE <").then(() => {client.user.setActivity(config.noDataMessage);});

// South, я ЗНАЮ про существование this, но в этом коде много чего выполняется функцией setInterval, в которой this нет (код выполняется в другом контексте), поэтому все хранится в объектах, которые ссылаются на себя же, сорян :/

export {osInfo, serverInfo, client};
