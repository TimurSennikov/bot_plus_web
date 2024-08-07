import { Client, EmbedBuilder, GatewayIntentBits } from 'discord.js';

var config = {
	IP: "91.211.118.150",
	PORT: 27053,

	guildID: '589884181212037140',
	infoChannelID: '1269930739730874430',
	infoMessageID: '1269967528830963766',

    chatChannelID: '1270438364952137860',

	playerOutline: "**",

	onlineMessage: "**РАБОТАЕТ**",
	offlineMessage: "**НЕ РАБОТАЕТ**",

	fullMessage: " // ФУЛЛ ОНЛАЙН",

	noDataMessage: "НЕТ ДАННЫХ",

	coderName: "linuser",
	coderPrettyName: "40 ампер мощи",
	coderReact: "🥵",

	design: function(status, online, players){
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle("Сервер")
			.setAuthor({name: "40 ампер мощи"})
			.addFields(
				{name: "Статус", value: status},
				{name: "Онлайн", value: online},
				{name: "Игроки", value: players}
			);

		return embed;
	}
}

export {config};